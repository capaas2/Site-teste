const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function insertPost() {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        titulo: "Adeus à Elite: O novo Škoda Peaq promete 600km de autonomia e 7 lugares por um preço arrebatador",
        conteudo_markdown: `Por muito tempo, o mercado de SUVs elétricos de sete lugares foi um reduto exclusivo para bolsos profundos. Se você precisava de espaço para a família toda e queria abandonar a dependência dos combustíveis fósseis, suas opções orbitavam em torno de modelos de luxo como o Tesla Model X, o Kia EV9 ou o Mercedes-Benz EQS SUV — todos com etiquetas de preço que superam facilmente a barreira dos 80 mil euros. No entanto, o cenário acaba de mudar drasticamente com a confirmação oficial do **Škoda Peaq**, o SUV elétrico que promete ser o "carro do povo" na era da eletrificação total e utilidade extrema.

Baseado na onipresente plataforma MEB (Modular Electrification Toolkit) do Grupo Volkswagen, o Škoda Peaq não é apenas mais um veículo elétrico no portfólio da marca tcheca; ele é a materialização física da nova linguagem estratégica "Modern Solid". Com aproximadamente 4,9 metros de comprimento e uma distância entre eixos monumental de 2.965 mm, o Peaq foi desenhado de dentro para fora para maximizar a utilidade sem sacrificar a aerodinâmica.

### Engenharia de Ponta: O Coração da Autonomia de 600km
A grande estrela técnica do Škoda Peaq é o seu conjunto de baterias de última geração. Enquanto a versão de entrada (conhecida internamente como "60") utiliza uma bateria de 63 kWh, as versões de alta performance "90" e "90x" vêm equipadas com uma unidade massiva de **91 kWh brutos** (89 kWh líquidos). 

É este componente que permite ao SUV atingir a marca psicológica dos **600 quilômetros de autonomia no ciclo WLTP**, superando muitos rivais alemães e americanos que custam o dobro do preço. A eficiência não vem apenas da bateria, mas do gerenciamento térmico inteligente e do baixo coeficiente de arrasto, otimizado por rodas aerodinâmicas de 21 polegadas e uma silhueta que corta o ar com precisão milimétrica.

A performance também foi escalonada para diferentes perfis de usuários. A variante **90x** utiliza uma configuração de motor duplo para tração integral (AWD), entregando uma potência combinada de **220 kW (299 cv)**. Isso permite que esse gigante familiar de quase 5 metros acelere de 0 a 100 km/h em apenas 6,7 segundos, garantindo ultrapassagens seguras mesmo com o veículo carregado com sete passageiros e bagagens.

### Design "Modern Solid" e a Identidade Tech-Deck Face
Abandonando as linhas excessivamente complexas e agressivas de alguns rivais asiáticos, a Škoda introduziu no Peaq a linguagem **Modern Solid**. O destaque frontal é a "Tech-Deck Face", uma reinterpretação da grade tradicional tcheca. Em vez de entradas de ar desnecessárias, temos uma superfície lisa e escura que abriga de forma invisível os sensores de radar, LiDAR e câmeras para o sistema de assistência de nível 2.5.

A assinatura luminosa em formato de "T" e o capô esculpido conferem ao veículo uma presença de estrada robusta, mas sofisticada. Os puxadores de porta embutidos e os espelhos retrovisores digitais opcionais reforçam o foco na eficiência energética e no minimalismo funcional.

### O Interior: O Fator "7 Lugares" e a Revolução do Espaço
A verdadeira disrupção do Peaq está no aproveitamento da cabine. Ao contrário de SUVs a combustão convertidos, onde a terceira fileira é frequentemente um "puxadinho" para crianças, o Peaq aproveita o assoalho perfeitamente plano da plataforma MEB para oferecer conforto real. Na configuração de 7 assentos, a modularidade é a palavra de ordem: os bancos podem ser rebatidos para criar uma superfície de carga plana e cavernométrica.

Na configuração de 5 lugares, o porta-malas ostenta impressionantes **1.010 litros de capacidade**, estabelecendo um novo padrão para a categoria. A Škoda também incluiu o "Relax Package": com o apertar de um botão, os bancos dianteiros giram ligeiramente para dentro e o volante se desloca para frente, transformando o cockpit em uma área de descanso enquanto o veículo carrega.

### Tecnologia e Conectividade "Simply Clever"
Fiel à filosofia "Simply Clever", a Škoda não economizou em soluções inteligentes. O infoentretenimento é comandado por uma tela flutuante de 13,6 polegadas com interface Android Automotive nativa, permitindo que o Google Maps e o Spotify funcionem de forma ultra-fluida. Como novidade para 2026, o Peaq é o primeiro modelo da marca a oferecer o sistema de som premium da Sonos, projetado especificamente para a acústica da cabine acústica do SUV.

O carregamento rápido também foi aprimorado. Em um posto DC de alta potência, o Peaq pode carregar de **10% a 80% em menos de 28 minutos**, garantindo que as paradas em viagens longas sejam curtas e produtivas.

### Conclusão: O Novo Rei do Custo-Benefício High-Tech?
O Škoda Peaq chega em um momento crucial. Enquanto o mercado se satura de modelos subcompactos ou hiper-luxuosos, o Peaq ataca o "sweet spot": o SUV grande, familiar e com autonomia de estrada de verdade. Se a Škoda mantiver a promessa de um preço competitivo, o Peaq não será apenas mais um elétrico; ele será o veículo que finalmente levará a mobilidade sustentável de 7 lugares para fora do nicho de elite.`,
        categoria: "Mobilidade",
        autor: "Redação Tech",
        imagem_url: "https://cdn.motor1.com/images/mgl/qkY6Jq/s3/2027-skoda-peaq-teaser.jpg",
        publicado_em: new Date()
      }
    ]);

  if (error) {
    console.error('Erro ao inserir:', error);
  } else {
    console.log('Notícia publicada com sucesso!', data);
  }
}

insertPost();
