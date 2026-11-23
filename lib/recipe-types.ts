export type RecipeStatus = "draft" | "published";
export type RecipeRecord = {
 id: string; slug: string; title: string; category: string; summary: string;
 yield_text: string; prep_minutes: number | null; cook_minutes: number | null;
 equipment: string; ingredients: string; instructions: string; substitutions: string;
 storage_notes: string; quick_tricks: string; macros: string; photo_url: string;
 video_url: string; source_notes: string; status: RecipeStatus;
 created_at?: string; updated_at?: string;
};
export type RecipeInput = Omit<RecipeRecord,"id" | "created_at" | "updated_at">;
export const emptyRecipe: RecipeInput = {
 slug:"", title:"", category:"Main Dishes", summary:"", yield_text:"",
 prep_minutes:null, cook_minutes:null, equipment:"", ingredients:"", instructions:"",
 substitutions:"", storage_notes:"", quick_tricks:"", macros:"", photo_url:"",
 video_url:"", source_notes:"", status:"draft"
};
export function toSlug(value:string) {
 return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"")
  .replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}
export function cleanLines(value:string) {
 return value.split("\n").map(x=>x.trim()).filter(Boolean);
}
