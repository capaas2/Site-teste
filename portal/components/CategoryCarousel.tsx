import Link from "next/link";
import { BatteryCharging, Car, Cpu, TrendingUp, Palette, Code, Leaf } from "lucide-react";

const categories = [
  { label: "Eletrificação", slug: "eletrificacao", icon: BatteryCharging },
  { label: "Mobilidade", slug: "mobilidade", icon: Car },
  { label: "IA & Software", slug: "ia-software", icon: Code },
  { label: "Mercado", slug: "mercado", icon: TrendingUp },
  { label: "Design", slug: "design", icon: Palette },
  { label: "Tecnologia", slug: "tecnologia", icon: Cpu },
  { label: "Sustentabilidade", slug: "sustentabilidade", icon: Leaf },
];

export function CategoryCarousel() {
  return (
    <section>
      <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
        Navegar por Categoria
      </h2>
      <div className="flex gap-3 flex-wrap">
        {categories.map(({ label, slug, icon: Icon }) => (
          <Link
            key={slug}
            href={`/categoria/${slug}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-sm transition-all duration-200 text-sm font-semibold"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}
