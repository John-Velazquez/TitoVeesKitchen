export type RecipeLinkTarget={slug:string; title:string};
export type BrandLink={id:string; name:string; website_url:string; aliases:string[]; enabled:boolean; notes?:string};
export type InlineLink={kind:"recipe"|"brand";phrase:string;url:string;title:string};

const recipeAliases:Record<string,string[]>={
 "puerto-rican-sofrito":["sofrito","homemade sofrito","green sofrito"],
 "herb-infused-garlic-confit-ghee":["ghee","garlic confit ghee","infused ghee","herb infused ghee","herb-garlic ghee","garlic ghee"],
 "infused-avocado-oil":["infused avocado oil","garlic-onion infused oil"],
 "dark-braised-oxtail":["dark-braised oxtail","braised oxtail","leftover braised oxtail"],
 "confit-garlic-naan-spread":["confit garlic naan spread"],
 "buttery-garlic-naan":["garlic naan","homemade naan"],
 "brioche-burger-buns":["brioche burger buns","homemade burger buns"],
 "homemade-buttermilk-style-biscuits":["homemade biscuits","buttermilk biscuits"],
 "smoky-espresso-sausage-gravy":["sausage gravy","espresso sausage gravy"],
 "pork-shrimp-dumplings":["pork and shrimp dumplings","pork shrimp dumplings"],
 "vanilla-extract":["homemade vanilla extract"],
 "chicken-crust-personal-pizzas":["chicken crust pizzas"],
 "oxtail-bone-rice":["oxtail bone rice"],
 "oxtail-bone-miso-soup":["oxtail bone miso soup"],
 "thai-red-curry-coconut-sauce":["Thai red curry coconut sauce","Thai red curry–coconut sauce","red curry-coconut sauce","red curry–coconut sauce","leftover Thai red curry coconut sauce","prepared red curry-coconut sauce"],
 "paws-dots-sweet-potato-mash":["sweet potato mash","mashed sweet potatoes"],
 "creamy-cajun-corn-with-gochujang":["Cajun corn","creamy Cajun corn"],
 "peach-skin-simple-syrup":["peach-skin syrup","peach skin syrup"],
 "fried-oxtail-stuffing-cups":["oxtail stuffing cups"]
};

function normalize(value:string){return value.toLocaleLowerCase("en-US").replace(/[’]/g,"'").replace(/\s+/g," ").trim();}
function boundary(s:string,index:number,length:number){
 return (index===0 || !/[\p{L}\p{N}]/u.test(s[index-1])) &&
 (index+length===s.length || !/[\p{L}\p{N}]/u.test(s[index+length]));
}
export function linkMatches(recipes:RecipeLinkTarget[],brands:BrandLink[],currentSlug:string):InlineLink[]{
 const entries:InlineLink[]=[];
 const seen=new Set<string>();
 function push(kind:"recipe"|"brand",phrase:string,url:string,title:string){
  const k=normalize(phrase);if(k.length<3||seen.has(k))return;
  seen.add(k);entries.push({kind,phrase,url,title});
 }
 for(const r of recipes){
  if(r.slug===currentSlug)continue;
  push("recipe",r.title,"/recipes/"+encodeURIComponent(r.slug),r.title);
  for(const alias of recipeAliases[r.slug]??[])push("recipe",alias,"/recipes/"+encodeURIComponent(r.slug),r.title);
 }
 for(const b of brands){
  if(!b.enabled || !/^https:\/\/[^\s]+$/i.test(b.website_url))continue;
  push("brand",b.name,b.website_url,b.name+" — official website");
  for(const alias of b.aliases??[])push("brand",alias,b.website_url,b.name+" — official website");
 }
 return entries.sort((a,b)=>b.phrase.length-a.phrase.length);
}
export type TextPart={text:string;link?:InlineLink};
export function tokenizeRecipeText(value:string,links:InlineLink[]):TextPart[]{
 if(!value||!links.length)return [{text:value}];
 const normalized=normalize(value);
 // Matching on original text preserves punctuation and user-authored capitalization.
 const result:TextPart[]=[];let i=0,buffer="";
 while(i<value.length){
  let best:InlineLink|undefined;
  for(const link of links){
   const needle=link.phrase.replace(/[’]/g,"'").toLocaleLowerCase("en-US");
   const original=value.slice(i,i+link.phrase.length).replace(/[’]/g,"'").toLocaleLowerCase("en-US");
   if(original===needle && boundary(value,i,link.phrase.length)){best=link;break;}
  }
  if(best){
   if(buffer){result.push({text:buffer});buffer="";}
   result.push({text:value.slice(i,i+best.phrase.length),link:best});
   i+=best.phrase.length;
  }else{buffer+=value[i];i++;}
 }
 if(buffer)result.push({text:buffer});
 void normalized;
 return result;
}
