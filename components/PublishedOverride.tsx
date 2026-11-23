"use client";
import {useEffect,useState,type ReactNode} from "react";
import Link from "next/link";
import {getSupabase} from "@/lib/supabase";
import {cleanLines,type RecipeRecord} from "@/lib/recipe-types";
import "@/app/recipes/recipes.css";

export function PublishedOverride({slug,fallback=null}:{slug:string;fallback?:ReactNode}){
 const [recipe,setRecipe]=useState<RecipeRecord|null>(null);
 useEffect(()=>{
  let active=true;const db=getSupabase();
  if(!db)return;
  db.from("recipes").select("*").eq("slug",slug).eq("status","published").maybeSingle()
   .then(({data})=>{if(active&&data)setRecipe(data as RecipeRecord);});
  return()=>{active=false};
 },[slug]);
 if(!recipe)return <>{fallback??<div className="recipe-site recipe-shell"><p className="recipe-crumb"><Link href="/recipes">Recipes</Link></p><h1>Recipe unavailable</h1><p>This recipe has not been published.</p></div>}</>;
 const blocks:[string,string][]=[
  ["Equipment",recipe.equipment],["Ingredients",recipe.ingredients],["The method",recipe.instructions],
  ["Substitutions",recipe.substitutions],["Storage & reheating",recipe.storage_notes],
  ["Quick tricks",recipe.quick_tricks],["Estimated macros",recipe.macros]
 ];
 return <article className="recipe-site recipe-shell">
  <p className="recipe-crumb"><Link href="/">Home</Link> / <Link href="/recipes">Recipes</Link> / {recipe.title}</p>
  <p className="recipe-kicker">Tito Vee's Kitchen / {recipe.category}</p>
  <h1 className="recipe-title">{recipe.title}</h1>
  {recipe.summary&&<p className="recipe-subtitle">{recipe.summary}</p>}
  <dl className="recipe-facts">
   <div><dt>Yield</dt><dd>{recipe.yield_text||"See recipe"}</dd></div>
   <div><dt>Prep</dt><dd>{recipe.prep_minutes===null?"—":recipe.prep_minutes+" min"}</dd></div>
   <div><dt>Cook</dt><dd>{recipe.cook_minutes===null?"—":recipe.cook_minutes+" min"}</dd></div>
   <div><dt>Category</dt><dd>{recipe.category}</dd></div>
  </dl>
  {recipe.photo_url&&<img src={recipe.photo_url} alt={recipe.title} style={{width:"100%",maxHeight:520,objectFit:"cover",borderRadius:14}}/>}
  {recipe.video_url&&<p><a href={recipe.video_url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"underline"}}>Watch Me Make It ↗</a></p>}
  <div className="recipe-grid"><div>
   {blocks.filter(x=>x[0]!=="Equipment"&&x[0]!=="Ingredients").map(([title,content])=>content.trim()&&<section className="recipe-section" key={title}><h2>{title}</h2>{title==="The method"?cleanLines(content).map((line,i)=><div className="recipe-step" key={i}><span className="recipe-step-number">{String(i+1).padStart(2,"0")}</span><p>{line}</p></div>):content.split("\n").map((line,i)=><p key={i} style={{whiteSpace:"pre-wrap"}}>{line||" "}</p>)}</section>)}
  </div><aside>{blocks.filter(x=>x[0]==="Equipment"||x[0]==="Ingredients").map(([title,content])=>content.trim()&&<section className="recipe-panel" key={title} style={{marginBottom:"1rem"}}><h2>{title}</h2><ul className="recipe-list">{cleanLines(content).map((line,i)=><li key={i}>{line}</li>)}</ul></section>)}</aside></div>
 </article>;
}
