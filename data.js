const RECIPES_DB = [
  {
    id: "rec-1",
    name: "Pão integral, ovo mexido e fruta",
    category: "Café da manhã",
    kcal: 380,
    protein: "22g",
    carbs: "42g",
    fat: "13g",
    prepTime: "10 min",
    description: "Café da manhã equilibrado com proteínas de alto valor biológico, fibras do pão integral e vitaminas da fruta fresca.",
    ingredients: [
      "2 fatias de pão de forma 100% integral",
      "2 ovos inteiros",
      "1 fio de azeite de oliva ou 1 colher de chá de manteiga",
      "1 banana prata ou 1 fatia média de mamão",
      "Sal, pimenta-do-reino e orégano a gosto"
    ],
    steps: [
      "Quebre os ovos em uma tigela, tempere com uma pitada de sal e bata levemente com um garfo.",
      "Aqueça uma frigideira antiaderente em fogo baixo com um fio de azeite.",
      "Despeje os ovos e mexa suavemente com uma espátula de silicone até ficarem cremosos (não deixe ressecar).",
      "Toste levemente as fatias de pão integral na frigideira ou torradeira.",
      "Sirva os ovos sobre o pão e acompanhe com a fruta picada."
    ]
  },
  {
    id: "rec-2",
    name: "Arroz, feijão, frango grelhado e salada",
    category: "Almoço",
    kcal: 650,
    protein: "48g",
    carbs: "68g",
    fat: "16g",
    prepTime: "25 min",
    description: "O clássico prato brasileiro completo, ideal para manutenção de massa magra e saciedade prolongada.",
    ingredients: [
      "150g de filé de peito de frango",
      "4 colheres de sopa de arroz branco ou integral cozido",
      "1 concha média de feijão carioca ou preto cozido",
      "Folhas verdes (alface, rúcula), tomate e cenoura ralada à vontade",
      "1 colher de sopa de azeite extra virgem, limão, alho e sal"
    ],
    steps: [
      "Tempere o filé de frango com alho amassado, suco de meio limão, sal e páprica.",
      "Aqueça bem uma grelha ou frigideira antiaderente untada com um fio de azeite.",
      "Grelhe o frango por cerca de 4 a 5 minutos de cada lado até dourar sem perder a suculência.",
      "Monte o prato dividindo metade com salada fresca temperada com azeite e limão.",
      "Complete a outra metade com o arroz, o feijão quente e o filé de frango fatiado."
    ]
  },
  {
    id: "rec-3",
    name: "Iogurte natural com frutas e aveia",
    category: "Lanche",
    kcal: 210,
    protein: "11g",
    carbs: "28g",
    fat: "6g",
    prepTime: "5 min",
    description: "Lanche rápido e probiótico que melhora a digestão e fornece energia gradual para a tarde.",
    ingredients: [
      "1 pote (170g) de iogurte natural integral ou desnatado sem açúcar",
      "1 colher de sopa cheia de aveia em flocos",
      "6 morangos picados ou 1/2 banana em rodelas",
      "1 colher de chá de mel ou chia (opcional)"
    ],
    steps: [
      "Higienize e pique as frutas em pedaços pequenos.",
      "Em uma tigela, coloque o iogurte natural gelado.",
      "Adicione a aveia em flocos e misture levemente.",
      "Finalize com as frutas picadas por cima e um fio de mel se desejar."
    ]
  },
  {
    id: "rec-4",
    name: "Sopa de legumes com omelete leve",
    category: "Jantar",
    kcal: 450,
    protein: "28g",
    carbs: "36g",
    fat: "19g",
    prepTime: "20 min",
    description: "Jantar reconfortante, de fácil digestão noturna e rico em micronutrientes para recuperação do sono.",
    ingredients: [
      "1 concha grande de caldo de legumes naturais (abóbora, chuchu, cenoura e batata)",
      "2 ovos inteiros",
      "1 colher de sopa de queijo cottage ou minas frescal picado",
      "Cheiro-verde, cúrcuma e sal a gosto"
    ],
    steps: [
      "Cozinhe os legumes picados em água com alho, cebola e cúrcuma até ficarem macios; bata metade no liquidificador para dar cremosidade.",
      "Em paralelo, bata os 2 ovos com cheiro-verde e o queijo picado.",
      "Doure a omelete em frigideira antiaderente por 2 minutos de cada lado.",
      "Sirva a sopa bem quente acompanhada da omelete dobrada."
    ]
  },
  {
    id: "rec-5",
    name: "Crepioca proteica de frango desfiado",
    category: "Lanche",
    kcal: 340,
    protein: "29g",
    carbs: "31g",
    fat: "10g",
    prepTime: "10 min",
    description: "Opção prática sem glúten, excelente como pré ou pós-treino com alta densidade proteica.",
    ingredients: [
      "1 ovo inteiro",
      "2 colheres de sopa de goma de tapioca hidratada",
      "60g de frango cozido e desfiado temperado",
      "1 colher de sopa de requeijão light ou ricota cremosa"
    ],
    steps: [
      "Misture bem o ovo e a goma de tapioca com um garfo até formar uma massa homogênea.",
      "Despeje em uma frigideira quente antiaderente e deixe firmar por 1 minuto.",
      "Vire a massa, adicione o frango desfiado misturado com a ricota em uma das metades.",
      "Dobre ao meio, espere dourar por mais 30 segundos e sirva."
    ]
  },
  {
    id: "rec-6",
    name: "Salmão ou Tilápia assada com batata-doce",
    category: "Jantar",
    kcal: 520,
    protein: "42g",
    carbs: "45g",
    fat: "18g",
    prepTime: "30 min",
    description: "Refeição anti-inflamatória rica em ômega-3 e carboidratos complexos de baixo índice glicêmico.",
    ingredients: [
      "160g de filé de tilápia ou salmão",
      "150g de batata-doce em rodelas",
      "Brócolis cozido no vapor",
      "Azeite, alecrim, limão e sal"
    ],
    steps: [
      "Pré-aqueça o forno ou AirFryer a 200°C.",
      "Tempere o peixe com limão, sal, alho e alecrim.",
      "Disponha o peixe e as rodelas de batata-doce regadas com azeite.",
      "Asse por 18 a 22 minutos até dourar e sirva com brócolis no vapor."
    ]
  },
  {
    id: "rec-7",
    name: "Panqueca de banana com aveia e canela",
    category: "Café da manhã",
    kcal: 310,
    protein: "14g",
    carbs: "46g",
    fat: "8g",
    prepTime: "10 min",
    description: "Doce natural sem açúcar refinado, ideal para dias em que você quer energia rápida pela manhã.",
    ingredients: [
      "1 banana madura amassada",
      "1 ovo",
      "2 colheres de sopa de farinha de aveia",
      "Canela em pó a gosto"
    ],
    steps: [
      "Amasse bem a banana em um prato fundo.",
      "Adicione o ovo, a aveia e a canela, misturando até ficar uniforme.",
      "Cozinhe pequenas porções em frigideira antiaderente untada em fogo baixo por 2 minutos de cada lado."
    ]
  },
  {
    id: "rec-8",
    name: "Bowl de carne moída magra, abóbora e arroz",
    category: "Almoço",
    kcal: 590,
    protein: "44g",
    carbs: "60g",
    fat: "17g",
    prepTime: "25 min",
    description: "Refeição prática para marmitas da semana, com excelente equilíbrio de ferro, zinco e fibras.",
    ingredients: [
      "140g de patinho moído refogado",
      "100g de abóbora cabotiá assada em cubos",
      "3 colheres de sopa de arroz",
      "Couve refogada no alho"
    ],
    steps: [
      "Refogue o patinho moído com cebola, alho, tomate picado e cominho até secar bem.",
      "Asse a abóbora em cubos com sal e orégano por 20 minutos.",
      "Monte o bowl com o arroz na base, a carne moída, a abóbora e a couve fatiada."
    ]
  }
];

