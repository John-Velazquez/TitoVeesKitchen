import {PublishedOverride} from "@/components/PublishedOverride";
export default async function RecipeDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 return <PublishedOverride slug={slug}/>;
}
