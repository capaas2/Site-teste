export interface Author {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
}

const AUTHORS: Record<string, Author> = {
  "Lucas Ferreira": {
    name: "Lucas Ferreira",
    role: "Editor-Chefe",
    bio: "Jornalista de tecnologia com 12 anos de experiência. Especialista em IA, semicondutores e mercado digital.",
    initials: "LF",
    color: "from-blue-500 to-indigo-600",
  },
  "Marina Santos": {
    name: "Marina Santos",
    role: "Editora de Ciência & Inovação",
    bio: "Mestre em Engenharia Biomédica pela USP. Cobre nanotecnologia, biotecnologia e avanços científicos há 8 anos.",
    initials: "MS",
    color: "from-emerald-500 to-teal-600",
  },
  "Rafael Oliveira": {
    name: "Rafael Oliveira",
    role: "Editor de Hardware & Mobilidade",
    bio: "Engenheiro da Computação formado pela Unicamp. Apaixonado por hardware, eletrificação e reviews de gadgets. Testa mais de 50 produtos por ano.",
    initials: "RO",
    color: "from-amber-500 to-orange-600",
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