const GUIDES_DB = [
  {
    id: "guide-1",
    title: "Alongamento Matinal Completo (5 minutos)",
    category: "Alongamento",
    durationSeconds: 300,
    durationLabel: "5 min",
    target: "Coluna, pescoço, ombros e posterior de coxa",
    summary: "Sequência rápida para destravar as articulações logo ao acordar e ativar a circulação.",
    steps: [
      "<strong>1. Inclinação Cervical (45s):</strong> Sentado ou em pé com a coluna reta, leve a orelha direita em direção ao ombro direito suavemente sem puxar com força. Troque o lado na metade do tempo.",
      "<strong>2. Espreguiçamento Vertical + Lateral (45s):</strong> Entrelace os dedos acima da cabeça, estenda os braços para o teto inspirando fundo e incline o tronco levemente para cada lado.",
      "<strong>3. Gato e Vaca na Cadeira ou Tapete (60s):</strong> Com as mãos apoiadas nos joelhos (ou em 4 apoios), inspire abrindo o peito e olhando para frente; expire arredondando as costas e levando o queixo ao peito.",
      "<strong>4. Alongamento de Posterior de Coxa (60s):</strong> Em pé, estenda uma perna à frente apoiando o calcanhar no chão com a ponta do pé para cima. Flexione levemente o joelho de apoio e incline o tronco reto até sentir alongar atrás da coxa. Troque a perna.",
      "<strong>5. Rotação Torácica (60s):</strong> Sentado, gire o tronco para a direita apoiando a mão esquerda no joelho direito. Respire fundo por 30s e repita para o outro lado."
    ],
    tips: "Nunca force até sentir dor aguda. O alongamento deve gerar apenas uma tensão confortável e acompanhada de respiração lenta."
  },
  {
    id: "guide-2",
    title: "Pausa Ativa para Quem Trabalha Sentado",
    category: "Postura",
    durationSeconds: 180,
    durationLabel: "3 min",
    target: "Lombar, flexores do quadril e punhos",
    summary: "Ideal para fazer a cada 2 blocos de foco ou após longas horas no computador.",
    steps: [
      "<strong>1. Alongamento de Punhos e Antebraços (40s):</strong> Estenda o braço direito à frente com a palma para cima e puxe os dedos suavemente para baixo com a outra mão. Inverta o lado.",
      "<strong>2. Abertura Peitoral na Porta ou Cadeira (45s):</strong> Leve os braços para trás das costas, entrelace os dedos e puxe os ombros para baixo e para trás, abrindo o peito.",
      "<strong>3. Alongamento de Flexor do Quadril - Afundo Baixo (50s):</strong> Dê um passo largo à frente, mantendo a perna de trás estendida e o quadril encaixado para frente para aliviar a tensão da lombar.",
      "<strong>4. Descompressão Lombar (45s):</strong> Em pé, deixe o tronco pender à frente com os joelhos semiflexionados e segure os cotovelos opostos, balançando suavemente."
    ],
    tips: "Mantenha os ombros longe das orelhas durante toda a execução."
  },
  {
    id: "guide-3",
    title: "Alongamento Posterior e Quadril Pós-Treino",
    category: "Alongamento",
    durationSeconds: 360,
    durationLabel: "6 min",
    target: "Glúteos, isquiotibiais, panturrilha e lombar",
    summary: "Reduz a rigidez muscular após caminhadas, corridas ou treinos de força.",
    steps: [
      "<strong>1. Figura 4 (Alongamento de Glúteo) (90s):</strong> Deitado de costas, cruze o tornozelo direito sobre o joelho esquerdo e puxe a coxa esquerda em direção ao peito. 45s cada lado.",
      "<strong>2. Borboleta Sentado (60s):</strong> Sente-se, una as solas dos pés e deixe os joelhos caírem naturalmente para os lados mantendo a coluna alongada.",
      "<strong>3. Panturrilha na Parede (60s):</strong> Apoie as mãos na parede, leve um pé para trás com o calcanhar firme no chão e flexione o joelho da frente. 30s cada perna.",
      "<strong>4. Postura da Criança / Child's Pose (90s):</strong> Ajoelhado, sente sobre os calcanhares e estenda os braços à frente no chão, descansando a testa e respirando profundamente."
    ],
    tips: "Aproveite a expiração para relaxar ainda mais a musculatura."
  },
  {
    id: "guide-4",
    title: "Respiração 4-7-8 para Desacelerar Antes de Dormir",
    category: "Respiração",
    durationSeconds: 240,
    durationLabel: "4 min",
    target: "Sistema nervoso e qualidade do sono",
    summary: "Técnica respiratória comprovada para reduzir a frequência cardíaca antes de deitar.",
    steps: [
      "<strong>1. Posição Confortável:</strong> Deite-se ou sente-se com as costas apoiadas e relaxe a mandíbula.",
      "<strong>2. Inspire pelo nariz por 4 segundos:</strong> Encha o abdômen de ar silenciosamente.",
      "<strong>3. Segure o ar por 7 segundos:</strong> Mantenha os ombros relaxados sem tensionar o pescoço.",
      "<strong>4. Expire pela boca por 8 segundos:</strong> Solte o ar devagar fazendo um leve som de sopro.",
      "<strong>5. Repita por 4 a 6 ciclos completos.</strong>"
    ],
    tips: "Se 7 segundos segurando parecer muito no início, comece com o ritmo 3-5-6 e evolua aos poucos."
  }
];
