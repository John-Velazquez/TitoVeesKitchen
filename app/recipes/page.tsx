"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {getSupabase} from "@/lib/supabase";
import {type RecipeRecord} from "@/lib/recipe-types";
import "./recipes.css";

const RESEARCH="Ideas & Research";
export default function Recipes(){
 const [rows,setRows]=useState<RecipeRecord[]>([]);
 const [isAdmin,setIsAdmin]=useState(false);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState("");
 const [query,setQuery]=useState("");
 const [category,setCategory]=useState("All");
 useEffect(()=>{
  let active=true;let request=0;
  const db=getSupabase();
  if(!db){setLoading(false);setError("Recipe service is not configured.");return;}
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
    let rq=db!.from("recipes").select("*").order("title",{ascending:true});
    if(!admin)rq=rq.eq("status","published");
    const {data,error:queryError}=await rq;
    if(queryError)throw queryError;
    if(active&&current===request){setRows((data??[]) as RecipeRecord[]);setIsAdmin(admin);setLoading(false);}
   }catch(e){if(active&&current===request){setError(e instanceof Error?e.message:String(e));setLoading(false);}}
  }
  void refresh();
  const {data:{subscription}}=db.auth.onAuthStateChange(()=>{void refresh();});
  return()=>{active=false;request++;subscription.unsubscribe();};
 },[]);
 const published=rows.filter(r=>r.status==="published"&&r.category!==RESEARCH);
 const developing=rows.filter(r=>r.status==="draft"&&r.category!==RESEARCH);
 const research=rows.filter(r=>r.category===RESEARCH);
 const categories=useMemo(()=>["All",...Array.from(new Set(published.map(r=>r.category))).sort()], [rows]);
 const filtered=published.filter(r=>(category==="All"||r.category===category) &&
  (r.title+" "+r.category+" "+r.summary+" "+r.ingredients).toLowerCase().includes(query.trim().toLowerCase()));
 const byCategory=Array.from(new Set(filtered.map(r=>r.category))).sort();
 return <main className="recipe-site recipe-shell">
  <p className="recipe-crumb"><Link href="/">Home</Link> / Recipe collection</p>
  <p className="recipe-kicker">Tito Vee's Kitchen / Recipe collection</p>
  <h1 className="recipe-title">From my kitchen to yours.</h1>
  <p className="recipe-subtitle">Original cooking projects, family favorites and tested experiments, documented with ingredients and instructions. Some recipes were recovered from working notes, with missing quantities identified instead of guessed.</p>
  {loading&&<p role="status" className="recipe-note">Loading recipes…</p>}
  {error&&<p role="alert" className="recipe-note">Unable to load recipes: {error}</p>}
  {!loading&&!error&&<p className="recipe-collection-count">{published.length} recipes in the collection</p>}
  <div className="recipe-search-toolbar">
   <label className="recipe-search-field">Search recipes<input aria-label="Search recipes" placeholder="Search recipes, ingredients, or categories" value={query} onChange={e=>setQuery(e.target.value)}/></label>
   <label className="recipe-search-field">Category<select aria-label="Filter recipes by category" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
  </div>
  {isAdmin&&<div className="recipe-owner-toolbar"><span>Owner account</span><Link href="/admin/recipes">Edit recipe collection</Link></div>}
  {!loading&&!error&&filtered.length===0&&<div className="recipe-note">No recipes match your search. Try another category or keyword.</div>}
  {byCategory.map(group=><section className="recipe-section" key={group}>
   <h2>{group}</h2>
   <div className="recipe-card-grid">
    {filtered.filter(r=>r.category===group).map(r=><article className="recipe-catalog-card" key={r.id}>
     {r.photo_url&&<img src={r.photo_url} alt="" loading="lazy" style={{width:"100%",height:160,objectFit:"cover",borderRadius:8}}/>}
     <span className="recipe-chip">{r.category}</span>
     <h3>{r.title}</h3>
     <p>{r.summary||"View ingredients and cooking directions."}</p>
     <Link href={`/recipes/${r.slug}`}>Read recipe</Link>
    </article>)}
   </div>
  </section>)}
  {isAdmin&&developing.length>0&&<section className="recipe-section">
   <div className="recipe-divider"/>
   <p className="recipe-kicker">Owner workspace</p>
   <h2>Still being documented ({developing.length})</h2>
   <p className="recipe-subtitle">These aren't full recipes yet. They stay editable privately until the missing original methods or measurements are restored.</p>
   <div className="recipe-card-grid">
    {developing.map(r=><article className="recipe-catalog-card" key={r.id}>
     <span className="recipe-chip">Incomplete · Private</span><h3>{r.title}</h3>
     <p>{r.summary||"Original recipe source still incomplete."}</p>
     {r.ingredients.trim()||r.instructions.trim()?<Link href={`/recipes/${r.slug}`}>Review recovered notes</Link>:<span className="recipe-card-hint">No original standalone formula recovered</span>}
     <Link href="/admin/recipes">Edit record</Link>
    </article>)}
   </div>
  </section>}
  {isAdmin&&research.length>0&&<section className="recipe-section">
   <p className="recipe-kicker">Research / Kitchen Lab</p>
   <h2>Ideas we're still developing</h2>
   <div className="recipe-card-grid">{research.map(r=><article className="recipe-catalog-card" key={r.id}>
    <span className="recipe-chip">Research, not a finished recipe</span><h3>{r.title}</h3>
    <p>{r.summary||"This is an exploration from the kitchen journal; there is no finalized ingredient list or method yet."}</p>
    <Link href="/admin/recipes">View in Recipe Manager</Link>
   </article>)}</div>
  </section>}
 </main>;
}
