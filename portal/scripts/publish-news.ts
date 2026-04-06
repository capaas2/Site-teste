import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function publish() {
  const post = {
    titulo: "O Fim de uma Era? OpenAI Surpreende ao Descontinuar Sora para Focar em IA de Performance de Negócios",
    categoria: "IA & Cinema",
    autor: "Redação Tech",
    imagem_url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200",
    publicado_em: new Date().toISOString(),
    views: 0,
    conteudo_markdown: `# O Fim de uma Era? OpenAI Surpreende ao Descontinuar Sora para Focar em IA de Performance de Negócios

A indústria de geração de conteúdo por **Inteligência Artificial** acaba de sofrer o seu maior abalo desde o lançamento do ChatGPT. Em um movimento que pegou Hollywood e o Vale do Silício de surpresa, a **OpenAI** anunciou nesta manhã o encerramento oficial do projeto **Sora**, seu ultra-realista gerador de vídeos que nunca chegou a ver um lançamento público massivo.

---

## Uma Mudança de Rota Brutal

De acordo com comunicados internos vazados e confirmados por analistas de infraestrutura, a decisão não foi técnica, mas sim financeira e estratégica. O custo computacional necessário para manter o **Sora** operando em escala global teria se provado insustentável frente às novas prioridades da empresa liderada por Sam Altman.

> "A OpenAI não é mais uma empresa de experimentação científica; ela é agora uma gigante de produtos corporativos. Manter o Sora como um brinquedo para criativos era um luxo que o balanço financeiro não permitia mais." — *Análise de Mercado Tech.*

### O Novo Foco: Performance e Anúncios

Em vez de vídeos cinematográficos, a OpenAI está redirecionando todo o poder de processamento das suas GPUs Blackwell para:
1. **Modelos de Codificação Avançada:** Melhores que o GPT-5 para engenharia de software.
2. **IA para Performance de Anúncios:** Geradores de imagem e texto otimizados para conversão em tempo real.
3. **Agentes de Execução:** IAs que não apenas "falam", mas realizam tarefas complexas no sistema operacional.

---

[IMAGEM: https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200 | LEGENDA: A nova rota da OpenAI prioriza receita direta sobre estética visual.]

## O Que Isso Significa para o Mercado?

Com a saída do Sora, o caminho está livre para competidores como **Luma Dream Machine**, **Kling** e o novo **Runway Gen-3**. Analistas acreditam que esses players menores podem capturar a demanda órfã de cineastas e editores que esperavam pela tecnologia da OpenAI para 2026.

### Consequências Imediatas:
- **Redução nos Preços de GPU:** Menos demanda por treinamento de vídeo massivo pode estabilizar o mercado de hardware.
- **Corrida pelos Agentes:** Toda a indústria deve agora pivotar para "IAs que Resolvem Coisas", deixando o conteúdo visual como um mercado de nicho.

---

*Gostou desta análise? Continue acompanhando a **Redação Tech** para mais informações exclusivas sobre o futuro da IA.*

[DEAL:0]`,
    affiliate_data: [
      {
        productName: "Livro: A Era da IA",
        price: "R$ 69,90",
        store: "Amazon",
        affiliateUrl: "https://amazon.com.br",
        productImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
        isBestChoice: true
      }
    ]
  };

  const { data, error } = await supabase
    .from('posts')
    .insert([post]);

  if (error) {
    console.error('Erro ao publicar:', error);
  } else {
    console.log('Post publicado com sucesso!', data);
  }
}

publish();
