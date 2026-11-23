"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import catalog from "../../data/recipe-catalog.json";
import {getSupabase} from "@/lib/supabase";
import {type RecipeRecord} from "@/lib/recipe-types";
import "./recipes.css";
const categoryList=Array.from(new Set(catalog.recipes.map(r=>r.category))).sort();
export default function Recipes(){
 const [published,setPublished]=useState<RecipeRecord[]>([]);
 useEffect(()=>{let active=true;const db=getSupabase();if(!db)return;
  db.from("recipes").select("*").eq("status","published").order("title").then(({data})=>{if(active&&data)setPublished(data as RecipeRecord[]);});
  return()=>{active=false};
 },[]);
 const publishedSlugs=new Set(published.map(r=>r.slug));
 const historical=catalog.recipes.filter(r=>r.category!=="Ideas & Research"&&!publishedSlugs.has(r.slug));
 const concepts=catalog.recipes.filter(r=>r.category==="Ideas & Research"&&!publishedSlugs.has(r.slug));
 const hasGhee=publishedSlugs.has("herb-infused-garlic-confit-ghee");
 return <div className="recipe-site recipe-shell">
 <p className="recipe-crumb"><Link href="/">Home</Link> / Recipe collection</p>
 <p className="recipe-kicker">The Tito Vee's Kitchen collection</p>
 <h1 className="recipe-title">Every recipe has a story.</h1>
 <p className="recipe-subtitle">Browse our growing recipe collection and the kitchen journal. Fully published recipes are cook-ready; archive records are being recovered and refined.</p>
 <div className="recipe-divider"/>
 {!hasGhee&&<section className="recipe-feature"><span>Featured • Fully documented recipe</span><strong>Herb-Infused Garlic Confit Ghee</strong><p>Soft garlic, herb warmth and a fully strained, golden finishing fat.</p><Link className="button" href="/recipes/herb-infused-garlic-confit-ghee" style={{alignSelf:"flex-start"}}>Read the recipe</Link></section>}
 {published.length>0&&<section className="recipe-section"><p className="recipe-kicker">Ready to cook</p><h2>Published recipes</h2><div className="recipe-card-grid">{published.map(r=><article className="recipe-catalog-card" key={r.slug}>{r.photo_url&&<img src={r.photo_url} alt="" style={{width:"100%",height:160,objectFit:"cover",borderRadius:8}}/>}<span className="recipe-chip">{r.category} · Published</span><h2>{r.title}</h2><p>{r.summary}</p><Link href={`/recipes/${r.slug}`}>View full recipe</Link></article>)}</div></section>}
 <div className="recipe-divider"/><p className="recipe-kicker">Kitchen journal</p><h2 style={{fontSize:"2.1rem",margin:".4rem 0"}}>Recipe archive</h2>
 <p className="recipe-subtitle">{historical.length} recorded recipes and components awaiting complete publication, plus {concepts.length} research topics. These records are references, not verified instructions.</p>
 {categoryList.filter(c=>c!=="Ideas & Research").map(category=>{
 const items=historical.filter(r=>r.category===category);
 return items.length>0&&<section key={category} className="recipe-section"><h2>{category}</h2><div className="recipe-card-grid">{items.map(r=><article key={r.slug} className="recipe-catalog-card"><span className="recipe-chip">Archive · In development</span><h2>{r.title}</h2><p>{r.status}</p>{r.verified_full_recipe?<Link href={`/recipes/${r.slug}`}>Read documented recipe</Link>:<span style={{fontSize:".8rem",color:"#74665a"}}>Recipe details being recovered</span>}</article>)}</div></section>;
 })}
 {concepts.length>0&&<section className="recipe-section"><h2>In the Kitchen Lab</h2><p className="recipe-subtitle">Cooking investigations, not published personal recipes.</p><div className="recipe-card-grid">{concepts.map(idea=><article key={idea.slug} className="recipe-catalog-card"><span className="recipe-chip">Research only</span><h2>{idea.title}</h2><p>{idea.status}</p></article>)}</div></section>}
 </div>;
}
