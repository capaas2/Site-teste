import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Leitura manual do .env.local para evitar dependência 'dotenv' ausente
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env: Record<string, string> = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line.includes('='))
    .map(line => line.split('=').map(s => s.trim()))
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function publish() {
  const post = {
    titulo: "Sora da OpenAI: Um Marco de Inovação ou um Custo Insustentável?",
    categoria: "IA & Cinema",
    autor: "FolhaByte",
    imagem_url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200",
    publicado_em: new Date().toISOString(),
    views: 0,
    conteudo_markdown: `# O Fim de uma Era? OpenAI Surpreende ao Descontinuar Sora...`, // Exemplo simplificado para TS
    affiliate_data: []
  };

  const { error } = await supabase
    .from('posts')
    .insert([post]);

  if (error) {
    console.error('Erro ao publicar:', error);
  } else {
    console.log('Post publicado com sucesso!');
  }
}

// publish(); // Comentado para evitar execuções acidentais durante build
console.log("Script de publicação v2.9.6 pronto.");
