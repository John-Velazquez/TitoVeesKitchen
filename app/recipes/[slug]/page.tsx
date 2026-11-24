import type {Metadata} from "next";
import {getSupabase} from "@/lib/supabase";
import {PublishedOverride} from "@/components/PublishedOverride";

type RecipeParams = {params:Promise<{slug:string}>};
const SITE_URL = "https://titovees-kitchen-preview.vercel.app";

export async function generateMetadata({params}:RecipeParams):Promise<Metadata>{
 const {slug}=await params;
 const db=getSupabase();
 if(!db)return {title:"Recipe unavailable | Tito Vee's Kitchen",robots:{index:false,follow:false}};
 try{
  // Read published records only. Drafts must never appear in public metadata.
  const {data,error}=await db.from("recipes")
   .select("title,summary,photo_url")
   .eq("slug",slug).eq("status","published").maybeSingle();
  if(error||!data)return {title:"Recipe not available | Tito Vee's Kitchen",robots:{index:false,follow:false}};
  const title=`${data.title} | Tito Vee's Kitchen`;
  const description=data.summary?.trim()||`Explore ${data.title} from Tito Vee's Kitchen.`;
  const url=`${SITE_URL}/recipes/${encodeURIComponent(slug)}`;
  const images=data.photo_url?.trim()?[{url:data.photo_url,alt:data.title}]:undefined;
  return {
   title,description,
   alternates:{canonical:url},
   openGraph:{title,description,url,type:"article",...(images?{images}:{})},
  };
 }catch{
  return {title:"Recipe unavailable | Tito Vee's Kitchen",robots:{index:false,follow:false}};
 }
}

export default async function RecipeDetail({params}:RecipeParams){
 const {slug}=await params;
 return <PublishedOverride slug={slug}/>;
}
