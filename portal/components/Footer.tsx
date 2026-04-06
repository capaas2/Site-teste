import Link from "next/link";
import { AtSign, ExternalLink, Rss, Mail, MapPin, Phone } from "lucide-react";
import { NewsLetter } from "./NewsLetter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { label: "Eletrificação", slug: "eletrificacao" },
    { label: "Mobilidade", slug: "mobilidade" },
    { label: "IA & Software", slug: "ia-software" },
    { label: "Mercado", slug: "mercado" },
    { label: "Design", slug: "design" },
    { label: "Tecnologia", slug: "tecnologia" },
  ];

  const quickLinks = [
    { label: "Início", href: "/" },
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "Política de Privacidade", href: "/privacidade" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Coluna 1: Bio & Logo */}
        <div className="space-y-6">
          <Link href="/" className="text-white font-black text-2xl tracking-tighter">
            Redação<span className="text-blue-500">Tech</span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            A sua fonte definitiva de notícias sobre mobilidade elétrica, inteligência artificial e o futuro da tecnologia. 
            Direto ao ponto, com visão de mercado e rigor técnico.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-blue-500 transition-colors"><AtSign className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-blue-500 transition-colors"><ExternalLink className="w-5 h-5" /></Link>
            <Link href="#" className="hover:text-white transition-colors"><Rss className="w-5 h-5" /></Link>
          </div>
        </div>

        {/* Coluna 2: Navegação */}
        <div>
          <h4 className="text-white font-bold mb-6 flex items-center gap-2">
            Links <span className="h-0.5 w-6 bg-blue-500 inline-block"></span>
          </h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 3: Categorias */}
        <div>
          <h4 className="text-white font-bold mb-6 flex items-center gap-2">
            Categorias <span className="h-0.5 w-6 bg-blue-500 inline-block"></span>
          </h4>
          <ul className="space-y-3 text-sm">
            {categories.map((cat) => (
              <li key={cat.label}>
                <Link href={`/categoria/${cat.slug}`} className="hover:text-white flex items-center gap-2 transition-all">
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
            Fale Conosco <span className="h-0.5 w-6 bg-blue-500 inline-block"></span>
          </h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-1 text-blue-500" />
              <span>contato@redacaotech.com.br</span>
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
        <p>© {currentYear} Redação Tech Inc. Todos os direitos reservados. </p>
      </div>
    </footer>
  );
}
