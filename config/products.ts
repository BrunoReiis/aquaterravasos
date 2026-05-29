export type Category = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  tag?: string;
  gradient: string;
};

export const categories: Category[] = [
  {
    id: "todos",
    label: "Todos os Vasos",
    icon: "🏪",
    description: "Veja toda a nossa coleção",
  },
  {
    id: "importados",
    label: "Vasos Importados",
    icon: "🌍",
    description: "Peças exclusivas de todo o mundo",
  },
  {
    id: "nacionais",
    label: "Vasos Nacionais",
    icon: "🇧🇷",
    description: "Artesanato brasileiro de qualidade",
  },
  {
    id: "ceramica",
    label: "Vasos de Cerâmica",
    icon: "🏺",
    description: "Clássicos em cerâmica artesanal",
  },
  {
    id: "vidro",
    label: "Vasos de Vidro",
    icon: "🔮",
    description: "Elegância e transparência",
  },
  {
    id: "suspensos",
    label: "Vasos Suspensos",
    icon: "🪴",
    description: "Decoração vertical e moderna",
  },
  {
    id: "jardim",
    label: "Vasos de Jardim",
    icon: "🌿",
    description: "Robustos para ambientes externos",
  },
  {
    id: "decorativos",
    label: "Vasos Decorativos",
    icon: "✨",
    description: "Design e sofisticação",
  },
];

