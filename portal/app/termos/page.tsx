import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos e Condições de Uso | FolhaByte",
  description: "Leia os Termos e Condições de Uso do portal FolhaByte para compreender as regras, licenças e responsabilidades ao navegar em nosso site.",
  alternates: {
    canonical: "/termos",
  },
};

export default function TermsPage() {
  const lastUpdated = "06 de Abril de 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white mb-2">
          Termos e <span className="text-blue-600">Condições</span>
        </h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Última atualização: {lastUpdated}</p>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none space-y-12 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        
        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar o site <strong>FolhaByte</strong>, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">2. Uso de Licença</h2>
          <p>
            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou imagens) no site FolhaByte, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
          </p>
          <ul className="list-disc pl-5 space-y-2 font-medium">
            <li>Modificar ou copiar os materiais;</li>
            <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
            <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site FolhaByte;</li>
            <li>Remover quaisquer direitos autorais ou outras notações de propriedade;</li>
            <li>Transferir os materiais para outra pessoa ou "espelhar" os materiais em qualquer outro servidor.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">3. Isenção de Responsabilidade e Recomendações</h2>
          <p>
            Os materiais no site do FolhaByte são fornecidos "como estão". O FolhaByte não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas de comercialização ou adequação a um fim específico.
          </p>
          <div className="mt-4 p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">Compras e Afiliados</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-0">
                O FolhaByte atua como um portal de jornalismo de tecnologia e curadoria de ofertas. A veiculação de links de afiliados não nos torna fornecedores dos produtos. Não nos responsabilizamos por defeitos, falhas na entrega ou suporte técnico de compras realizadas em sites de terceiros (como Amazon, Mercado Livre, etc.). Toda a transação comercial é de responsabilidade exclusiva da loja parceira.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">4. Limitações</h2>
          <p>
            Em nenhum caso o FolhaByte ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em FolhaByte.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">5. Precisão dos Materiais e Uso de Inteligência Artificial</h2>
          <p>
            Os materiais exibidos no site do FolhaByte podem incluir erros técnicos, tipográficos ou fotográficos. Nossas reportagens e análises são elaboradas e estruturadas com o auxílio de fluxos automatizados e agentes de Inteligência Artificial. 
          </p>
          <p className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30">
            <strong>Nota Importante:</strong> Embora empreguemos rigor na validação técnica, o FolhaByte não garante que qualquer material seja 100% preciso ou atual. Recomendamos que decisões de compra baseadas em especificações técnicas sejam sempre cruzadas com as informações oficiais dos fabricantes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">6. Links e Sites de Terceiros</h2>
          <p>
            O FolhaByte não analisou detalhadamente todos os sites vinculados ao seu domínio e não é responsável pelo conteúdo de nenhum site vinculado. O uso de qualquer site vinculado é por conta e risco do usuário.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">7. Modificações</h2>
          <p>
            O FolhaByte pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
          </p>
        </section>

        <section className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">8. Lei Aplicável e Foro</h2>
          <p>
            Estes termos e condições são regidos e interpretados de acordo com as leis da República Federativa do Brasil, e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais da sua localidade ou do foro da sede do site para resolução de quaisquer disputas.
          </p>
        </section>

      </div>

      <div className="mt-20 p-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[2.6rem]">
        <div className="p-10 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] text-center">
           <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
              Dúvidas sobre os termos? <Link href="/contato" className="text-blue-500 hover:underline">Fale com nosso jurídico</Link>.
           </p>
        </div>
      </div>
    </div>
  );
}
