export default function PrivacyPage() {
  const lastUpdated = "05 de Abril de 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-3xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white mb-2">
          Política de <span className="text-blue-600">Privacidade</span>
        </h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Última atualização: {lastUpdated}</p>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">1. Coleta de Informações</h2>
          <p>
            Coletamos informações que você nos fornece diretamente, como quando você se inscreve em nossa newsletter ou entra em contato conosco. Isso pode incluir seu nome, endereço de e-mail e outras informações de contato.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">2. Uso de Dados</h2>
          <p>
            Utilizamos os dados coletados para:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enviar newsletters e atualizações de notícias;</li>
            <li>Melhorar a experiência do usuário em nosso portal;</li>
            <li>Responder a solicitações de suporte ou parcerias comerciais;</li>
            <li>Monitorar e analisar tendências de tráfego e uso do site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">3. Cookies e Rastreamento</h2>
          <p>
            A Redação Tech utiliza cookies para melhorar sua experiência. Utilizamos também serviços de terceiros, como o **Google AdSense** para exibir anúncios e o **Vercel Analytics** para medir o tráfego. Esses parceiros podem coletar dados anônimos para fins de personalização de anúncios e análise técnica.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">4. Seus Direitos</h2>
          <p>
            Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Para isso, entre em contato através do e-mail <span className="font-bold text-blue-600">privacidade@redacaotech.com.br</span>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black italic uppercase text-slate-900 dark:text-white">5. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta política de privacidade periodicamente. Avisaremos sobre mudanças significativas publicando a nova política nesta página.
          </p>
        </section>
      </div>
      
      <div className="mt-16 p-8 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-relaxed">
            Ao continuar usando o site, você concorda com nossos termos de uso e política de privacidade.
         </p>
      </div>
    </div>
  );
}
