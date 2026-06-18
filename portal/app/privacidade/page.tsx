import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | FolhaByte",
  description: "Leia a Política de Privacidade do portal FolhaByte e saiba como tratamos e protegemos seus dados pessoais de forma transparente e segura.",
  alternates: {
    canonical: "/privacidade",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "06 de Abril de 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white mb-2">
          Política de <span className="text-blue-600">Privacidade</span>
        </h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Última atualização: {lastUpdated}</p>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none space-y-10 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        <section>
          <p>
            A sua privacidade é importante para nós. É política do <strong>FolhaByte</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site FolhaByte, e outros sites que possuímos e operamos.
          </p>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">Coleta de Dados e Newsletter</h2>
          <p>
            Ao se inscrever em nossa newsletter, coletamos o seu endereço de e-mail com o propósito exclusivo de enviar atualizações, notícias e ofertas relevantes. Armazenamos esses dados de forma segura e você é livre para solicitar o cancelamento da inscrição (opt-out) e a exclusão dos seus dados a qualquer momento, diretamente pelos links enviados nos e-mails.
          </p>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Protegemos os dados armazenados dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso não autorizado. Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">Links Externos e Monetização (Afiliados)</h2>
          <p>
            O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
          </p>
          <p className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
            <strong>Transparência de Afiliados:</strong> O FolhaByte participa de programas de associados (como o da Amazon e outros parceiros). Isso significa que, ao clicar em links de produtos em nossos artigos, podemos receber uma comissão caso você faça uma compra, sem nenhum custo adicional para você.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">Publicidade e Google AdSense</h2>
          <p>
            O serviço <strong>Google AdSense</strong> que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você. Para mais informações, consulte as FAQs oficiais sobre privacidade do Google AdSense.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">Transparência Editorial e Inteligência Artificial</h2>
          <p>
            Para garantir a velocidade e a cobertura abrangente do mundo da tecnologia, o FolhaByte utiliza fluxos de trabalho automatizados e agentes de Inteligência Artificial para auxiliar na pesquisa, estruturação e redação de conteúdos. 
          </p>
          <p>
            Todas as informações técnicas e factuais passam por processos rigorosos de validação de dados antes da publicação, garantindo a qualidade e a veracidade que você merece.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white mb-6">Compromisso do Usuário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-blue-500 font-black text-2xl mb-4 block">A</span>
                <p className="text-xs uppercase font-bold tracking-tight">Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública.</p>
             </div>
             <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-blue-500 font-black text-2xl mb-4 block">B</span>
                <p className="text-xs uppercase font-bold tracking-tight">Não difundir propaganda ou conteúdo de natureza racista, xenofóbica ou contra os direitos humanos.</p>
             </div>
             <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:col-span-2">
                <span className="text-blue-500 font-black text-2xl mb-4 block">C</span>
                <p className="text-xs uppercase font-bold tracking-tight">Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do FolhaByte, de seus fornecedores ou terceiros.</p>
             </div>
          </div>
        </section>

        <section className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">Mais Informações</h2>
          <p>
            Esperemos que esteja esclarecido. Como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade.
          </p>
          <p className="text-[10px] font-black uppercase text-slate-500 mt-6 tracking-[0.2em]">
            Esta política é efetiva a partir de <strong>6 de Abril de 2026</strong>.
          </p>
        </section>
      </div>
      
      <div className="mt-20 p-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[2.6rem]">
        <div className="p-10 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] text-center">
           <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
              Dúvidas sobre seus dados? <Link href="/contato" className="text-blue-500 hover:underline">Entre em contato conosco</Link>.
           </p>
        </div>
      </div>
    </div>
  );
}
