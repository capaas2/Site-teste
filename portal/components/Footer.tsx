import Link from "next/link";
import { Rss, Mail, MapPin } from "lucide-react";
import { NewsLetter } from "./NewsLetter";
import { headers } from "next/headers";
import { getTranslation } from "@/lib/translations";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const headerList = await headers();
  const locale = headerList.get("x-locale") || "pt";

  const getLocalizedHref = (href: string) => {
    if (locale === 'pt') return href;
    return `/${locale}${href === '/' ? '' : href}`;
  };

  const categories = [
    { 
      label: locale === "pt" ? "Eletrificação" : locale === "en" ? "Electrification" : "Electrificación", 
      slug: "eletrificacao" 
    },
    { 
      label: locale === "pt" ? "Mobilidade" : locale === "en" ? "Mobility" : "Movilidad", 
      slug: "mobilidade" 
    },
    { 
      label: locale === "pt" ? "IA & Software" : locale === "en" ? "AI & Software" : "IA y Software", 
      slug: "ia-software" 
    },
    { 
      label: locale === "pt" ? "Ciência" : locale === "en" ? "Science" : "Ciencia", 
      slug: "ciencia" 
    },
    { 
      label: locale === "pt" ? "Cibersegurança" : locale === "en" ? "Cybersecurity" : "Ciberseguridad", 
      slug: "cibersegurança" 
    },
    { 
      label: locale === "pt" ? "Tecnologia" : locale === "en" ? "Technology" : "Tecnología", 
      slug: "tecnologia" 
    },
  ];

  const quickLinks = [
    { label: getTranslation(locale, "home"), href: "/" },
    { 
      label: locale === "pt" ? "Sobre Nós" : locale === "en" ? "About Us" : "Sobre Nosotros", 
      href: "/sobre" 
    },
    { 
      label: locale === "pt" ? "Contato" : locale === "en" ? "Contact" : "Contacto", 
      href: "/contato" 
    },
    { 
      label: locale === "pt" ? "Política de Privacidade" : locale === "en" ? "Privacy Policy" : "Política de Privacidad", 
      href: "/privacidade" 
    },
    { 
      label: locale === "pt" ? "Termos e Condições" : locale === "en" ? "Terms & Conditions" : "Términos y Condiciones", 
      href: "/termos" 
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Coluna 1: Bio & Logo */}
        <div className="space-y-6">
          <Link href={getLocalizedHref("/")} className="text-white font-black text-2xl tracking-tighter">
            Folha<span className="text-blue-500">Byte</span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            {getTranslation(locale, "footer_desc")}
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors"><Rss className="w-5 h-5" /></Link>
          </div>
        </div>

        {/* Coluna 2: Navegação */}
        <div>
          <h4 className="text-white font-bold mb-6 flex items-center gap-2">
            {locale === "pt" ? "Links" : locale === "en" ? "Links" : "Enlaces"} <span className="h-0.5 w-6 bg-blue-500 inline-block"></span>
          </h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={getLocalizedHref(link.href)} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 3: Categorias */}
        <div>
          <h4 className="text-white font-bold mb-6 flex items-center gap-2">
            {locale === "pt" ? "Categorias" : locale === "en" ? "Categories" : "Categorías"} <span className="h-0.5 w-6 bg-blue-500 inline-block"></span>
          </h4>
          <ul className="space-y-3 text-sm">
            {categories.map((cat) => (
              <li key={cat.label}>
                <Link href={getLocalizedHref(`/categoria/${cat.slug}`)} className="hover:text-white flex items-center gap-2 transition-all">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 4: Contato / Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 flex items-center gap-2">
            {getTranslation(locale, "footer_talk")} <span className="h-0.5 w-6 bg-blue-500 inline-block"></span>
          </h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-1 text-blue-500" />
              <span>contato@folhabyte.com.br</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 text-blue-500" />
              <span>São Paulo, SP · Brasil</span>
            </li>
            <li className="mt-8">
               <NewsLetter />
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {currentYear} {getTranslation(locale, "footer_rights")}</p>
      </div>
    </footer>
  );
}
