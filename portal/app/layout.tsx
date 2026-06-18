import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getAllCategories } from "@/lib/posts";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FolhaByte — Tecnologia de Alta Performance",
  description: "As melhores notícias de tecnologia, IA, gadgets e mercado digital.",
  other: {
    "google-adsense-account": "ca-pub-8490210284834886",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <head />
      <body
        className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8490210284834886"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </Providers>
      </body>
    </html>
  );
}
