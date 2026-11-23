import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import "./globals.css";

export const metadata: Metadata = {
 title: "Tito Vee's Kitchen | Flavor, family & a little food science",
 description: "Cook with intention. Explore original recipes, practical kitchen technique, and a growing collection of flavors from Tito Vee's Kitchen.",
 icons: {icon:"/brand/titovees-kitchen-illustrated-logo.png",apple:"/brand/titovees-kitchen-illustrated-logo.png"},
 openGraph:{
  title:"Tito Vee's Kitchen",
  description:"Good food. Better stories. Made with intention.",
  images:[{url:"/brand/titovees-kitchen-illustrated-logo.png",width:1254,height:1254,alt:"Tito Vee's Kitchen's approved illustrated logo"}]
 }
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body>
  <header className="topbar">
   <Link className="brand-link" href="/" aria-label="Tito Vee's Kitchen home">
    <Image src="/brand/titovees-kitchen-wordmark.png" alt="Tito Vee's Kitchen" width={204} height={136} priority unoptimized className="brand-wordmark"/>
   </Link>
   <SiteNavigation/>
  </header>
  <main id="content">{children}</main>
  <footer className="site-footer">
   <div className="footer-inner">
    <Link href="/" className="footer-brand" aria-label="Tito Vee's Kitchen home">
     <Image src="/brand/titovees-kitchen-wordmark.png" alt="Tito Vee's Kitchen" width={200} height={133} unoptimized/>
    </Link>
    <div><p className="footer-phrase">Good food. Better stories.</p><p>Made with intention, served with love.</p></div>
    <div className="footer-links"><Link href="/recipes">Recipes</Link><Link href="/#kitchen">My Kitchen</Link><Link href="/#prep">Wanna Meal Prep?</Link></div>
   </div>
   <div className="footer-copyright">© {new Date().getFullYear()} Tito Vee's Kitchen · Every bite, intentional.</div>
  </footer>
 </body></html>;
}
