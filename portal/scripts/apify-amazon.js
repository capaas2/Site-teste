const fs = require('fs');

const APIFY_TOKEN = 'apify_api_JTGq6H3WGcEUE2g9Mh34UP1a8wFCML23qkmw';

async function runApify() {
  console.log('🚀 Iniciando scraping da Amazon via Apify Cheerio Scraper...');
  
  const actorId = 'apify~cheerio-scraper';
  const runUrl = `https://api.apify.com/v2/acts/${actorId}/runs?token=${APIFY_TOKEN}`;
  
  const input = {
    startUrls: [{ url: 'https://www.amazon.com.br/Notebook-Lenovo-IdeaPad-15IRH10-i5-13420H/dp/B0FCVNLSGV' }],
    pageFunction: `async function pageFunction(context) {
      const { $ } = context;
      const title = $('#productTitle').text().trim();
      const images = [];
      
      // Procura todas as imagens na galeria
      $('#altImages img').each((i, el) => {
        const src = $(el).attr('src');
        if (src) {
          // Converte thumbnails da Amazon para alta resolução substituindo o padrão de tamanho
          const hiRes = src.replace(/\\._[A-Z0-9,_-]+\\.(jpg|png|jpeg)/i, '._SL1500_.$1');
          if (hiRes.includes('media-amazon.com') && !images.includes(hiRes)) {
            images.push(hiRes);
          }
        }
      });
      
      // Fallback para imagem principal se a galeria falhar
      const mainImg = $('#landingImage').attr('src');
      if (mainImg) {
        const hiResMain = mainImg.replace(/\\._[A-Z0-9,_-]+\\.(jpg|png|jpeg)/i, '._SL1500_.$1');
        if (!images.includes(hiResMain)) {
          images.unshift(hiResMain);
        }
      }
      
      return { title, images };
    }`,
    maxPagesPerCrawl: 1,
    proxyConfiguration: { useApifyProxy: true }
  };

  try {
    const startRes = await fetch(runUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    
    if (!startRes.ok) {
      throw new Error(`Erro ao iniciar Actor: ${await startRes.text()}`);
    }
    
    const startData = await startRes.json();
    const runId = startData.data.id;
    const datasetId = startData.data.defaultDatasetId;
    console.log(`✅ Actor iniciado. Run ID: ${runId}. Dataset ID: ${datasetId}`);
    console.log('⏳ Aguardando conclusão (polling)...');
    
    // Polling do status do Run
    const statusUrl = `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`;
    let finished = false;
    
    for (let i = 0; i < 30; i++) { // Max 2.5 minutos
      await new Promise(r => setTimeout(r, 5000));
      const checkRes = await fetch(statusUrl);
      const checkData = await checkRes.json();
      const status = checkData.data.status;
      console.log(` - Status atual: ${status}`);
      
      if (status === 'SUCCEEDED') {
        finished = true;
        break;
      } else if (status === 'FAILED' || status === 'ABORTED' || status === 'TIMED-OUT') {
        throw new Error(`Scraper terminou com status de erro: ${status}`);
      }
    }
    
    if (!finished) {
      throw new Error('Timeout aguardando a conclusão do scraping.');
    }
    
    // Baixar os dados do Dataset
    const datasetUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}`;
    const dataRes = await fetch(datasetUrl);
    const items = await dataRes.json();
    
    console.log('🎉 Dados obtidos:', JSON.stringify(items, null, 2));
    
    if (items && items.length > 0 && items[0].images && items[0].images.length > 0) {
      console.log('✅ Imagens encontradas com sucesso!');
      fs.writeFileSync('extracted-images.json', JSON.stringify(items[0], null, 2));
    } else {
      console.log('❌ Nenhuma imagem de produto extraída.');
    }
  } catch (err) {
    console.error('❌ Erro no fluxo do Apify:', err.message);
  }
}

runApify();
