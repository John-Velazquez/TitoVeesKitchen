import type { Metadata } from "next";
import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import "./globals.css";
export const metadata: Metadata = { title: "Tito Vee's Kitchen", description: "Elevated home cooking, made with love." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><header className="topbar"><Link className="wordmark" href="/">Tito Vee's <span>Kitchen</span></Link><SiteNavigation/></header><main>{children}</main><footer>Made with intention, served with love. · Tito Vee's Kitchen</footer></body></html>; }
