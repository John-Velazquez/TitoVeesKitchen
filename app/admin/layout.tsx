"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {getSupabase} from "@/lib/supabase";

type Access="checking"|"granted"|"sign-in"|"forbidden"|"unconfigured"|"error";

export default function AdminLayout({children}:{children:React.ReactNode}){
 const [access,setAccess]=useState<Access>("checking");
 useEffect(()=>{
  const db=getSupabase();
  if(!db){setAccess("unconfigured");return;}
  let active=true;
  let version=0;
  async function check(){
   const current=++version;
   setAccess("checking");
   try{
    // getUser verifies the current session with Supabase Auth.
    const {data,error}=await db!.auth.getUser();
    if(!active||current!==version)return;
    if(error||!data.user){setAccess("sign-in");return;}
    const profile=await db!.from("profiles").select("role").eq("id",data.user.id).maybeSingle();
    if(!active||current!==version)return;
    if(profile.error){setAccess("error");return;}
    setAccess(profile.data?.role==="admin"?"granted":"forbidden");
   }catch{if(active&&current===version)setAccess("error");}
  }
  void check();
  const {data:{subscription}}=db.auth.onAuthStateChange(()=>{void check();});
  function recheck(){if(document.visibilityState==="visible")void check();}
  document.addEventListener("visibilitychange",recheck);
  return()=>{active=false;version++;subscription.unsubscribe();document.removeEventListener("visibilitychange",recheck);};
 },[]);
 if(access==="granted")return <>{children}</>;
 return <section className="shell" aria-live="polite">
  {access==="checking"?<p>Checking admin access…</p>:
   access==="sign-in"?<><h1>Admin sign-in required</h1><p>Only signed-in administrators can access this area.</p><Link className="button" href="/login">Sign in</Link></>:
   access==="forbidden"?<><h1>Access restricted</h1><p>This account does not have administrator permissions.</p><Link href="/dashboard">Back to your dashboard</Link></>:
   access==="unconfigured"?<><h1>Admin unavailable</h1><p>Authentication is not configured.</p></>:
   <><h1>Unable to verify access</h1><p>Try signing in again. No administrative content has been displayed.</p><Link href="/login">Sign in</Link></>}
 </section>;
}
