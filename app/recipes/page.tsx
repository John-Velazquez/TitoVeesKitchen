"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import catalog from "../../data/recipe-catalog.json";
import {getSupabase} from "@/lib/supabase";
import {type RecipeRecord} from "@/lib/recipe-types";
import "./recipes.css";

const categoryList=Array.from(new Set(catalog.recipes.map(r=>r.category))).sort();
export default function Recipes(){
 const [rows,setRows]=useState<RecipeRecord[]>([]);
 const [isAdmin,setIsAdmin]=useState(false);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState("");
 useEffect(()=>{
  let active=true;let request=0;
  const db=getSupabase();
  if(!db){setLoading(false);return;}
  async function refresh(){
   const current=++request;
   setLoading(true);setError("");
   try{
    const {data:identity}=await db!.auth.getUser();
    if(!active||current!==request)return;
    let admin=false;
    if(identity.user){
     const {data:profile,error:profileError}=await db!.from("profiles").select("role").eq("id",identity.user.id).maybeSingle();
     if(profileError)throw profileError;
     admin=profile?.role==="admin";
    }
    let query=db!.from("recipes").select("*").order("title",{ascending:true});
    if(!admin)query=query.eq("status","published");
    const {data,error:queryError}=await query;
    if(queryError)throw queryError;
    if(active&&current===request){setRows((data??[]) as RecipeRecord[]);setIsAdmin(admin);setLoading(false);}
   }catch(e){
    if(active&&current===request){setError(e instanceof Error?e.message:String(e));setLoading(false);}
   }
  }
  void refresh();
  const {data:{subscription}}=db.auth.onAuthStateChange(()=>{void refresh();});
  return()=>{active=false;request++;subscription.unsubscribe();};
 },[]);
 const published=rows.filter(r=>r.status==="published");
 const drafts=isAdmin?rows.filter(r=>r.status==="draft"):[];
 const knownSlugs=new Set(rows.map(r=>r.slug));
 const historical=catalog.recipes.filter(r=>r.category!=="Ideas & Research"&&!knownSlugs.has(r.slug));
 const concepts=catalog.recipes.filter(r=>r.category==="Ideas & Research"&&!knownSlugs.has(r.slug));
 const hasGhee=published.some(r=>r.slug==="herb-infused-garlic-confit-ghee");
 function cards(items:RecipeRecord[],ownerPreview:boolean){
  return <div className="recipe-card-grid">{items.map(r=><article className="recipe-catalog-card" key={r.slug}>
   {r.photo_url&&<img src={r.photo_url} alt="" style={{width:"100%",height:160,objectFit:"cover",borderRadius:8}}/>}
   <span className="recipe-chip">{r.category} · {ownerPreview?"Private draft":"Published"}</span>
   <h2>{r.title}</h2>
   <p>{r.summary || (ownerPreview?"Recipe in development. Review the ingredients and method before publication.":"")}</p>
   <Link href={`/recipes/${r.slug}`}>{ownerPreview?"Preview saved recipe":"View full recipe"}</Link>
   {ownerPreview&&<small className="recipe-card-hint">{r.ingredients.trim()&&r.instructions.trim()?"Ingredients and method available":r.ingredients.trim()?"Ingredients only — method incomplete":"Source notes / incomplete recipe"}</small>}
  </article>)}</div>;
 }
 return <div className="recipe-site recipe-shell">
 <p className="recipe-crumb"><Link href="/">Home</Link> / Recipe collection</p>
 <p className="recipe-kicker">The Tito Vee's Kitchen collection</p>
 <h1 className="recipe-title">Every recipe has a story.</h1>
 <p className="recipe-subtitle">Explore published recipes and the kitchen journal. When signed in as the owner, you can also preview every saved draft before publishing.</p>
 {loading&&<p role="status" className="recipe-note">Loading saved recipe catalog…</p>}
 {error&&<p role="alert" className="recipe-note">Unable to load live recipes: {error}</p>}
 {isAdmin&&<div className="recipe-draft-banner"><strong>OWNER VIEW — PRIVATE DRAFTS ENABLED</strong><p>You can see and open all {drafts.length} unpublished drafts. Visitors cannot access their contents. Review a draft before publishing.</p><Link href="/admin/recipes">Manage recipes</Link></div>}
 <div className="recipe-divider"/>
 {!hasGhee&&<section className="recipe-feature"><span>Featured • Original fully documented recipe</span><strong>Herb-Infused Garlic Confit Ghee</strong><p>Soft garlic, herb warmth and a fully strained, golden finishing fat.</p><Link className="button" href="/recipes/herb-infused-garlic-confit-ghee" style={{alignSelf:"flex-start"}}>{isAdmin?"Preview database draft":"Read the recipe"}</Link></section>}
 {published.length>0&&<section className="recipe-section"><p className="recipe-kicker">Ready to cook</p><h2>Published recipes</h2>{cards(published,false)}</section>}
 {isAdmin&&drafts.length>0&&<section className="recipe-section"><p className="recipe-kicker">Owner-only collection</p><h2>Saved recipe drafts ({drafts.length})</h2><p className="recipe-subtitle">Open any card to see the database ingredients and method in a full recipe layout, even while it remains unpublished. Draft content is private to admin accounts.</p>{cards(drafts,true)}</section>}
 {historical.length>0&&<><div className="recipe-divider"/><p className="recipe-kicker">Kitchen journal</p><h2 style={{fontSize:"2.1rem",margin:".4rem 0"}}>Recipe archive</h2><p className="recipe-subtitle">{historical.length} recorded recipes and components awaiting publication. These archive cards are references, not verified instructions.</p>
 {categoryList.filter(c=>c!=="Ideas & Research").map(category=>{
 const items=historical.filter(r=>r.category===category);
 return items.length>0&&<section key={category} className="recipe-section"><h2>{category}</h2><div className="recipe-card-grid">{items.map(r=><article key={r.slug} className="recipe-catalog-card"><span className="recipe-chip">Archive · Not published</span><h2>{r.title}</h2><p>{r.status}</p>{r.verified_full_recipe?<Link href={`/recipes/${r.slug}`}>Read documented recipe</Link>:<span className="recipe-card-hint">Full recipe is not available to visitors</span>}</article>)}</div></section>;
 })}
 </>}
 {concepts.length>0&&<section className="recipe-section"><h2>In the Kitchen Lab</h2><p className="recipe-subtitle">Cooking investigations, not published personal recipes.</p><div className="recipe-card-grid">{concepts.map(idea=><article key={idea.slug} className="recipe-catalog-card"><span className="recipe-chip">Research only</span><h2>{idea.title}</h2><p>{idea.status}</p></article>)}</div></section>}
 </div>;
}
