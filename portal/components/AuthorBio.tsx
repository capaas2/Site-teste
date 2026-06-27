import { getAuthorByName } from "@/lib/authors";

interface AuthorBioProps {
  authorName: string;
}

export function AuthorBio({ authorName }: AuthorBioProps) {
  const author = getAuthorByName(authorName);

  return (
    <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 not-prose">
      <div className="flex items-start gap-5">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${author.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <span className="text-white font-black text-lg tracking-tight">
            {author.initials}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">
            Escrito por
          </p>
          <h4 className="text-base font-black text-slate-900 dark:text-white italic uppercase tracking-tight mb-0.5">
            {author.name}
          </h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">
            {author.role}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed m-0">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
