"use client";
import {useEffect,useState,type ReactNode} from "react";
import Link from "next/link";
import {getSupabase} from "@/lib/supabase";
import {cleanLines,type RecipeRecord} from "@/lib/recipe-types";
import LinkedRecipeText from "@/components/LinkedRecipeText";
import {type BrandLink,type RecipeLinkTarget} from "@/lib/recipe-linking";
import "@/app/recipes/recipes.css";

export function PublishedOverride({slug,fallback=null}:{slug:string;fallback?:ReactNode}){
 const [recipe,setRecipe]=useState<RecipeRecord|null>(null);
 const [linkedRecipes,setLinkedRecipes]=useState<RecipeLinkTarget[]>([]);
 const [brands,setBrands]=useState<BrandLink[]>([]);
 const [canEdit,setCanEdit]=useState(false);
 const [loading,setLoading]=useState(true);
 const [loadError,setLoadError]=useState("");
 useEffect(()=>{
  let active=true;let request=0;
  const db=getSupabase();
  if(!db){setLoading(false);return;}
  async function refresh(){
   const current=++request;
   setLoading(true);setLoadError("");
   try{
    const {data:identity}=await db!.auth.getUser();
    if(!active||current!==request)return;
    let admin=false;
    if(identity.user){
     const {data:profile,error:profileError}=await db!.from("profiles").select("role").eq("id",identity.user.id).maybeSingle();
     if(profileError)throw profileError;
     admin=profile?.role==="admin";
    }
    // Public RLS exposes published recipes; admin RLS permits its own draft previews.
    let query=db!.from("recipes").select("*").eq("slug",slug);
    if(!admin)query=query.eq("status","published");
    const {data,error}=await query.maybeSingle();
    if(error)throw error;
    if(active&&current===request){setRecipe(data as RecipeRecord|null);setCanEdit(admin);setLoading(false);}
   }catch(e){if(active&&current===request){setLoadError(e instanceof Error?e.message:String(e));setLoading(false);}}
  }
  void refresh();
  void Promise.all([
   db.from("recipes").select("slug,title").eq("status","published"),
   db.from("brand_links").select("id,name,website_url,aliases,enabled")
  ]).then(([recipeRefs,brandRefs])=>{
   if(!active)return;
   if(!recipeRefs.error)setLinkedRecipes((recipeRefs.data??[]) as RecipeLinkTarget[]);
   if(!brandRefs.error)setBrands((brandRefs.data??[]) as BrandLink[]);
  });
  const {data:{subscription}}=db.auth.onAuthStateChange(()=>{void refresh();});
  return()=>{active=false;request++;subscription.unsubscribe();};
 },[slug]);
 if(loading)return <div className="recipe-site recipe-shell"><p role="status">Loading recipe…</p></div>;
 if(loadError)return <div className="recipe-site recipe-shell"><p role="alert">Unable to load recipe: {loadError}</p><Link href="/recipes">Back to recipes</Link></div>;
 if(!recipe)return <>{fallback??<div className="recipe-site recipe-shell"><p className="recipe-crumb"><Link href="/recipes">Recipes</Link></p><h1>Recipe not published</h1><p>This recipe is not available to visitors yet. Sign in with an owner account to preview drafts.</p></div>}</>;
 const inline=(text:string)=><LinkedRecipeText text={text} currentSlug={slug} recipes={linkedRecipes} brands={brands}/>;
 const isResearch=recipe.category==="Ideas & Research";
 const incomplete=!recipe.ingredients.trim()||!recipe.instructions.trim();
 const hasUnknowns=/not recorded|unrecorded|unverified|not recovered|unknown|reconstructed|not validated|amount not|quantity not|ratio not|suggested|original.*missing/i.test(recipe.ingredients+" "+recipe.instructions+" "+recipe.summary);
 const blocks:[string,string][]=[
  ["Equipment",recipe.equipment],["Ingredients",recipe.ingredients],["The method",recipe.instructions],
  ["Substitutions",recipe.substitutions],["Storage & reheating",recipe.storage_notes],
  ["Quick tricks",recipe.quick_tricks],["Estimated macros",recipe.macros]
 ];
 return <article className="recipe-site recipe-shell">
  <p className="recipe-crumb"><Link href="/">Home</Link> / <Link href="/recipes">Recipes</Link> / {recipe.title}</p>
  {recipe.status==="draft"&&canEdit&&<div className="recipe-draft-banner" role="status"><strong>PRIVATE OWNER PREVIEW — NOT PUBLISHED</strong><p>This is your saved draft from the recipe database. It may contain unverified quantities, incomplete steps, or working notes. Visitors cannot see this draft.</p><Link href="/admin/recipes">Edit in Recipe Manager</Link></div>}
  {isResearch&&<div className="recipe-recovery-notice" role="status"><strong>Kitchen Lab research — not a completed recipe</strong><p>This entry records an idea or food investigation. There is no original tested ingredient list or finished cooking method here. It is not being presented as a cook-ready recipe.</p><Link href="/recipes">Browse the recipe collection</Link></div>}
  {!isResearch&&recipe.status==="published"&&hasUnknowns&&<div className="recipe-recovery-notice" role="note"><strong>Recovered kitchen notes</strong><p>Some measurements, timings, or steps were not recorded in the original cooking session. The recipe below preserves those gaps rather than guessing. Review them before preparing this dish.</p></div>}
  {!isResearch&&incomplete&&<div className="recipe-recovery-notice" role="note"><strong>Incomplete working record</strong><p>Original ingredients or instructions have not been fully recovered. This is a reference, not a complete recipe.</p></div>}
  <p className="recipe-kicker">Tito Vee's Kitchen / {recipe.category}</p>
  <h1 className="recipe-title">{recipe.title}</h1>
  {recipe.summary&&<p className="recipe-subtitle">{recipe.summary}</p>}
  {!isResearch&&<dl className="recipe-facts">
   <div><dt>Yield</dt><dd>{recipe.yield_text||"See recipe"}</dd></div>
   <div><dt>Prep</dt><dd>{recipe.prep_minutes===null?"—":recipe.prep_minutes+" min"}</dd></div>
   <div><dt>Cook</dt><dd>{recipe.cook_minutes===null?"—":recipe.cook_minutes+" min"}</dd></div>
   <div><dt>Category</dt><dd>{recipe.category}</dd></div>
  </dl>}
  {recipe.photo_url&&<img src={recipe.photo_url} alt={recipe.title} style={{width:"100%",maxHeight:520,objectFit:"cover",borderRadius:14}}/>}
  {recipe.video_url&&<p><a href={recipe.video_url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"underline"}}>Watch Me Make It ↗</a></p>}
  {!isResearch&&<div className="recipe-grid"><div>
   {blocks.filter(x=>x[0]!=="Equipment"&&x[0]!=="Ingredients").map(([title,content])=>content.trim()&&<section className="recipe-section" key={title}><h2>{title}</h2>{title==="The method"?cleanLines(content).map((line,i)=>{
    const step=line.replace(/^\d+\.\s*/,"");
    const divider=step.indexOf(": ");
    return <div className="recipe-step" key={i}><span className="recipe-step-number">{String(i+1).padStart(2,"0")}</span><div>{divider>=0?<><h3>{step.slice(0,divider)}</h3><p>{inline(step.slice(divider+2))}</p></>:<p>{inline(step)}</p>}</div></div>;
   }):content.split("\n").map((line,i)=><p key={i} style={{whiteSpace:"pre-wrap"}}>{inline(line||" ")}</p>)}</section>)}
  </div><aside>
  {recipe.ingredients.trim()&&<section className="recipe-panel" style={{marginBottom:"1rem"}}><h2>Ingredients</h2>
   {recipe.ingredients.includes("\n\n")?recipe.ingredients.split(/\n\s*\n/).filter(x=>x.trim()).map((group,i)=>{
    const [heading,...items]=cleanLines(group);
    return <div key={i}><h3>{heading}</h3><ul className="recipe-list">{items.map((line,j)=><li key={j}>{inline(line)}</li>)}</ul></div>;
   }):<ul className="recipe-list">{cleanLines(recipe.ingredients).map((line,i)=><li key={i}>{inline(line)}</li>)}</ul>}
  </section>}
  {recipe.equipment.trim()&&<section className="recipe-panel" style={{marginBottom:"1rem"}}><h2>Equipment</h2><ul className="recipe-list">{cleanLines(recipe.equipment).map((line,i)=><li key={i}>{inline(line)}</li>)}</ul></section>}
  </aside></div>}
 </article>;
}
