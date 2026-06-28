const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function requestGoogleIndexing(slug) {
  console.log(`⚡ Solicitando indexação urgente no Google para o slug: ${slug}...`);
  const postUrl = `https://folhabyte.dev/post/${slug}`;
  
  try {
    const res = await fetch("https://folhabyte.dev/api/index-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        url: postUrl,
        action: "URL_UPDATED",
      }),
    });

    if (res.ok) {
      console.log(`   🚀 Sucesso! Google foi notificado de ${slug}.`);
    } else {
      console.warn(`   ⚠️ Erro ao notificar o Google (HTTP ${res.status}):`, await res.text());
    }
  } catch (err) {
    console.error("   ❌ Falha na conexão com a API de indexação:", err.message);
  }
}

async function run() {
  console.log("🛠️ Iniciando refinamento de links e imagens dos posts ativos...\n");

  // 1. Buscar todos os posts ativos
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*');

  if (error) {
    console.error("❌ Erro ao buscar posts:", error);
    return;
  }

  for (const post of posts) {
    let modified = false;
    let markdown = post.conteudo_markdown;
    let imagem_url = post.imagem_url;
    const id = post.id;
    const title = post.titulo;

    console.log(`Analisando post: "${title}"`);

    // --- CORREÇÃO DE IMAGENS DO CORP E CAPA ---
    
    // Post: SK Hynix e Samsung dividem mercado com barramento de HBM4 em 2048 bits
    if (id === "4f512c16-bbde-4c33-bd1d-7618d936d6e5") {
      const newHero = "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=1200";
      const newDetail = "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&q=80&w=1200";
      
      if (imagem_url !== newHero) {
        imagem_url = newHero;
        modified = true;
      }
      
      // Substituir tags de imagem no markdown
      const oldImgReg = /\[IMAGEM:\s*[^|\]\n\r]+\bhbm4-memory-hero\.png\s*\|\s*LEGENDA:[^\]]+\]/gi;
      const oldImgDetailReg = /\[IMAGEM:\s*[^|\]\n\r]+\bhbm4-memory-detail\.png\s*\|\s*LEGENDA:[^\]]+\]/gi;
      
      // Se não achar pelo nome exato, faz replace das strings conhecidas
      markdown = markdown.replace(/https:\/\/cfqwufidvchaybqknuar\.supabase\.co\/storage\/v1\/object\/public\/capas_noticias\/posts\/hbm4-memory-hero\.png/gi, newHero);
      markdown = markdown.replace(/https:\/\/cfqwufidvchaybqknuar\.supabase\.co\/storage\/v1\/object\/public\/capas_noticias\/posts\/hbm4-memory-detail\.png/gi, newDetail);
      modified = true;
    }

    // Post: Apple enfrenta processo coletivo de 3 bilhões de libras por taxas do iCloud
    if (id === "87ab0ef0-c6b9-493a-bbdf-bcadfffc2fbb") {
      const newDetail = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1200";
      markdown = markdown.replace(/https:\/\/cfqwufidvchaybqknuar\.supabase\.co\/storage\/v1\/object\/public\/capas_noticias\/posts\/apple-icloud-detail\.png/gi, newDetail);
      markdown = markdown.replace(/microsoft-italy-detail\.png/gi, 'apple-icloud-detail.png'); // segurança extra
      markdown = markdown.replace(/https:\/\/cfqwufidvchaybqknuar\.supabase\.co\/storage\/v1\/object\/public\/capas_noticias\/posts\/microsoft-italy-detail\.png/gi, newDetail);
      modified = true;
    }

    // Post: Vazamentos de refrigeração líquida nos racks Blackwell GB200 da Nvidia atrasam entregas
    if (id === "be510d4d-820f-41dd-a281-b9f0c4642737") {
      const newHero = "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=1200";
      const newDetail = "https://images.unsplash.com/photo-1624701928517-44c8ac49d93c?auto=format&fit=crop&q=80&w=1200";
      
      if (imagem_url !== newHero) {
        imagem_url = newHero;
        modified = true;
      }
      markdown = markdown.replace(/https:\/\/cfqwufidvchaybqknuar\.supabase\.co\/storage\/v1\/object\/public\/capas_noticias\/posts\/blackwell-cooling-hero\.png/gi, newHero);
      markdown = markdown.replace(/https:\/\/cfqwufidvchaybqknuar\.supabase\.co\/storage\/v1\/object\/public\/capas_noticias\/posts\/blackwell-cooling-detail\.png/gi, newDetail);
      modified = true;
    }


    // --- CORREÇÃO DE INTERLINKS QUEBRADOS (POSTS DELETADOS) ---

    // 1. SK Hynix
    if (id === "4f512c16-bbde-4c33-bd1d-7618d936d6e5") {
      markdown = markdown.replace(/\[Falha no kernel Linux exige atualização de servidores\]\(\/post\/falha-no-kernel-linux-exige-atualizacao-de-servidores\)/gi,
        "[Vazamentos de refrigeração líquida nos racks Blackwell GB200 da Nvidia atrasam entregas](/post/vazamentos-de-refrigeracao-liquida-nos-racks-blackwell-gb200-da-nvidia-atrasam-entregas)");
      markdown = markdown.replace(/\[Nvidia desafia Intel e AMD com o chip de IA RTX Spark\]\(\/post\/nvidia-desafia-intel-e-amd-com-o-chip-de-ia-rtx-spark\)/gi,
        "[O custo de fugir da VMware: a encruzilhada das empresas com o Proxmox](/post/o-custo-de-fugir-da-vmware-a-encruzilhada-das-empresas-com-o-proxmox)");
      modified = true;
    }

    // 2. Apple iCloud
    if (id === "87ab0ef0-c6b9-493a-bbdf-bcadfffc2fbb") {
      markdown = markdown.replace(/\[FTC investiga aliança da Microsoft com a OpenAI\]\(\/post\/ftc-investiga-alianca-da-microsoft-com-a-openai\)/gi,
        "[Itália investiga Microsoft por venda casada e aumento de preços na nuvem](/post/italia-investiga-microsoft-por-venda-casada-e-aumento-de-precos-na-nuvem)");
      markdown = markdown.replace(/\[Nvidia desafia Intel e AMD com o chip de IA RTX Spark\]\(\/post\/nvidia-desafia-intel-e-amd-com-o-chip-de-ia-rtx-spark\)/gi,
        "[O custo de fugir da VMware: a encruzilhada das empresas com o Proxmox](/post/o-custo-de-fugir-da-vmware-a-encruzilhada-das-empresas-com-o-proxmox)");
      modified = true;
    }

    // 3. Nvidia Blackwell
    if (id === "be510d4d-820f-41dd-a281-b9f0c4642737") {
      markdown = markdown.replace(/\[Falha no kernel Linux exige atualização de servidores\]\(\/post\/falha-no-kernel-linux-exige-atualizacao-de-servidores\)/gi,
        "[SK Hynix e Samsung dividem mercado com barramento de HBM4 em 2048 bits](/post/sk-hynix-e-samsung-dividem-mercado-com-barramento-de-hbm4-em-2048-bits)");
      markdown = markdown.replace(/\[Nvidia desafia Intel e AMD com o chip de IA RTX Spark\]\(\/post\/nvidia-desafia-intel-e-amd-com-o-chip-de-ia-rtx-spark\)/gi,
        "[O custo de fugir da VMware: a encruzilhada das empresas com o Proxmox](/post/o-custo-de-fugir-da-vmware-a-encruzilhada-das-empresas-com-o-proxmox)");
      modified = true;
    }

    // 4. Nvidia Direitos Autorais (Jamendo)
    if (id === "b36fe792-5237-4840-8aa4-4ce2da7d5eb3") {
      markdown = markdown.replace(/\[Falha no kernel Linux exige atualização de servidores\]\(\/post\/falha-no-kernel-linux-exige-atualizacao-de-servidores\)/gi,
        "[New York Times acusa Microsoft de cumplicidade em infração de IA](/post/new-york-times-acusa-microsoft-de-cumplicidade-em-infracao-de-ia)");
      markdown = markdown.replace(/\[FTC investiga aliança da Microsoft com a OpenAI\]\(\/post\/ftc-investiga-alianca-da-microsoft-com-a-openai\)/gi,
        "[Vazamentos de refrigeração líquida nos racks Blackwell GB200 da Nvidia atrasam entregas](/post/vazamentos-de-refrigeracao-liquida-nos-racks-blackwell-gb200-da-nvidia-atrasam-entregas)");
      modified = true;
    }

    // 5. NYT Microsoft
    if (id === "7d82f98c-a909-46ca-a2ae-31d3b262351b") {
      // O NYT tem duas vezes o link do FTC na redação original
      // Substituir o primeiro link do FTC
      markdown = markdown.replace(/\[FTC investiga aliança da Microsoft com a OpenAI\]\(\/post\/ftc-investiga-alianca-da-microsoft-com-a-openai\)/i,
        "[Nvidia enfrenta processo milionário por direitos autorais na IA](/post/nvidia-enfrenta-processo-milionario-por-direitos-autorais-na-ia)");
      // Substituir o segundo link do FTC na seção final
      markdown = markdown.replace(/\[FTC investiga aliança da Microsoft com a OpenAI\]\(\/post\/ftc-investiga-alianca-da-microsoft-com-a-openai\)/i,
        "[Nvidia enfrenta processo milionário por direitos autorais na IA](/post/nvidia-enfrenta-processo-milionario-por-direitos-autorais-na-ia)");
      
      markdown = markdown.replace(/\[Falha no kernel Linux exige atualização de servidores\]\(\/post\/falha-no-kernel-linux-exige-atualizacao-de-servidores\)/gi,
        "[Itália investiga Microsoft por venda casada e aumento de preços na nuvem](/post/italia-investiga-microsoft-por-venda-casada-e-aumento-de-precos-na-nuvem)");
      modified = true;
    }

    // 6. Itália investiga Microsoft
    if (id === "3092f594-445a-418b-9183-8a28b40af013") {
      markdown = markdown.replace(/\[FTC investiga aliança da Microsoft com a OpenAI\]\(\/post\/ftc-investiga-alianca-da-microsoft-com-a-openai\)/gi,
        "[New York Times acusa Microsoft de cumplicidade em infração de IA](/post/new-york-times-acusa-microsoft-de-cumplicidade-em-infracao-de-ia)");
      markdown = markdown.replace(/\[Nvidia desafia Intel e AMD com o chip de IA RTX Spark\]\(\/post\/nvidia-desafia-intel-e-amd-com-o-chip-de-ia-rtx-spark\)/gi,
        "[O custo de fugir da VMware: a encruzilhada das empresas com o Proxmox](/post/o-custo-de-fugir-da-vmware-a-encruzilhada-das-empresas-com-o-proxmox)");
      modified = true;
    }

    if (modified) {
      console.log(`   📝 Atualizando post no Supabase...`);
      const { error: updateError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id); // apenas para log

      const { data: updatedData, error: patchError } = await supabase
        .from('posts')
        .update({
          conteudo_markdown: markdown,
          imagem_url: imagem_url
        })
        .eq('id', id)
        .select();

      if (patchError) {
        console.error(`   ❌ Erro ao atualizar o post "${title}":`, patchError.message);
      } else {
        console.log(`   ✅ Post "${title}" atualizado com sucesso!`);
        
        // Notificar API de indexação rápida
        const slug = updatedData[0].titulo 
          ? slugify(updatedData[0].titulo)
          : post.titulo; // Fallback
        await requestGoogleIndexing(slug);
      }
    } else {
      console.log(`   ℹ️ Nenhuma alteração necessária.`);
    }
    console.log('-'.repeat(60));
  }

  console.log("\n🎉 Refinamento completo!");
}

run().catch(console.error);
