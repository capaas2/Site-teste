const { createClient } = require('@supabase/supabase-js');
const { uploadFromUrl } = require('./lib/media_storage');
const path = require('path');
const dotenv = require('dotenv');

// Configuração
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EXTERNAL_IMAGE_URL = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070';
const IMAGE_FILENAME = `figure-03-surgical-${Date.now()}.jpg`;

async function publish() {
  console.log("🚀 Iniciando Pipeline v5.0 para Figure 03 (Esquema Corrigido)...");

  try {
    // 1. Persistência de Mídia no Supabase Storage
    const internalUrl = await uploadFromUrl(EXTERNAL_IMAGE_URL, IMAGE_FILENAME);
    
    // 2. Preparação do Conteúdo (Incorporando subtítulo no Markdown)
    const subtitulo = 'Nova geração de robôs assistentes da Figure AI promete reduzir erros médicos em 40% com auxílio de IA neural.';
    const corpoMarkdown = `## ${subtitulo}\n\nNo cenário da medicina moderna, a automação deu um salto sem precedentes com o anúncio do **Figure 03**. Diferente de seus antecessores, este robô humanoide não apenas carrega equipamentos, mas atua como um assistente cirúrgico de alta fidelidade.

Equipado com o novo chip de processamento neural da Figure AI, o robô é capaz de antecipar as necessidades do cirurgião, entregando instrumentos com precisão milimétrica e realizando suturas de rotina de forma autônoma sob supervisão.

### O Fator Humanoide na Saúde
A escolha pela forma humana não é estética. O Figure 03 foi projetado para operar em ambientes construídos para humanos: salas de cirurgia, corredores de hospitais e elevadores. Isso elimina a necessidade de reformas estruturais nas unidades de saúde.

### Dados de Performance
*   **Precisão**: Sub-milimétrica em procedimentos laparoscópicos.
*   **Autonomia**: Bateria de alta densidade para 12 horas de operação contínua.
*   **Segurança**: Protocolo "Zero-Force Impact" para evitar colisões acidentais.

O FolhaByte continuará acompanhando os testes clínicos deste modelo, que devem chegar ao Brasil ainda no segundo semestre de 2026.`;

    const postData = {
      titulo: 'Figure 03: O Robô Humanoide que está Redefinindo a Cirurgia de Alta Precisão',
      conteudo_markdown: corpoMarkdown,
      imagem_url: internalUrl,
      categoria: 'Robótica',
      autor: 'Equipe FolhaByte',
      publicado_em: new Date().toISOString()
    };

    console.log("📝 Inserindo notícia no banco de dados (public.posts)...");
    const { data, error } = await supabase
      .from('posts')
      .insert([postData]);

    if (error) throw error;

    console.log("✅ Publicação realizada com sucesso!");
    console.log(`🖼️ Imagem hospedada em: ${internalUrl}`);

  } catch (err) {
    console.error("❌ Falha crítica na publicação:", err.message);
    process.exit(1);
  }
}

publish();
