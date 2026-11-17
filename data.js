const DEFAULT_RECIPES_DB = [
  // CAFÉ DA MANHÃ (6 opções)
  {
    id: "rec-1",
    name: "Pão integral, ovo mexido cremoso e fruta",
    category: "Café da manhã",
    tags: ["Alta Proteína", "Rápido"],
    source: "Base Nutricional TBCA / Guia Alimentar",
    kcal: 380,
    protein: 22,
    carbs: 42,
    fat: 13,
    prepTime: "10 min",
    description: "Café da manhã equilibrado com proteínas de alto valor biológico, fibras do pão integral e vitaminas da fruta fresca.",
    ingredients: [
      "2 fatias de pão de forma 100% integral",
      "2 ovos inteiros",
      "1 fio de azeite de oliva",
      "1 banana prata ou 1 fatia média de mamão"
    ],
    steps: [
      "Quebre os ovos em uma tigela, tempere com uma pitada de sal e bata levemente.",
      "Aqueça uma frigideira antiaderente em fogo baixo com um fio de azeite.",
      "Despeje os ovos e mexa suavemente até ficarem cremosos sem ressecar.",
      "Toste levemente as fatias de pão integral e sirva acompanhado da fruta."
    ]
  },
  {
    id: "rec-7",
    name: "Panqueca de banana com aveia e canela",
    category: "Café da manhã",
    tags: ["Vegetariano", "Rápido", "Pré-Treino"],
    source: "Culinária Saudável / Tabela TACO",
    kcal: 310,
    protein: 14,
    carbs: 46,
    fat: 8,
    prepTime: "10 min",
    description: "Doce natural sem açúcar refinado para energia rápida e sustentada pela manhã.",
    ingredients: [
      "1 banana madura amassada",
      "1 ovo inteiro",
      "2 colheres de sopa de farinha de aveia",
      "Canela em pó a gosto"
    ],
    steps: [
      "Amasse bem a banana com um garfo em um prato fundo.",
      "Adicione o ovo, a aveia e a canela, misturando até formar uma massa homogênea.",
      "Doure pequenas porções em frigideira antiaderente untada em fogo baixo por 2 minutos de cada lado."
    ]
  },
  {
    id: "rec-9",
    name: "Cuscuz nordestino com ovos e queijo coalho",
    category: "Café da manhã",
    tags: ["Alta Proteína", "Econômico", "Sem Glúten"],
    source: "Guia Alimentar para a População Brasileira",
    kcal: 420,
    protein: 24,
    carbs: 48,
    fat: 14,
    prepTime: "15 min",
    description: "Clássico regional altamente saciante, sem glúten e rico em energia limpa para o início do dia.",
    ingredients: [
      "1/2 xícara de flocão de milho hidratado em água e pitada de sal",
      "2 ovos cozidos ou mexidos",
      "40g de queijo coalho grelhado na frigideira",
      "1 fio de azeite ou manteiga da terra"
    ],
    steps: [
      "Hidrate o flocão de milho com água por 10 minutos até absorver bem.",
      "Cozinhe na cuscuzeira por cerca de 8 a 10 minutos até ficar macio e soltinho.",
      "Grelhe o queijo coalho na frigideira e prepare os ovos.",
      "Sirva o cuscuz quente acompanhado dos ovos e do queijo."
    ]
  },
  {
    id: "rec-10",
    name: "Overnight Oats (Aveia adormecida com chia)",
    category: "Café da manhã",
    tags: ["Vegetariano", "Rápido"],
    source: "Nutrição Funcional / TBCA",
    kcal: 340,
    protein: 15,
    carbs: 49,
    fat: 9,
    prepTime: "5 min",
    description: "Preparado na noite anterior, economiza tempo pela manhã e melhora o trânsito intestinal.",
    ingredients: [
      "4 colheres de sopa de aveia em flocos",
      "150ml de leite desnatado ou bebida vegetal",
      "1 colher de sopa de sementes de chia",
      "1/2 maçã picada ou frutas vermelhas",
      "1 colher de chá de mel"
    ],
    steps: [
      "Em um pote de vidro com tampa, misture a aveia, a chia e o leite.",
      "Deixe na geladeira durante a noite (mínimo 6 horas) para hidratar e ganhar cremosidade.",
      "Pela manhã, finalize com as frutas picadas e um fio de mel."
    ]
  },
  {
    id: "rec-11",
    name: "Tapioca recheada com ricota temperada e tomate",
    category: "Café da manhã",
    tags: ["Vegetariano", "Rápido", "Sem Glúten"],
    source: "Tabela TACO / Culinária Brasileira",
    kcal: 295,
    protein: 13,
    carbs: 44,
    fat: 7,
    prepTime: "8 min",
    description: "Opção leve, sem glúten e de fácil digestão com recheio cremoso rico em cálcio.",
    ingredients: [
      "3 colheres de sopa de goma de tapioca hidratada",
      "60g de queijo ricota amassado",
      "1 colher de sopa de requeijão light ou iogurte natural",
      "Tomate picado, orégano e azeite"
    ],
    steps: [
      "Tempere a ricota amassada com o iogurte, tomate picado, orégano e uma pitada de sal.",
      "Peneire a goma de tapioca diretamente na frigideira quente formando um disco.",
      "Quando unir (cerca de 1 minuto), vire, espalhe o recheio, dobre ao meio e sirva."
    ]
  },
  {
    id: "rec-12",
    name: "Omelete verde de espinafre com torrada integral",
    category: "Café da manhã",
    tags: ["Alta Proteína", "Low Carb"],
    source: "Base Nutricional TBCA",
    kcal: 330,
    protein: 23,
    carbs: 21,
    fat: 17,
    prepTime: "12 min",
    description: "Rico em ferro, luteína e proteínas para foco mental logo cedo.",
    ingredients: [
      "3 ovos inteiros",
      "1 xícara de folhas de espinafre picadas",
      "1 fatia de pão integral tostado",
      "Cebola picada, sal e pimenta-do-reino"
    ],
    steps: [
      "Refogue rapidamente o espinafre e a cebola em frigideira antiaderente.",
      "Despeje os ovos batidos e temperados sobre o espinafre em fogo baixo.",
      "Tampe por 2 minutos, dobre a omelete e sirva com a torrada."
    ]
  },

  // ALMOÇO (6 opções)
  {
    id: "rec-2",
    name: "Arroz, feijão, frango grelhado e salada",
    category: "Almoço",
    tags: ["Alta Proteína", "Econômico"],
    source: "Guia Alimentar para a População Brasileira",
    kcal: 650,
    protein: 48,
    carbs: 68,
    fat: 16,
    prepTime: "25 min",
    description: "Prato brasileiro completo, ideal para manutenção de massa magra e saciedade prolongada.",
    ingredients: [
      "150g de filé de peito de frango",
      "4 colheres de sopa de arroz cozido",
      "1 concha média de feijão cozido",
      "Folhas verdes, tomate e cenoura ralada"
    ],
    steps: [
      "Tempere o frango com alho, limão, sal e páprica.",
      "Grelhe em frigideira quente untada por 4 a 5 minutos de cada lado.",
      "Monte metade do prato com salada fresca temperada com azeite e limão.",
      "Complete a outra metade com arroz, feijão e o frango fatiado."
    ]
  },
  {
    id: "rec-8",
    name: "Bowl de patinho moído, abóbora e arroz",
    category: "Almoço",
    tags: ["Alta Proteína", "Marmita"],
    source: "Tabela TACO / Nutrição Esportiva",
    kcal: 590,
    protein: 44,
    carbs: 60,
    fat: 17,
    prepTime: "25 min",
    description: "Refeição prática para marmitas da semana, rica em ferro, zinco e fibras.",
    ingredients: [
      "140g de patinho moído refogado",
      "100g de abóbora cabotiá assada em cubos",
      "3 colheres de sopa de arroz",
      "Couve refogada no alho"
    ],
    steps: [
      "Refogue o patinho moído com cebola, alho, tomate picado e cominho.",
      "Asse a abóbora em cubos com orégano e azeite por 20 minutos.",
      "Monte o bowl com arroz, carne, abóbora e couve."
    ]
  },
  {
    id: "rec-13",
    name: "Sobrecoxa assada sem pele com purê de mandioquinha",
    category: "Almoço",
    tags: ["Alta Proteína", "Sem Glúten"],
    source: "Culinária Brasileira / TBCA",
    kcal: 620,
    protein: 41,
    carbs: 58,
    fat: 23,
    prepTime: "35 min",
    description: "Corte suculento rico em sabor combinado com carboidrato de excelente digestibilidade.",
    ingredients: [
      "2 sobrecoxas de frango sem pele",
      "150g de mandioquinha (batata-baroa) cozida",
      "1 xícara de vagem ou brócolis no vapor",
      "Alho, limão, cúrcuma e azeite"
    ],
    steps: [
      "Tempere as sobrecoxas com alho, limão e cúrcuma; asse a 200°C por 30 minutos (ou 22 min na AirFryer).",
      "Amasse a mandioquinha cozida com um fio de azeite e água do cozimento até virar purê liso.",
      "Sirva acompanhado dos legumes cozidos no vapor."
    ]
  },
  {
    id: "rec-14",
    name: "Estrogonofe saudável de frango com arroz integral",
    category: "Almoço",
    tags: ["Alta Proteína", "Marmita"],
    source: "Gastronomia Saudável / TACO",
    kcal: 580,
    protein: 46,
    carbs: 56,
    fat: 16,
    prepTime: "20 min",
    description: "Versão leve feita com iogurte natural ou creme de ricota no lugar do creme de leite pesado.",
    ingredients: [
      "150g de peito de frango em cubos",
      "2 colheres de sopa de molho de tomate natural",
      "2 colheres de sopa de iogurte natural integral ou creme de ricota",
      "Champignon fatiado, 4 colheres de arroz integral e salada"
    ],
    steps: [
      "Doure os cubos de frango temperados com alho e cebola.",
      "Adicione o molho de tomate natural e o champignon, deixando apurar por 3 minutos.",
      "Desligue o fogo e misture o iogurte natural (para não talhar).",
      "Sirva com arroz integral e salada verde."
    ]
  },
  {
    id: "rec-15",
    name: "Salada completa de grão-de-bico, atum e ovos",
    category: "Almoço",
    tags: ["Alta Proteína", "Rápido", "Sem Glúten"],
    source: "Dieta Mediterrânea / TBCA",
    kcal: 510,
    protein: 39,
    carbs: 44,
    fat: 18,
    prepTime: "10 min",
    description: "Refeição fria refrescante que não precisa ir ao fogo, perfeita para dias quentes e corridos.",
    ingredients: [
      "1 lata de atum sólido em água escorrido",
      "1 xícara de grão-de-bico cozido",
      "1 ovo cozido picado",
      "Tomate-cereja, pepino, cebola roxa, salsinha e azeite"
    ],
    steps: [
      "Em uma tigela grande, misture o grão-de-bico cozido, o atum escorrido e os vegetais picados.",
      "Tempere com azeite extra virgem, suco de limão, sal e pimenta.",
      "Finalize com o ovo cozido cortado em quartos por cima."
    ]
  },
  {
    id: "rec-16",
    name: "Macarrão integral à bolonhesa de carne magra",
    category: "Almoço",
    tags: ["Pré-Treino", "Alta Proteína"],
    source: "Nutrição Esportiva / TACO",
    kcal: 640,
    protein: 42,
    carbs: 74,
    fat: 17,
    prepTime: "25 min",
    description: "Excelente repositor de glicogênio muscular com molho de tomate caseiro rico em licopeno.",
    ingredients: [
      "100g (peso cozido) de macarrão integral",
      "130g de patinho ou músculo moído magro",
      "1/2 xícara de molho de tomate pelado",
      "Manjericão fresco, alho e 1 colher de queijo parmesão ralado"
    ],
    steps: [
      "Cozinhe o macarrão integral em água fervente com sal até ficar al dente.",
      "Refogue a carne moída com alho e cebola, acrescente o tomate pelado e deixe cozinhar por 10 minutos.",
      "Misture a massa ao molho e finalize com manjericão fresco."
    ]
  },

  // LANCHE (6 opções)
  {
    id: "rec-3",
    name: "Iogurte natural com frutas e aveia",
    category: "Lanche",
    tags: ["Vegetariano", "Rápido"],
    source: "Guia Alimentar / Tabela TACO",
    kcal: 210,
    protein: 11,
    carbs: 28,
    fat: 6,
    prepTime: "5 min",
    description: "Lanche rápido e probiótico que melhora a digestão e fornece energia gradual.",
    ingredients: [
      "1 pote (170g) de iogurte natural sem açúcar",
      "1 colher de sopa cheia de aveia em flocos",
      "6 morangos picados ou 1/2 banana"
    ],
    steps: [
      "Higienize e pique as frutas em pedaços pequenos.",
      "Misture o iogurte natural gelado com a aveia em flocos.",
      "Finalize com as frutas picadas por cima."
    ]
  },
  {
    id: "rec-5",
    name: "Crepioca proteica de frango desfiado",
    category: "Lanche",
    tags: ["Alta Proteína", "Pré-Treino", "Sem Glúten"],
    source: "Nutrição Esportiva",
    kcal: 340,
    protein: 29,
    carbs: 31,
    fat: 10,
    prepTime: "10 min",
    description: "Opção prática sem glúten, excelente como pré ou pós-treino com alta densidade proteica.",
    ingredients: [
      "1 ovo inteiro",
      "2 colheres de sopa de goma de tapioca",
      "60g de frango cozido desfiado",
      "1 colher de sopa de ricota cremosa"
    ],
    steps: [
      "Misture o ovo e a goma de tapioca até formar uma massa homogênea.",
      "Despeje na frigideira quente e deixe firmar por 1 minuto.",
      "Vire, recheie com frango e ricota, dobre ao meio e sirva."
    ]
  },
  {
    id: "rec-17",
    name: "Vitamina energética de banana, pasta de amendoim e cacau",
    category: "Lanche",
    tags: ["Vegetariano", "Pré-Treino", "Rápido"],
    source: "Nutrição Esportiva / TBCA",
    kcal: 360,
    protein: 15,
    carbs: 44,
    fat: 14,
    prepTime: "5 min",
    description: "Shake cremoso rico em potássio, gorduras boas e antioxidantes do cacau 100%.",
    ingredients: [
      "200ml de leite gelado (ou leite vegetal)",
      "1 banana congelada ou madura",
      "1 colher de sopa de pasta de amendoim integral",
      "1 colher de chá de cacau em pó 100%"
    ],
    steps: [
      "Coloque todos os ingredientes no liquidificador.",
      "Bata por 40 segundos até ficar bem cremoso e aerado.",
      "Sirva imediatamente."
    ]
  },
  {
    id: "rec-18",
    name: "Sanduíche natural de frango cremoso com cenoura",
    category: "Lanche",
    tags: ["Alta Proteína", "Marmita"],
    source: "Culinária Saudável / TACO",
    kcal: 320,
    protein: 26,
    carbs: 34,
    fat: 8,
    prepTime: "10 min",
    description: "Fácil de levar na mochila ou para o trabalho, com alta saciedade.",
    ingredients: [
      "2 fatias de pão integral",
      "70g de frango desfiado",
      "1 colher de sopa de requeijão light ou iogurte",
      "Cenoura ralada, alface e milho verde"
    ],
    steps: [
      "Misture o frango desfiado com o requeijão light e a cenoura ralada até virar um patê.",
      "Recheie as fatias de pão integral e adicione folhas de alface.",
      "Corte na diagonal e embale ou sirva."
    ]
  },
  {
    id: "rec-19",
    name: "Abacate amassado com limão e sementes de abóbora",
    category: "Lanche",
    tags: ["Low Carb", "Vegetariano", "Rápido"],
    source: "Nutrição Funcional / TBCA",
    kcal: 250,
    protein: 7,
    carbs: 11,
    fat: 21,
    prepTime: "5 min",
    description: "Controla o pico de insulina à tarde e fornece magnésio e gorduras monoinsaturadas.",
    ingredients: [
      "1/4 de abacate médio maduro (aprox. 100g)",
      "Suco de 1/2 limão",
      "1 colher de sopa de sementes de abóbora torradas",
      "1 pitada de canela ou sal rosa"
    ],
    steps: [
      "Amasse o abacate em uma tigela pequena com o suco de limão.",
      "Salpique as sementes de abóbora por cima para dar crocância."
    ]
  },
  {
    id: "rec-20",
    name: "Bolo de caneca proteico de aveia e cacau",
    category: "Lanche",
    tags: ["Alta Proteína", "Rápido"],
    source: "Gastronomia Fit",
    kcal: 280,
    protein: 21,
    carbs: 30,
    fat: 8,
    prepTime: "4 min",
    description: "Mata a vontade de doce em menos de 5 minutos no micro-ondas sem sair da dieta.",
    ingredients: [
      "1 ovo",
      "2 colheres de sopa de farelo de aveia",
      "1 scoop de whey protein chocolate (ou 1 colher de cacau + mel)",
      "1 colher de café de fermento em pó e 2 colheres de água"
    ],
    steps: [
      "Misture todos os ingredientes diretamente em uma caneca grande com um garfo.",
      "Leve ao micro-ondas por 1 minuto e 20 segundos (verifique o ponto).",
      "Desenforme ou coma direto na caneca."
    ]
  },

  // JANTAR (6 opções)
  {
    id: "rec-4",
    name: "Sopa de legumes com omelete leve",
    category: "Jantar",
    tags: ["Low Carb", "Rápido"],
    source: "Guia Alimentar / Tabela TACO",
    kcal: 450,
    protein: 28,
    carbs: 36,
    fat: 19,
    prepTime: "20 min",
    description: "Jantar reconfortante, de fácil digestão noturna e rico em micronutrientes.",
    ingredients: [
      "1 concha grande de caldo de legumes naturais",
      "2 ovos inteiros",
      "1 colher de sopa de queijo cottage ou minas frescal",
      "Cheiro-verde e cúrcuma a gosto"
    ],
    steps: [
      "Cozinhe os legumes com alho e cúrcuma; bata metade para dar cremosidade.",
      "Bata os ovos com cheiro-verde e queijo picado.",
      "Doure a omelete em frigideira antiaderente por 2 minutos de cada lado e sirva com a sopa."
    ]
  },
  {
    id: "rec-6",
    name: "Tilápia ou Salmão assado com batata-doce",
    category: "Jantar",
    tags: ["Alta Proteína", "Sem Glúten"],
    source: "Base Nutricional TBCA",
    kcal: 520,
    protein: 42,
    carbs: 45,
    fat: 18,
    prepTime: "30 min",
    description: "Refeição anti-inflamatória rica em ômega-3 e carboidratos complexos.",
    ingredients: [
      "160g de filé de tilápia ou salmão",
      "150g de batata-doce em rodelas",
      "Brócolis cozido no vapor",
      "Azeite, alecrim e limão"
    ],
    steps: [
      "Tempere o peixe com limão, sal, alho e alecrim.",
      "Asse o peixe e as rodelas de batata-doce regadas com azeite a 200°C por 20 minutos.",
      "Sirva com brócolis no vapor."
    ]
  },
  {
    id: "rec-21",
    name: "Wrap integral de carne desfiada com guacamole",
    category: "Jantar",
    tags: ["Alta Proteína", "Rápido"],
    source: "Culinária Funcional",
    kcal: 470,
    protein: 35,
    carbs: 39,
    fat: 18,
    prepTime: "12 min",
    description: "Jantar leve, saboroso e prático usando folha de pão folha integral.",
    ingredients: [
      "1 disco de pão folha integral (Rap10 integral)",
      "110g de carne bovina desfiada ou frango",
      "2 colheres de sopa de abacate amassado com tomate e limão",
      "Folhas de rúcula ou alface"
    ],
    steps: [
      "Aqueça o disco integral na frigideira por 30 segundos de cada lado.",
      "Espalhe o guacamole caseiro, coloque a carne aquecida e as folhas.",
      "Enrole firme e corte ao meio."
    ]
  },
  {
    id: "rec-22",
    name: "Abobrinha recheada com frango e queijo gratinado",
    category: "Jantar",
    tags: ["Low Carb", "Alta Proteína", "Sem Glúten"],
    source: "Gastronomia Saudável / TACO",
    kcal: 390,
    protein: 38,
    carbs: 16,
    fat: 19,
    prepTime: "25 min",
    description: "Jantar com baixo teor de carboidratos, ideal para quem busca leveza à noite.",
    ingredients: [
      "1 abobrinha italiana média cortada ao meio no comprimento",
      "130g de frango desfiado refogado com molho de tomate",
      "30g de mussarela ou parmesão para gratinar",
      "Orégano e azeite"
    ],
    steps: [
      "Retire o miolo da abobrinha com uma colher formando duas 'canoas' e pique o miolo.",
      "Misture o miolo picado ao frango refogado e recheie as abobrinhas.",
      "Cubra com queijo e orégano e leve ao forno ou AirFryer a 190°C por 18 minutos."
    ]
  },
  {
    id: "rec-23",
    name: "Caldo verde fit de couve-flor e frango",
    category: "Jantar",
    tags: ["Low Carb", "Sem Glúten"],
    source: "Culinária Brasileira Adaptada",
    kcal: 360,
    protein: 27,
    carbs: 19,
    fat: 19,
    prepTime: "20 min",
    description: "Substitui a batata por couve-flor batida, mantendo a textura aveludada com metade das calorias.",
    ingredients: [
      "2 xícaras de couve-flor cozida",
      "100g de peito de frango em cubinhos ou linguiça de frango magra",
      "1 xícara de couve-manteiga fatiada bem fina",
      "Alho, cebola e azeite"
    ],
    steps: [
      "Bata a couve-flor cozida no liquidificador com um pouco da água do cozimento até virar um creme.",
      "Doure o alho e o frango na panela, despeje o creme de couve-flor e deixe ferver.",
      "Adicione a couve fatiada no último minuto para manter o verde vibrante."
    ]
  },
  {
    id: "rec-24",
    name: "Risoto funcional de quinoa com cogumelos",
    category: "Jantar",
    tags: ["Vegetariano", "Sem Glúten"],
    source: "Nutrição Vegetariana / TBCA",
    kcal: 440,
    protein: 18,
    carbs: 58,
    fat: 14,
    prepTime: "25 min",
    description: "A quinoa fornece todos os aminoácidos essenciais com textura cremosa parecida com risoto.",
    ingredients: [
      "1 xícara de quinoa em grãos cozida",
      "100g de cogumelos paris ou shimeji fatiados",
      "1 colher de sopa de creme de ricota",
      "Alho-poró, azeite e salsinha"
    ],
    steps: [
      "Refogue o alho-poró e os cogumelos no azeite até dourarem.",
      "Junte a quinoa já cozida e um pouco de caldo de legumes quente.",
      "Finalize fora do fogo com o creme de ricota e salsinha."
    ]
  }
];

