import Image from "next/image";
import Link from "next/link";
export default function Home(){
 return <>
  <section className="hero">
   <div className="hero-inner">
    <div className="hero-copy">
     <span className="hero-intro"><span className="hero-intro-line"/> WELCOME TO MY KITCHEN</span>
     <h1>Big flavor.<br/><em>Made with intention.</em></h1>
     <p className="hero-lead">A little Puerto Rican soul, a little kitchen science, and a whole lot of love. Pull up a chair—there's always room at my table.</p>
     <div className="actions"><Link className="button" href="/recipes">Explore the recipes <span aria-hidden="true">↗</span></Link><Link className="button secondary" href="/dashboard">My kitchen account</Link></div>
     <p className="hero-signature">FROM MY KITCHEN TO YOURS <span aria-hidden="true">✳</span> TITO VEE</p>
    </div>
    <div className="hero-art">
     <div className="hero-art-halo" aria-hidden="true"/>
     <Image src="/brand/titovees-kitchen-primary-logo.png" alt="Tito Vee's Kitchen original logo featuring happy garlic and onion in a copper cooking pot" width={720} height={480} priority unoptimized className="hero-main-logo"/>
     <span className="hero-art-label">FLAVOR IS THE WHOLE POINT</span>
    </div>
   </div>
  </section>
  <div className="hero-bottom-band"><span>FROM SCRATCH, WHEN IT MATTERS</span><span aria-hidden="true">✦</span><span>REAL FOOD, REAL TECHNIQUE</span><span aria-hidden="true">✦</span><span>ALWAYS ROOM AT THE TABLE</span></div>
  <section className="home-section" aria-labelledby="kitchen-explore">
   <div className="section-heading">
    <div><p className="eyebrow">TAKE A LOOK AROUND</p><h2 id="kitchen-explore">There's more cooking here.</h2></div>
    <p>Recipes, tested techniques, and little discoveries that make everyday cooking something special.</p>
   </div>
   <div className="featuregrid">
    <article className="card home-card"><span className="card-number">01 / THE RECIPE BOOK</span><h3>From my table to yours.</h3><p>Explore a growing collection of original recipes, kitchen favorites, and the experiments worth keeping.</p><Link href="/recipes" className="card-link">Browse recipes <span aria-hidden="true">↗</span></Link></article>
    <article className="card home-card" id="kitchen"><span className="card-number">02 / MY KITCHEN</span><h3>Make the most of what you've got.</h3><p>We're building a place to organize your pantry and tools and discover what you can cook from what's already there.</p><span className="coming">COMING TO THE KITCHEN</span></article>
    <article className="card home-card" id="prep"><span className="card-number">03 / WANNA MEAL PREP?</span><h3>Good food, even on busy days.</h3><p>Meal planning, practical portions and consolidated shopping lists—without turning dinner into homework.</p><span className="coming">IN DEVELOPMENT</span></article>
   </div>
  </section>
  <section className="mascot-section">
   <div className="mascot-visual"><Image src="/brand/onion-garlic-mascots.png" alt="Tito Vee's Kitchen's original Onion and Garlic characters, smiling in their copper pan" width={610} height={406} unoptimized/></div>
   <div className="mascot-copy"><p className="eyebrow">WELCOME TO THE KITCHEN LAB</p><h2>Know the <em>why.</em><br/>Nail the <em>how.</em></h2><p>Meet Onion and Garlic, the kitchen crew. We'll dig into why a technique works, how to get the most out of your ingredients, and what to look for when food gets good.</p><div className="mascot-tags"><span>Onion • The why</span><span>Garlic • The how</span></div><p className="coming">KITCHEN LAB COMING SOON</p></div>
  </section>
  <section className="closing-note"><p className="eyebrow">THE TITO VEE PHILOSOPHY</p><h2>It doesn't have to be fancy.<br/><em>It has to be worth the bite.</em></h2><p>We're here for bold flavor, good company, and recipes you'll actually want to make again.</p><Link className="button" href="/recipes">Find something good to cook</Link></section>
 </>;
}
