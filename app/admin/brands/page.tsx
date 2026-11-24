"use client";
import {useCallback,useEffect,useState} from "react";
import Link from "next/link";
import {getSupabase} from "@/lib/supabase";
import {type BrandLink} from "@/lib/recipe-linking";
import "../recipes/manager.css";

type Gate="loading"|"admin"|"denied"|"error";
type Draft={name:string;website_url:string;aliases:string;enabled:boolean;notes:string};
const fresh:Draft={name:"",website_url:"",aliases:"",enabled:true,notes:""};
export default function BrandLinksManager(){
 const [gate,setGate]=useState<Gate>("loading"),[rows,setRows]=useState<BrandLink[]>([]);
 const [id,setId]=useState<string|null>(null),[form,setForm]=useState<Draft>({...fresh});
 const [busy,setBusy]=useState(false),[message,setMessage]=useState("");
 const load=useCallback(async()=>{
  const db=getSupabase();if(!db)return;
  const {data,error}=await db.from("brand_links").select("*").order("name");
  if(error){setMessage(error.message);return;}
  setRows((data??[]) as BrandLink[]);
 },[]);
 useEffect(()=>{
  const db=getSupabase();if(!db){setGate("error");setMessage("Supabase is not configured.");return;}
  let active=true;
  db.auth.getUser().then(async({data,error})=>{
   if(!active)return;
   if(error||!data.user){setGate("denied");return;}
   const profile=await db.from("profiles").select("role").eq("id",data.user.id).maybeSingle();
   if(!active)return;
   if(profile.error){setGate("error");setMessage(profile.error.message);return;}
   if(profile.data?.role!=="admin"){setGate("denied");return;}
   setGate("admin");void load();
  }).catch(e=>{if(active){setGate("error");setMessage(String(e));}});
  return()=>{active=false};
 },[load]);
 function choose(b:BrandLink){
  setId(b.id);setForm({name:b.name,website_url:b.website_url,aliases:b.aliases.join(", "),enabled:b.enabled,notes:b.notes??""});setMessage("");
 }
 function clear(){setId(null);setForm({...fresh});setMessage("");}
 async function save(){
  if(!form.name.trim()){setMessage("Enter a brand name.");return;}
  if(form.website_url && !/^https:\/\/[^\s]+\.[^\s]+$/i.test(form.website_url)){setMessage("Enter an HTTPS brand website, or leave blank until verified.");return;}
  const db=getSupabase();if(!db)return;
  setBusy(true);setMessage("");
  try{
   const payload={name:form.name.trim(),website_url:form.website_url.trim(),aliases:[...new Set(form.aliases.split(",").map(s=>s.trim()).filter(Boolean))],enabled:form.enabled,notes:form.notes.trim(),updated_at:new Date().toISOString()};
   const result=id?await db.from("brand_links").update(payload).eq("id",id).select("*").single():await db.from("brand_links").insert(payload).select("*").single();
   if(result.error)throw result.error;
   setId(result.data.id);setMessage(payload.website_url?"Saved! Brand mentions on recipe pages will link to this website.":"Saved without a website. Mentions stay plain text until you supply the correct URL.");
   await load();
  }catch(e){setMessage("Could not save: "+(e instanceof Error?e.message:String(e)));}
  finally{setBusy(false);}
 }
 async function remove(){
  if(!id||!window.confirm("Delete this brand link? Recipe text stays untouched."))return;
  const db=getSupabase();if(!db)return;setBusy(true);
  const {error}=await db.from("brand_links").delete().eq("id",id);
  if(error)setMessage(error.message);else{clear();setMessage("Brand link deleted. Recipes were not changed.");await load();}
  setBusy(false);
 }
 if(gate!=="admin")return <main className="manager-shell"><h1>Brand links</h1><p>{gate==="loading"?"Checking access…":gate==="denied"?<>Admin login required. <Link href="/login">Sign in</Link>.</>:message}</p></main>;
 return <main className="manager-shell">
  <div className="manager-heading"><div><p className="eyebrow">TITO VEE'S KITCHEN / OWNER STUDIO</p><h1>Brand website links</h1><p className="muted">Link named commercial ingredients to their actual maker's website, while your homemade components link to your own recipes. Nothing is linked to a guessed URL.</p></div><div className="manager-buttons"><Link className="button secondary" href="/admin/recipes">Recipe Manager</Link><button onClick={clear}>+ New brand</button></div></div>
  <div className="manager-layout">
   <aside className="manager-sidebar">
    <strong>Saved brand entries ({rows.length})</strong>
    <p className="muted">Select an entry to change its official website or alternative spellings.</p>
    {rows.map(b=><button key={b.id} type="button" onClick={()=>choose(b)} className={"manager-recipe"+(id===b.id?" active":"")}><strong>{b.name}</strong><small>{b.website_url?b.website_url:"Awaiting confirmed website"}</small></button>)}
   </aside>
   <section className="manager-editor">
    <div className="manager-editor-top"><h2>{id?"Edit brand":"New brand"}</h2></div>
    <div className="manager-fields">
     <label className="field">Brand name<input value={form.name} placeholder="e.g. Dot's" onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></label>
     <label className="field">Official brand website (HTTPS)<input type="url" value={form.website_url} placeholder="https://example.com" onChange={e=>setForm(f=>({...f,website_url:e.target.value}))}/></label>
     <label className="field">Other names / spellings (comma-separated)<input value={form.aliases} placeholder="DOTS, Dot’s" onChange={e=>setForm(f=>({...f,aliases:e.target.value}))}/></label>
     <label className="field">Private notes<textarea rows={3} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></label>
     <label className="field" style={{display:"flex",alignItems:"center",gap:12}}><input style={{width:20}} type="checkbox" checked={form.enabled} onChange={e=>setForm(f=>({...f,enabled:e.target.checked}))}/>Enable this link</label>
    </div>
    <div className="manager-bottom">
     {message&&<p role="status" className="message">{message}</p>}
     <div className="manager-buttons"><button disabled={busy} onClick={save}>{busy?"Saving…":"Save brand link"}</button>{id&&<button disabled={busy} onClick={remove} className="manager-danger">Delete</button>}</div>
     <p className="muted">Links appear automatically when recipe instructions or ingredient lists mention a matching brand. Visitors open brand websites in a new tab; the site never claims sponsorship or endorsement.</p>
    </div>
   </section>
  </div>
 </main>;
}
