"use client";
import Link from "next/link";
import {linkMatches,tokenizeRecipeText,type BrandLink,type RecipeLinkTarget} from "@/lib/recipe-linking";
import {useMemo} from "react";

export default function LinkedRecipeText({text,currentSlug,recipes,brands}:{
 text:string;currentSlug:string;recipes:RecipeLinkTarget[];brands:BrandLink[]
}){
 const links=useMemo(()=>linkMatches(recipes,brands,currentSlug),[recipes,brands,currentSlug]);
 const parts=useMemo(()=>tokenizeRecipeText(text,links),[text,links]);
 return <>{parts.map((p,i)=>!p.link?p.text:
  p.link.kind==="recipe"
  ?<Link className="recipe-inline-link" href={p.link.url} title={"View "+p.link.title+" recipe"} key={i}>{p.text}</Link>
  :<a className="recipe-inline-link brand" href={p.link.url} title={p.link.title} target="_blank" rel="noopener noreferrer" key={i}>{p.text}<span className="recipe-external-mark" aria-hidden="true">↗</span></a>)}</>;
}