const GUIDES_DB = [
  {
    id: "guide-1",
    title: "Alongamento Matinal Completo (5 min)",
    category: "Alongamento",
    durationLabel: "5 min",
    target: "Coluna, pescoço, ombros e posterior de coxa",
    summary: "Sequência rápida para destravar as articulações logo ao acordar e ativar a circulação.",
    guidedSteps: [
      { title: "1. Inclinação Cervical", seconds: 45, desc: "Sentado ou em pé com a coluna reta, leve a orelha direita em direção ao ombro direito suavemente. Troque o lado na metade do tempo." },
      { title: "2. Espreguiçamento Vertical e Lateral", seconds: 45, desc: "Entrelace os dedos acima da cabeça, estenda os braços para o teto inspirando fundo e incline o tronco levemente para cada lado." },
      { title: "3. Gato e Vaca na Cadeira ou Tapete", seconds: 60, desc: "Com as mãos apoiadas nos joelhos (ou em 4 apoios), inspire abrindo o peito; expire arredondando as costas e levando o queixo ao peito." },
      { title: "4. Alongamento de Posterior de Coxa", seconds: 90, desc: "Em pé, estenda uma perna à frente apoiando o calcanhar no chão com ponta do pé para cima. Incline o tronco reto. Troque a perna aos 45s." },
      { title: "5. Rotação Torácica", seconds: 60, desc: "Sentado, gire o tronco para a direita apoiando a mão esquerda no joelho direito. Troque o lado na metade." }
    ],
    tips: "Nunca force até sentir dor aguda. Mantenha a respiração lenta e profunda."
  },
  {
    id: "guide-2",
    title: "Pausa Ativa para Trabalho Sentado (3 min)",
    category: "Postura",
    durationLabel: "3 min",
    target: "Lombar, flexores do quadril e punhos",
    summary: "Ideal para fazer a cada 2 blocos de foco ou após horas no computador.",
    guidedSteps: [
      { title: "1. Punhos e Antebraços", seconds: 40, desc: "Estenda o braço à frente com a palma para cima e puxe os dedos suavemente para baixo com a outra mão. Inverta aos 20s." },
      { title: "2. Abertura Peitoral", seconds: 45, desc: "Leve os braços para trás das costas, entrelace os dedos e puxe os ombros para baixo e para trás, abrindo o peito." },
      { title: "3. Flexor do Quadril (Afundo Baixo)", seconds: 50, desc: "Dê um passo largo à frente, mantendo a perna de trás estendida e o quadril encaixado para aliviar a lombar." },
      { title: "4. Descompressão Lombar", seconds: 45, desc: "Em pé, deixe o tronco pender à frente com joelhos semiflexionados e segure os cotovelos opostos." }
    ],
    tips: "Mantenha os ombros longe das orelhas durante toda a execução."
  },
  {
    id: "guide-3",
    title: "Mobilidade de Quadril & Core (4 min)",
    category: "Mobilidade",
    durationLabel: "4 min",
    target: "Quadril, estabilidade lombar e abdômen",
    summary: "Melhora a amplitude de movimento para agachamentos, caminhadas e corrida.",
    guidedSteps: [
      { title: "1. Rotação 90/90 de Quadril", seconds: 60, desc: "Sentado no chão com joelhos dobrados a 90°, alterne os joelhos de um lado para o outro mantendo o tronco ereto." },
      { title: "2. Prancha Abdominal Estável", seconds: 60, desc: "Apoie antebraços e pontas dos pés no chão, mantendo quadril alinhado e abdômen contraído sem prender a respiração." },
      { title: "3. Ponte de Glúteos", seconds: 60, desc: "Deitado de costas com joelhos flexionados, eleve o quadril contraindo os glúteos no topo por 2 segundos a cada repetição." },
      { title: "4. Postura da Criança (Child's Pose)", seconds: 60, desc: "Ajoelhado, sente sobre os calcanhares e estenda os braços à frente no chão descansando a testa." }
    ],
    tips: "Priorize o controle do movimento em vez da velocidade."
  },
  {
    id: "guide-4",
    title: "Respiração 4-7-8 para Dormir Melhor (4 min)",
    category: "Respiração",
    durationLabel: "4 min",
    target: "Sistema nervoso e qualidade do sono",
    summary: "Técnica respiratória comprovada para desacelerar os batimentos antes de deitar.",
    guidedSteps: [
      { title: "1. Preparação e Relaxamento", seconds: 30, desc: "Deite-se confortavelmente, solte os ombros e relaxe a mandíbula." },
      { title: "2. Ciclos 4-7-8 (Parte 1)", seconds: 105, desc: "Inspire pelo nariz por 4s • Segure o ar por 7s • Expire pela boca devagar por 8s." },
      { title: "3. Ciclos 4-7-8 (Parte 2)", seconds: 105, desc: "Continue no ritmo 4-7-8 mantendo o foco apenas na contagem da respiração." }
    ],
    tips: "Se 7s segurando parecer muito no início, adapte para 3-5-6."
  }
];
