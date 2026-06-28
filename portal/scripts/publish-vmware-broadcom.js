const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://cfqwufidvchaybqknuar.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

async function requestGoogleIndexing(slug) {
  console.log("⚡ Solicitando indexação urgente no Google...");
  const postUrl = `https://folhabyte.dev/post/${slug}`;
  
  try {
    const res = await fetch("https://folhabyte.dev/api/index-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        url: postUrl,
        action: "URL_UPDATED",
      }),
    });

    if (res.ok) {
      console.log("   🚀 Sucesso! Google foi notificado do novo post.");
    } else {
      console.warn(`   ⚠️ Erro ao notificar o Google (HTTP ${res.status}):`, await res.text());
    }
  } catch (err) {
    console.error("   ❌ Falha na conexão com a API de indexação:", err.message);
  }
}

async function insertPost() {
  const titulo = "O custo de fugir da VMware: a encruzilhada das empresas com o Proxmox";
  const categoria = "IA & Software";
  const autor = "Bruno Alves"; 
  
  const heroUrl = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31";
  const techUrl = "https://images.unsplash.com/photo-1600132806370-bf17e65e942f";
  const terminalUrl = "https://images.unsplash.com/photo-1618401471353-b98aedd07871";
  
  const publicado_em = new Date().toISOString();

  const conteudo_markdown = `# O custo de fugir da VMware: a encruzilhada das empresas com o Proxmox

O e-mail de renovação da licença do VMware vSphere chegou na segunda-feira com uma linha simples que o gerente de TI de uma operadora de saúde em Campinas leu três vezes antes de acreditar: o valor anual de licenciamento saltou de dezesseis mil dólares para sessenta e quatro mil dólares. Sem aviso prévio estruturado ou direito a negociação linear direta com canais de venda tradicionais. A mensagem da Broadcom, nova dona da tecnologia, era clara: ou o cliente migrava para o modelo de assinatura unificado por pacotes ou os servidores perderiam o suporte técnico e as atualizações críticas de segurança.

[IMAGEM: \${heroUrl} | LEGENDA: Racks de servidores em datacenter corporativo rodando hypervisors de virtualização de missão crítica]

A fúria de administradores de sistemas em fóruns de infraestrutura não é por acaso.

A situação assemelha-se ao clássico movimento da Oracle após a aquisição da Sun Microsystems in 2010. Na época, a mudança agressiva nas políticas de licenciamento e auditorias de conformidade do Java e do banco de dados MySQL assustou clientes globais de médio porte e catalisou a criação de alternativas abertas como o fork MariaDB. Duas décadas depois, a Broadcom aplica a mesma cartilha de decapagem de custos operacionais e consolidação de portfólio no ecossistema de virtualização de servidores da VMware, seguindo passos semelhantes ao modelo de [fidelização e aumento de tarifas do iCloud da Apple](/post/apple-enfrenta-processo-coletivo-de-3-bilhoes-de-libras-por-taxas-do-icloud).

O hypervisor ESXi gratuito foi descontinuado com uma canetada corporativa.

A Broadcom desmantelou a estrutura de vendas indiretas e acabou com as licenças perpétuas, empacotando o vSphere em dois bundles principais por subscrição: o VMware Cloud Foundation (VCF) para grandes nuvens híbridas e o vSphere Foundation (VVF) para infraestruturas menores. O mercado corporativo médio, habituado a pagar apenas pelo hypervisor básico sem complementos de automação de rede adicionais desnecessários, viu-se diante de reajustes tarifários brutais.

[IMAGEM: \${techUrl} | LEGENDA: Engenheiro de infraestrutura ajustando cabeamento estruturado e conexões de rede em armários de servidores]

"Estão cobrando por cores de processador de forma compulsória, mesmo os que ficam desligados em standby de contingência térmica. O orçamento anual de infraestrutura de software de rede quadruplicou de preço. Não temos verba para pagar esse sequestro de dados operacionais e estamos sendo forçados a migrar", desabafou um engenheiro de redes no Reddit.

A migração de hypervisors não é um passeio de fim de semana.

Grandes corporações mantêm milhares de máquinas virtuais empilhadas em clusters vSphere complexos que sustentam bancos de dados de contabilidade, folha de pagamento e faturamento de clientes. A Broadcom joga com o medo sistêmico da paralisia operacional para obrigar as grandes contas a pagar as novas tarifas agregadas. Enquanto o mercado lida com as complexidades físicas de novos chips de inteligência artificial, como os [vazamentos hidráulicos nas placas Blackwell da Nvidia](/post/vazamentos-de-refrigacao-liquida-nos-racks-blackwell-gb200-da-nvidia-atrasam-entregas), as equipes de base de TI gastam recursos solucionando gargalos burocráticos de faturamento de hypervisors antigos.

As seiscentas contas mais valiosas globais da VMware são o foco estratégico real do novo modelo.

Para as pequenas e médias empresas, no entanto, a ordem do dia é procurar a porta de saída antes do término dos contratos vigentes. O Proxmox VE, hypervisor de código aberto baseado em tecnologia Linux (KVM) mantido por uma empresa na Áustria, surgiu como o principal porto seguro emergente para os administradores desesperados. A demanda pelo software cresceu tanto que os fóruns oficiais da comunidade registraram pico histórico de acessos de engenheiros buscando guias de migração.

A transição exige a reconfiguração manual das interfaces de rede lógicas das máquinas virtuais.

[IMAGEM: \${terminalUrl} | LEGENDA: Console de terminal do sistema operacional exibindo linhas de comando e logs de cópia de volume de disco KVM]

"Dá trabalho. Tivemos que reescrever todos os scripts de backup das máquinas virtuais de desenvolvimento e migrar os volumes de disco rígido para o Proxmox no domingo de madrugada. Mas antes isso do que pagar a fortuna que a Broadcom quer arrancar de nós", relatou um analista sênior de infraestrutura de uma empresa de logística sob a condição de não revelar sua identidade real.

A ferramenta de importação nativa lançada na versão Proxmox VE 8.2 agilizou a transferência direta de workloads do ESXi.

Apesar da simplicidade relativa da nova ferramenta, que conecta diretamente na API antiga da VMware para copiar os discos de armazenamento, a troca de hypervisor introduz novos desafios operacionais. O Proxmox não possui suporte nativo para certas controladoras SAN proprietárias e carece do ecossistema de ferramentas de backup de terceiros consagradas que só homologam software no vSphere da VMware. A decisão envolve trocar a fidelização de fornecedor por velocidade e complexidade de engenharia de redes independente.

O mercado de tecnologia de contêineres e Kubernetes também acelera esse abandono precoce do ESXi.

Muitas equipes de desenvolvimento de software aproveitam o choque de preços da Broadcom para migrar cargas de trabalho virtualizadas tradicionais direto para infraestruturas de nuvem pública baseadas em microsserviços nus, pulando a necessidade de hypervisors locais de virtualização de servidores. O movimento atrai escrutínio semelhante à [investigação antitruste da Itália contra a Microsoft](/post/italia-investiga-microsoft-por-venda-casada-e-aumento-de-precos-na-nuvem) por vendas acopladas e barreiras comerciais a serviços concorrentes na nuvem.

A cotação das ações da Broadcom (AVGO) subiu dois por cento na Nasdaq após analistas de Wall Street revisarem para cima a projeção de receita da unidade de software de infraestrutura no próximo trimestre.

> VEJA TAMBÉM: [Sk Hynix e Samsung dividem mercado com barramento de HBM4 em 2048 bits](/post/sk-hynix-e-samsung-dividem-mercado-com-barramento-de-hbm4-em-2048-bits)
> VEJA TAMBÉM: [Itália investiga Microsoft por venda casada e aumento de preços na nuvem](/post/italia-investiga-microsoft-por-venda-casada-e-aumento-de-precos-na-nuvem)

[FAQ: O que mudou no licenciamento da VMware? | A Broadcom descontinuou as licenças perpétuas e o ESXi gratuito, unificando todo o portfólio em modelos de assinatura compulsória de alta tarifa por núcleo físico de CPU. \\n O Proxmox substitui o VMware? | Sim, para a virtualização básica baseada em KVM. Contudo, exige mais especialização técnica interna das equipes por não possuir o mesmo suporte integrado a ferramentas proprietárias de backup de dados.]`;

  console.log("📝 Inserindo post VMware/Broadcom no banco...");

  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      titulo,
      categoria,
      autor,
      conteudo_markdown,
      imagem_url: heroUrl,
      publicado_em,
      views: 0,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Erro ao inserir post:", errText);
    return;
  }

  const data = await res.json();
  const slug = "o-custo-de-fugir-da-vmware-a-encruzilhada-das-empresas-com-o-proxmox";
  
  await requestGoogleIndexing(slug);

  console.log("✅ Post inserido com sucesso! ID:", data[0].id);
}

if (require.main === module) {
  insertPost().catch(console.error);
}
