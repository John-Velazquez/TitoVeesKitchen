import Link from "next/link";
import catalog from "../../data/recipe-catalog.json";
import "./recipes.css";

const categoryList = Array.from(new Set(catalog.recipes.map(recipe => recipe.category))).sort();
const ideas = catalog.recipes.filter(recipe => recipe.category === "Ideas & Research");
const recipes = catalog.recipes.filter(recipe => recipe.category !== "Ideas & Research");

export default function Recipes(){
 return <div className="recipe-site recipe-shell">
  <p className="recipe-crumb"><Link href="/">Home</Link> / Recipe collection</p>
  <p className="recipe-kicker">The Tito Vee's Kitchen collection</p>
  <h1 className="recipe-title">Every recipe has a story.</h1>
  <p className="recipe-subtitle">Browse the kitchen journal as recipes are recovered, tested, and refined. Recipes still being documented are clearly marked and are not yet cook-ready.</p>
  <div className="recipe-divider"/>
  <section className="recipe-feature">
   <span>Featured • Complete documented recipe</span>
   <strong>Herb-Infused Garlic Confit Ghee</strong>
   <p>Soft garlic, herb warmth and a fully strained, golden finishing fat.</p>
   <Link className="button" href="/recipes/herb-infused-garlic-confit-ghee" style={{alignSelf:"flex-start"}}>Read the recipe</Link>
  </section>
  <div className="recipe-divider"/>
  <p className="recipe-kicker">Recipe archive</p>
  <h2 style={{fontSize:"2.1rem",margin:".4rem 0"}}>The catalog</h2>
  <p className="recipe-subtitle">{recipes.length} recorded recipes and components across the kitchen journal, plus {ideas.length} cooking research topics in development. The archive is being recovered from previous recipe discussions and recipe files.</p>
  {categoryList.filter(category=>category!=="Ideas & Research").map(category=><section key={category} className="recipe-section" aria-label={category}><h2>{category}</h2><div className="recipe-card-grid">{recipes.filter(recipe=>recipe.category===category).map(recipe=><article key={recipe.slug} className="recipe-catalog-card"><span className="recipe-chip">{recipe.verified_full_recipe?"Full recipe available":"Archive • In development"}</span><h2>{recipe.title}</h2><p>{recipe.verified_full_recipe?"Full ingredient measurements, technique, serving guidance and storage notes available.":recipe.status}</p>{recipe.verified_full_recipe?<Link href={`/recipes/${recipe.slug}`}>Open the full recipe</Link>:<span style={{fontSize:".8rem",color:"#74665a"}}>Recipe details being recovered</span>}</article>)}</div></section>)}
  <section className="recipe-section"><h2>In the Kitchen Lab</h2><p className="recipe-subtitle">Ideas and investigations, not published personal recipes.</p><div className="recipe-card-grid">{ideas.map(idea=><article key={idea.slug} className="recipe-catalog-card"><span className="recipe-chip">Research only</span><h2>{idea.title}</h2><p>{idea.status}</p></article>)}</div></section>
 </div>;
}