export const products: Product[] = [
  // Importados
  {
    id: 1,
    name: "Vaso Ming Dynasty",
    description: "Porcelana chinesa com detalhes pintados à mão, peça única de coleção",
    price: 489.9,
    category: "importados",
    emoji: "🏺",
    tag: "Exclusivo",
    gradient: "from-amber-50 to-orange-100",
  },
  {
    id: 2,
    name: "Vaso Japonês Zen",
    description: "Cerâmica japonesa artesanal com acabamento fosco e linhas minimalistas",
    price: 329.9,
    category: "importados",
    emoji: "🫙",
    gradient: "from-stone-50 to-stone-100",
  },
  {
    id: 3,
    name: "Vaso Mediterrâneo",
    description: "Terracota italiana pintada com motivos mediterrâneos em cores vivas",
    price: 259.9,
    category: "importados",
    emoji: "🌺",
    tag: "Promoção",
    gradient: "from-orange-50 to-red-100",
  },

  // Nacionais
  {
    id: 4,
    name: "Vaso Capixaba",
    description: "Cerâmica artesanal do Espírito Santo com cores tropicais marcantes",
    price: 149.9,
    category: "nacionais",
    emoji: "🌸",
    gradient: "from-pink-50 to-rose-100",
  },
  {
    id: 5,
    name: "Vaso Nordestino",
    description: "Barro vermelho trabalhado à mão por artesãos pernambucanos",
    price: 119.9,
    category: "nacionais",
    emoji: "🏺",
    tag: "Novidade",
    gradient: "from-red-50 to-orange-100",
  },
  {
    id: 6,
    name: "Vaso Gaúcho",
    description: "Cerâmica sulista com desenhos geométricos modernos e cores neutras",
    price: 179.9,
    category: "nacionais",
    emoji: "🫙",
    gradient: "from-slate-50 to-gray-100",
  },

  // Cerâmica
  {
    id: 7,
    name: "Vaso Cerâmica Rústico",
    description: "Acabamento rústico com textura de pedra natural, ideal para suculentas",
    price: 89.9,
    category: "ceramica",
    emoji: "🏺",
    gradient: "from-stone-100 to-amber-100",
  },
  {
    id: 8,
    name: "Vaso Cerâmica Branco",
    description: "Design minimalista em branco puro, combina com qualquer ambiente",
    price: 79.9,
    category: "ceramica",
    emoji: "🫙",
    gradient: "from-gray-50 to-slate-100",
  },
  {
    id: 9,
    name: "Vaso Verde Musgo",
    description: "Esmalte verde musgo com acabamento brilhante e forma arredondada",
    price: 109.9,
    category: "ceramica",
    emoji: "🍃",
    tag: "Popular",
    gradient: "from-green-50 to-emerald-100",
  },

  // Vidro
  {
    id: 10,
    name: "Vaso Vidro Transparente",
    description: "Borossilicato de alta resistência, ideal para hidroponia e aquário",
    price: 69.9,
    category: "vidro",
    emoji: "🔮",
    gradient: "from-blue-50 to-cyan-100",
  },
  {
    id: 11,
    name: "Vaso Vidro Artesanal",
    description: "Vidro soprado artesanalmente em tonalidades verde e azul mescladas",
    price: 139.9,
    category: "vidro",
    emoji: "🫧",
    tag: "Exclusivo",
    gradient: "from-teal-50 to-blue-100",
  },
  {
    id: 12,
    name: "Terrário Geométrico",
    description: "Terrário em vidro com estrutura geométrica e abertura superior ampla",
    price: 199.9,
    category: "vidro",
    emoji: "🔷",
    tag: "Tendência",
    gradient: "from-indigo-50 to-blue-100",
  },

  // Suspensos
  {
    id: 13,
    name: "Vaso Suspenso Macramê",
    description: "Vaso com suporte em macramê artesanal, perfeito para varandas",
    price: 89.9,
    category: "suspensos",
    emoji: "🪴",
    gradient: "from-amber-50 to-yellow-100",
  },
  {
    id: 14,
    name: "Vaso Suspenso Dourado",
    description: "Suporte metálico dourado com vaso de cerâmica incluso",
    price: 159.9,
    category: "suspensos",
    emoji: "🌙",
    tag: "Destaque",
    gradient: "from-yellow-50 to-amber-100",
  },
  {
    id: 15,
    name: "Vaso Suspenso Bambu",
    description: "Bambu natural ecológico com corda de sisal trançada à mão",
    price: 99.9,
    category: "suspensos",
    emoji: "🎋",
    gradient: "from-lime-50 to-green-100",
  },

  // Jardim
  {
    id: 16,
    name: "Vaso de Jardim GG",
    description: "Polietileno resistente a UV, ideal para plantas de grande porte",
    price: 249.9,
    category: "jardim",
    emoji: "🌳",
    gradient: "from-green-50 to-lime-100",
  },
  {
    id: 17,
    name: "Vaso Autoirrigável",
    description: "Sistema de autoirrigação por reservatório interno de 2 litros",
    price: 189.9,
    category: "jardim",
    emoji: "💧",
    tag: "Inovação",
    gradient: "from-cyan-50 to-teal-100",
  },
  {
    id: 18,
    name: "Vaso Fibra de Cimento",
    description: "Fibra de cimento ultra resistente com acabamento envelhecido",
    price: 299.9,
    category: "jardim",
    emoji: "🪨",
    gradient: "from-zinc-50 to-slate-100",
  },

  // Decorativos
  {
    id: 19,
    name: "Vaso Art Déco Dourado",
    description: "Acabamento dourado fosco com detalhes geométricos estilo art déco",
    price: 219.9,
    category: "decorativos",
    emoji: "✨",
    tag: "Exclusivo",
    gradient: "from-yellow-50 to-orange-100",
  },
  {
    id: 20,
    name: "Vaso Marmoreado",
    description: "Efeito mármore em resina com veios dourados e base fosca",
    price: 169.9,
    category: "decorativos",
    emoji: "🌀",
    gradient: "from-neutral-50 to-stone-100",
  },
  {
    id: 21,
    name: "Vaso Escultural Moderno",
    description: "Design escultural minimalista em concreto polido de alta qualidade",
    price: 349.9,
    category: "decorativos",
    emoji: "🗿",
    gradient: "from-gray-100 to-zinc-200",
  },
];
