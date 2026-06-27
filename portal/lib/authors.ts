export interface Author {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
}

const AUTHORS: Record<string, Author> = {
  "Rafael Mendes": {
    name: "Rafael Mendes",
    role: "Editor de Hardware & Performance",
    bio: "Engenheiro da Computação formado pela Unicamp. Especialista em semicondutores, sistemas de alta performance e infraestrutura de hardware.",
    initials: "RM",
    color: "from-amber-500 to-orange-600",
  },
  "Camila Torres": {
    name: "Camila Torres",
    role: "Editora de Big Techs & Mercado",
    bio: "Jornalista econômica com 10 anos de experiência cobrindo a regulação de Big Techs, movimentos macroeconômicos de mercado e geopolítica da tecnologia.",
    initials: "CT",
    color: "from-emerald-500 to-teal-600",
  },
  "Bruno Alves": {
    name: "Bruno Alves",
    role: "Editor de IA & Software",
    bio: "Desenvolvedor sênior e analista de tecnologia. Especialista em inteligência artificial, grandes modelos de linguagem (LLMs) e ecossistemas de desenvolvimento.",
    initials: "BA",
    color: "from-blue-500 to-indigo-600",
  },
  "Redação FolhaByte": {
    name: "Redação FolhaByte",
    role: "Equipe Editorial",
    bio: "Equipe de jornalistas e especialistas dedicados a cobrir as inovações que moldam o futuro da tecnologia.",
    initials: "FB",
    color: "from-slate-500 to-slate-700",
  },
};

export function getAuthorByName(name: string): Author {
  return AUTHORS[name] || AUTHORS["Redação FolhaByte"];
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS).filter(a => a.name !== "Redação FolhaByte");
}
