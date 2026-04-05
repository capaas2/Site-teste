import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Redação Tech — Notícias de Tecnologia",
  description: "As melhores notícias de tecnologia, IA, gadgets e mercado digital.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <body
        className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 py-10 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} Redação Tech · Todos os direitos reservados
          </footer>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
