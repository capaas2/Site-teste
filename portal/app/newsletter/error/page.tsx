import Link from "next/link";
import { AlertTriangle, XCircle, Clock } from "lucide-react";

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { reason?: string };
}) {
  const { reason } = searchParams;

  const getContent = () => {
    switch (reason) {
      case "invalid_token":
        return {
          icon: <XCircle className="w-16 h-16 text-red-600" />,
          title: "Link Inválido",
          text: "Este link de confirmação não é mais válido ou já foi utilizado. Tente se inscrever novamente.",
        };
      case "missing_token":
        return {
          icon: <AlertTriangle className="w-16 h-16 text-amber-600" />,
          title: "Token Ausente",
          text: "Não conseguimos localizar o seu código de confirmação. Verifique o link no seu e-mail.",
        };
      default:
        return {
          icon: <Clock className="w-16 h-16 text-slate-600" />,
          title: "Aconteceu um Erro",
          text: "Não foi possível confirmar sua inscrição no momento. Por favor, tente novamente mais tarde.",
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-full">
            {content.icon}
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
          {content.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {content.text}
        </p>
        <div className="pt-6">
          <Link 
            href="/"
            className="inline-block border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
