const { createClient } = require('@supabase/supabase-js');
// Usando fetch nativo do Node 24
const path = require('path');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Credenciais do Supabase não encontradas no .env.local");
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Baixa uma imagem de uma URL externa e faz upload para o bucket capas_noticias
 * @param {string} externalUrl - URL original (Unsplash, NASA, etc)
 * @param {string} fileName - Nome desejado para o arquivo no storage
 * @returns {Promise<string>} - URL pública interna do Supabase
 */
async function uploadFromUrl(externalUrl, fileName) {
  try {
    console.log(`📥 Baixando imagem: ${externalUrl}...`);
    const response = await fetch(externalUrl);
    
    if (!response.ok) throw new Error(`Falha ao baixar imagem: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    console.log(`📤 Fazendo upload para o bucket 'capas_noticias' como '${fileName}'...`);
    const { data, error } = await supabase.storage
      .from('capas_noticias')
      .upload(fileName, buffer, {
        contentType: contentType,
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('capas_noticias')
      .getPublicUrl(fileName);

    console.log(`✅ Upload concluído! URL Interna: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error("❌ Erro no processamento de mídia:", error.message);
    throw error;
  }
}

module.exports = { uploadFromUrl };
