"use client";
import {useCallback,useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {getSupabase} from "@/lib/supabase";
import {emptyRecipe,toSlug,type RecipeRecord,type RecipeInput} from "@/lib/recipe-types";
import archive from "@/data/recipe-catalog.json";
import "./manager.css";
const fields: {key:keyof RecipeInput; label:string; hint?:string; long?:boolean}[] = [
 {key:"title",label:"Recipe name"},{key:"slug",label:"URL slug"},
 {key:"category",label:"Category"},{key:"summary",label:"Introduction",long:true},
 {key:"yield_text",label:"Yield / servings"},
 {key:"equipment",label:"Equipment — one item per line",long:true},
 {key:"ingredients",label:"Ingredients — one per line, group with headings",long:true},
 {key:"instructions",label:"Method — one step per line",long:true},
 {key:"substitutions",label:"Substitutions",long:true},
 {key:"storage_notes",label:"Storage & reheating",long:true},
 {key:"quick_tricks",label:"Quick tricks / chef's notes",long:true},
 {key:"macros",label:"Estimated macros (total, serving, portions, assumptions)",long:true},
 {key:"photo_url",label:"Photo URL"},
 {key:"video_url",label:"Watch Me Make It — video URL"},
 {key:"source_notes",label:"Private recovery / test notes",long:true}
];
const categories=Array.from(new Set(archive.recipes.map(x=>x.category))).filter(x=>x!=="Ideas & Research");
type Gate="checking"|"allowed"|"denied"|"unconfigured"|"error";
export default function RecipeManager(){
 const [gate,setGate]=useState<Gate>("checking"),[rows,setRows]=useState<RecipeRecord[]>([]);
 const [selected,setSelected]=useState<string|null>(null),[form,setForm]=useState<RecipeInput>({...emptyRecipe});
 const [busy,setBusy]=useState(false),[notice,setNotice]=useState(""),[query,setQuery]=useState("");
 const [photo,setPhoto]=useState<File|null>(null),[showArchive,setShowArchive]=useState(false);
 const load=useCallback(async()=>{
  const db=getSupabase();if(!db)return;
  const {data,error}=await db.from("recipes").select("*").order("title",{ascending:true});
  if(error){setNotice("Could not load recipes: "+error.message);return;}
  const notesResult=await db.from("recipe_editor_notes").select("recipe_id,notes");
  if(notesResult.error){setNotice("Could not load private notes: "+notesResult.error.message);return;}
  const notesMap=new Map((notesResult.data??[]).map(n=>[n.recipe_id,n.notes]));
  setRows((data??[]).map(row=>({...row,source_notes:notesMap.get(row.id)??""})) as RecipeRecord[]);
 },[]);
 useEffect(()=>{
  let active=true;const db=getSupabase();
  if(!db){setGate("unconfigured");return;}
  db.auth.getUser().then(async({data,error})=>{
   if(!active)return;
   if(error||!data.user){setGate("denied");return;}
   const profile=await db.from("profiles").select("role").eq("id",data.user.id).maybeSingle();
   if(!active)return;
   if(profile.error){setNotice(profile.error.message);setGate("error");return;}
   if(profile.data?.role!=="admin"){setGate("denied");return;}
   setGate("allowed");void load();
  }).catch(e=>{if(active){setGate("error");setNotice(String(e));}});
  return()=>{active=false};
 },[load]);
 const filtered=useMemo(()=>rows.filter(r=>(r.title+" "+r.category).toLowerCase().includes(query.toLowerCase())),[rows,query]);
 const hasRecipeContent=(r:Pick<RecipeInput,"ingredients"|"instructions">)=>Boolean(r.ingredients.trim()&&r.instructions.trim());
 const selectedRow=rows.find(r=>r.id===selected);
 const previewAvailable=form.slug==="herb-infused-garlic-confit-ghee" || form.status==="published";
 function edit(row:RecipeRecord){setSelected(row.id);const {id:unused,created_at,updated_at,...values}=row;void unused;void created_at;void updated_at;setForm(values);setPhoto(null);setNotice("");}
 function reset(){setSelected(null);setForm({...emptyRecipe});setPhoto(null);setNotice("");}
 function set<K extends keyof RecipeInput>(key:K,value:RecipeInput[K]){setForm(f=>({...f,[key]:value}));}
 async function save(nextStatus: "draft" | "published"){
  const db=getSupabase();if(!db)return;
  const clean={...form,title:form.title.trim(),slug:toSlug(form.slug||form.title),status:nextStatus};
  if(!clean.title||!clean.slug){setNotice("Recipe name and URL slug are required.");return;}
  if(nextStatus==="published"&&(!clean.ingredients.trim()||!clean.instructions.trim())){setNotice("Publishing requires both ingredients and instructions.");return;}
  setBusy(true);setNotice("");
  try{
   let photoUrl=clean.photo_url;
   if(photo){
    if(!["image/jpeg","image/png","image/webp"].includes(photo.type)||photo.size>5*1024*1024)throw new Error("Use a JPG, PNG or WebP image smaller than 5 MB.");
    const safeName=photo.name.replace(/[^a-zA-Z0-9._-]/g,"-");
    const objectName=clean.slug+"/"+crypto.randomUUID()+"-"+safeName;
    const uploaded=await db.storage.from("recipe-photos").upload(objectName,photo,{contentType:photo.type,upsert:false});
    if(uploaded.error)throw uploaded.error;
    photoUrl=db.storage.from("recipe-photos").getPublicUrl(objectName).data.publicUrl;
   }
   const {source_notes,...publicFields}=clean;
   const payload={...publicFields,photo_url:photoUrl};
   const result=selected
    ? await db.from("recipes").update(payload).eq("id",selected).select("*").single()
    : await db.from("recipes").insert(payload).select("*").single();
   if(result.error)throw result.error;
   const saved=result.data as RecipeRecord;
   const noteResult=await db.from("recipe_editor_notes").upsert({recipe_id:saved.id,notes:source_notes},{onConflict:"recipe_id"});
   if(noteResult.error)throw noteResult.error;
   setSelected(saved.id);setForm({...payload,source_notes});
   setNotice(nextStatus==="published"?"Recipe published successfully.":"Draft saved successfully.");
   setPhoto(null);await load();
  }catch(e){setNotice("Save failed: "+(e instanceof Error?e.message:String(e)));}
  finally{setBusy(false);}
 }
 async function remove(){
  if(!selected||!window.confirm("Delete this recipe permanently? This cannot be undone."))return;
  const db=getSupabase();if(!db)return;setBusy(true);
  const result=await db.from("recipes").delete().eq("id",selected);
  if(result.error){setNotice("Delete failed: "+result.error.message);}
  else{reset();setNotice("Recipe deleted.");await load();}
  setBusy(false);
 }
 async function importArchive(){
  if(!window.confirm("Import missing catalog titles as PRIVATE DRAFTS? Existing recipes will not be overwritten."))return;
  const db=getSupabase();if(!db)return;setBusy(true);setNotice("");
  try{
   const present=new Set(rows.map(r=>r.slug));
   const missing=archive.recipes.filter(x=>!present.has(x.slug));
   let imported=0;
   for(let i=0;i<missing.length;i+=20){
    const batch=missing.slice(i,i+20);
    const publicBatch=batch.map(x=>{const {source_notes,...defaults}=emptyRecipe;void source_notes;
      return {...defaults,slug:x.slug,title:x.title,category:x.category,status:"draft" as const};});
    const result=await db.from("recipes").upsert(publicBatch,{onConflict:"slug",ignoreDuplicates:true});
    if(result.error)throw result.error;
    const fetched=await db.from("recipes").select("id,slug").in("slug",batch.map(x=>x.slug));
    if(fetched.error)throw fetched.error;
    const bySlug=new Map((fetched.data??[]).map(row=>[row.slug,row.id]));
    const noteBatch=batch.filter(x=>bySlug.has(x.slug)).map(x=>({
      recipe_id:bySlug.get(x.slug)!,
      notes:["Source: "+x.source,"Evidence: "+x.evidence,"Prior status: "+x.status,x.notes].filter(Boolean).join("\n")
    }));
    if(noteBatch.length){
      const noteResult=await db.from("recipe_editor_notes").upsert(noteBatch,{onConflict:"recipe_id",ignoreDuplicates:true});
      if(noteResult.error)throw noteResult.error;
    }
    imported+=batch.length;
   }
   setNotice("Import finished. Up to "+imported+" missing records added as drafts; existing records untouched.");
   await load();setShowArchive(false);
  }catch(e){setNotice("Import interrupted: "+(e instanceof Error?e.message:String(e)));}
  finally{setBusy(false);}
 }
 if(gate!=="allowed")return <div className="shell"><p className="eyebrow">RECIPE MANAGER</p><h1>Owner access</h1><div className="panel">{gate==="checking"?"Checking your account…":gate==="unconfigured"?"Supabase is not configured. Set up the project and database before using this editor.":gate==="denied"?<>This area requires an admin account. <Link href="/login" style={{textDecoration:"underline"}}>Sign in</Link> with your owner account.</>:notice||"Unable to confirm admin access."}</div></div>;
 return <main className="manager-shell"><div className="manager-heading"><div><p className="eyebrow">OWNER STUDIO / RECIPE COLLECTION</p><h1>Recipe Manager</h1><p className="muted">Draft, refine and publish without editing website code. Only published recipes appear on public pages.</p></div><div className="manager-buttons"><Link className="button secondary" href="/admin">Admin home</Link><button onClick={reset}>+ New recipe</button></div></div>
 <div className="manager-layout"><aside className="manager-sidebar"><label className="field">Find a recipe<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name or category"/></label><div className="manager-toolbar"><strong>{rows.length} saved recipes</strong><button type="button" className="textbutton" onClick={()=>setShowArchive(v=>!v)}>Import archive</button></div>
 {showArchive&&<div className="manager-callout"><p>Bring in the 50 recovered catalog entries as private drafts. Existing slugs stay unchanged; no recipe is published automatically.</p><button type="button" disabled={busy} onClick={importArchive}>Import missing drafts</button></div>}
 {filtered.map(r=><button type="button" key={r.id} onClick={()=>edit(r)} className={"manager-recipe"+(selected===r.id?" active":"")}><strong>{r.title}</strong><small>{r.category} · {r.status} · {hasRecipeContent(r)?"Content loaded":"Title only"}</small></button>)}
 {filtered.length===0&&<p className="muted">No saved recipes match. You can import the archive or add a new recipe.</p>}</aside>
 <section className="manager-editor"><div className="manager-editor-top"><h2>{selected?"Edit recipe":"New recipe"}</h2><span className={"manager-state "+form.status}>{form.status.toUpperCase()}</span></div>
 {selected&&<div className="manager-content-check" role="status">
  {hasRecipeContent(form)?<p><strong>Recipe content loaded.</strong> Ingredients and instructions are editable below. Click <strong>Save draft</strong> to keep your changes private, or <strong>Publish</strong> to show them to visitors.</p>:<p><strong>Archive record — title only.</strong> The original recipe details have not been recovered into this database entry. No measurements or instructions have been invented; use the private source notes below when reconstructing it.</p>}
  {previewAvailable&&<p><Link href={`/recipes/${form.slug}`} target="_blank" rel="noopener noreferrer">View current public recipe ↗</Link>{form.status==="draft"&&form.slug==="herb-infused-garlic-confit-ghee"&&" · This ghee page currently displays the original static recipe. Publishing your saved draft will replace that version."}</p>}
  {selectedRow?.updated_at&&<small>Last database update: {new Date(selectedRow.updated_at).toLocaleString()}</small>}
 </div>}
 <div className="manager-fields">{fields.map(({key,label,long})=><label key={key} className="field">{label}{key==="category"?<><select value={form.category} onChange={e=>set("category",e.target.value)}>{[...new Set([...categories,form.category])].map(x=><option key={x} value={x}>{x}</option>)}</select></>:long?<textarea rows={key==="instructions"||key==="ingredients"?7:3} value={String(form[key]??"")} onChange={e=>set(key,e.target.value)} />:<input value={String(form[key]??"")} onChange={e=>set(key,e.target.value)} onBlur={()=>{if(key==="slug")set("slug",toSlug(form.slug));if(key==="title"&&!form.slug)set("slug",toSlug(form.title));}} />}</label>)}
 <div className="manager-two"><label className="field">Prep minutes<input type="number" min="0" value={form.prep_minutes??""} onChange={e=>set("prep_minutes",e.target.value===""?null:Number(e.target.value))}/></label><label className="field">Cook minutes<input type="number" min="0" value={form.cook_minutes??""} onChange={e=>set("cook_minutes",e.target.value===""?null:Number(e.target.value))}/></label></div>
 <label className="field">Upload recipe photo (JPG, PNG, WebP; max 5 MB)<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setPhoto(e.target.files?.[0]??null)}/></label>
 {form.photo_url&&<p className="muted">Current photo: <a target="_blank" rel="noreferrer" style={{textDecoration:"underline"}} href={form.photo_url}>View image</a></p>}
 </div><div className="manager-bottom">{notice&&<p role="status" className="message">{notice}</p>}<div className="manager-buttons"><button disabled={busy} onClick={()=>save("draft")}>{busy?"Working…":"Save draft"}</button><button disabled={busy} onClick={()=>save("published")}>Publish</button>{selected&&<button disabled={busy} className="manager-danger" onClick={remove}>Delete</button>}</div><p className="muted">Publishing requires ingredients and method. You are responsible for verifying amounts, food safety, and nutrition before publishing.</p></div>
 </section></div></main>;
}
