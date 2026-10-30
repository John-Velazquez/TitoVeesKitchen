import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = { title: "Tito Vee's Kitchen", description: "Elevated home cooking, made with love." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><header className="topbar"><Link className="wordmark" href="/">Tito Vee's <span>Kitchen</span></Link><nav aria-label="Main navigation"><Link href="/#explore">Recipes</Link><Link href="/#kitchen">My Kitchen</Link><Link href="/#prep">Wanna Meal Prep?</Link><Link href="/dashboard">Dashboard</Link><Link href="/login">Sign in</Link></nav></header><main>{children}</main><footer>Made with intention, served with love. · Tito Vee's Kitchen</footer></body></html>; }
