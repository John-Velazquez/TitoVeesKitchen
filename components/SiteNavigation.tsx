"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {getSupabase} from "@/lib/supabase";

type AccountState="checking"|"guest"|"member"|"admin";
export default function SiteNavigation(){
 const [account,setAccount]=useState<AccountState>("checking");
 const router=useRouter();
 useEffect(()=>{
  const db=getSupabase();
  if(!db){setAccount("guest");return;}
  let active=true;
  let sequence=0;
  async function refresh(){
   const current=++sequence;
   try{
    const {data,error}=await db!.auth.getUser();
    if(!active||current!==sequence)return;
    if(error||!data.user){setAccount("guest");return;}
    const {data:profile}=await db!.from("profiles").select("role").eq("id",data.user.id).maybeSingle();
    if(!active||current!==sequence)return;
    setAccount(profile?.role==="admin"?"admin":"member");
   }catch{
    if(active&&current===sequence)setAccount("guest");
   }
  }
  void refresh();
  const {data:{subscription}}=db.auth.onAuthStateChange(()=>{void refresh();});
  function onReturn(){if(document.visibilityState==="visible")void refresh();}
  document.addEventListener("visibilitychange",onReturn);
  return()=>{active=false;sequence++;subscription.unsubscribe();document.removeEventListener("visibilitychange",onReturn);};
 },[]);
 async function signOut(){
  const db=getSupabase();
  if(!db)return;
  const {error}=await db.auth.signOut();
  if(error){window.alert("Unable to sign out: "+error.message);return;}
  setAccount("guest");
  router.replace("/");
  router.refresh();
 }
 return <nav aria-label="Main navigation">
  <Link href="/recipes">Recipes</Link>
  <Link href="/#kitchen">My Kitchen</Link>
  <Link href="/#prep">Wanna Meal Prep?</Link>
  {account==="admin"&&<Link href="/admin">Admin</Link>}
  {(account==="member"||account==="admin")&&<Link href="/dashboard">Dashboard</Link>}
  {account==="guest"&&<Link href="/login">Sign in</Link>}
  {account==="checking"&&<span aria-live="polite" className="muted" style={{fontSize:".9rem"}}>Checking account…</span>}
  {(account==="member"||account==="admin")&&<button type="button" className="nav-signout" onClick={signOut}>Sign out</button>}
 </nav>;
}
