import fs from "fs";
import path from "path";

import type { Category, Product } from "@/config/products";
import { SPECS } from "@/config/specs";

// ---------------------------------------------------------------------------
// Helper — busca tamanhos no SPECS centralizado
// ---------------------------------------------------------------------------
function getSpecs(name: string): { tamanhos: string[] } {
  return SPECS[name] ?? { tamanhos: [] };
}

// ---------------------------------------------------------------------------
// Metadados fixos por categoria/acabamento
// Adicione novas entradas aqui quando criar novas pastas
// ---------------------------------------------------------------------------
// type: "produto-cor"    → subpastas = produtos, arquivos = cores  (ex: Cimento, Linha Home)
// type: "acabamento-produto" → subpastas = acabamentos, arquivos = produtos (ex: Nacionais)
const CATEGORY_META: Record<
  string,
  { icon: string; description: string; origem: string; material: string; uso: string; type?: string }
> = {
  nacionais: {
    icon: "🇧🇷",
    description: "Modelos nacionais com acabamentos exclusivos",
    origem: "Brasil",
    material: "Cerâmica",
    uso: "Sala, varanda e jardim",
    type: "acabamento-produto",
  },
  cimenticio: {
    icon: "🪨",
    description: "Modelos em cimentício com variações de cor",
    origem: "Brasil",
    material: "Cimentício",
    uso: "Sala, varanda e jardim",
    type: "produto-cor",
  },
  "linha home": {
    icon: "🏠",
    description: "Linha decorativa para ambientes internos",
    origem: "Brasil",
    material: "Cerâmica",
    uso: "Sala, quarto e varanda",
    type: "produto-cor",
  },
  importados: {
    icon: "🌍",
    description: "Peças exclusivas de todo o mundo",
    origem: "Importado",
    material: "Porcelana / Cerâmica premium",
    uso: "Decoração interna",
    type: "produto-cor",
  },
};

const ACABAMENTO_META: Record<string, { icon: string; description: string }> = {
  areia:    { icon: "🏜️", description: "Acabamento em tom areia" },
  bronze:   { icon: "🥉", description: "Acabamento bronze" },
  offwhite: { icon: "🤍", description: "Acabamento offwhite" },
  preto:    { icon: "🖤", description: "Acabamento preto fosco" },
  branco:   { icon: "🤍", description: "Acabamento branco" },
  italia:   { icon: "🇮🇹", description: "Modelo Itália" },
  paris:    { icon: "🗼", description: "Modelo Paris" },
  roma:     { icon: "🏛️", description: "Modelo Roma" },
};

const FALLBACK_META = {
  icon:     "📦",
  description: "",
  origem:   "Nacional",
  material: "Cerâmica",
  uso:      "Decoração",
};

// ---------------------------------------------------------------------------
// loadCatalog — lê a pasta public/Assets/Vasos/ recursivamente:
//   Vasos/{Categoria}/{Acabamento}/{NomeVaso}.jpg
// Adicionar uma nova pasta = nova categoria/acabamento reconhecida automaticamente.
// ---------------------------------------------------------------------------
export function loadCatalog(): { categories: Category[]; products: Product[] } {
  const vasosDir = path.join(process.cwd(), "public", "Assets", "Vasos");

  const categories: Category[] = [
    { id: "todos", label: "Todos os Produtos", icon: "🏺", description: "Veja toda a nossa coleção" },
  ];
  const addedIds = new Set<string>(["todos"]);

  const products: Product[] = [];
  let nextId = 1;

  // Lê pastas de primeiro nível (ex: "Nacionais", "Importados")
  let mainFolders: string[] = [];
  try {
    mainFolders = fs
      .readdirSync(vasosDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();
  } catch {
    return { categories, products };
  }

  for (const mainFolder of mainFolders) {
    const mainId = mainFolder.toLowerCase();
    const mainMeta = CATEGORY_META[mainId] ?? { ...FALLBACK_META, description: mainFolder };
    const mainPath = path.join(vasosDir, mainFolder);

    // Detecta se esta pasta tem imagens diretas (estrutura {Produto}/{Cor}.jpg)
    // em vez de sub-subpastas (estrutura {Categoria}/{Acabamento}/{Produto}.jpg)
    let subEntries: import("fs").Dirent[] = [];
    try {
      subEntries = fs.readdirSync(mainPath, { withFileTypes: true });
    } catch {
      continue;
    }

    const subFolderEntries = subEntries.filter((e) => e.isDirectory());

    // Usa o campo "type" do CATEGORY_META para decidir a estrutura.
    // Fallback: "produto-cor" para pastas desconhecidas.
    const categoryType = mainMeta.type ?? "produto-cor";

    if (categoryType === "produto-cor") {
      // Estrutura: Vasos/{NomeVaso}/{Cor}.jpg
      // mainFolder → categoria, subFolder → produto, arquivos → variantes de cor
      if (!addedIds.has(mainId)) {
        categories.push({
          id: mainId,
          label: mainFolder,
          icon: mainMeta.icon,
          description: mainMeta.description,
        });
        addedIds.add(mainId);
      }

      for (const subDirEntry of subFolderEntries) {
        const productName = subDirEntry.name;
        const productId = productName.toLowerCase();
        const productSpecs = getSpecs(productName);
        const subPath = path.join(mainPath, productName);

        let imageFiles: string[] = [];
        try {
          imageFiles = fs
            .readdirSync(subPath, { withFileTypes: true })
            .filter((e) => e.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(e.name))
            .map((e) => e.name)
            .sort();
        } catch {
          continue;
        }

        for (const imageFile of imageFiles) {
          const colorName = imageFile.replace(/\.(jpg|jpeg|png|webp)$/i, "");
          const colorId = colorName.toLowerCase();

          products.push({
            id: nextId++,
            name: productName,
            description: `Vaso ${productName} na cor ${colorName}.`,
            category: mainId,
            acabamentoId: colorId,
            acabamentoLabel: colorName,
            image: `/Assets/Vasos/${mainFolder}/${productName}/${imageFile}`,
            specs: {
              tamanhos: productSpecs?.tamanhos ?? [],
              origem: mainMeta.origem,
              material: mainMeta.material,
              uso: mainMeta.uso,
            },
            filters: [mainId, productId],
          });
        }
      }
    } else {
      // Estrutura: Vasos/{Categoria}/{Acabamento}/{Nome}.jpg  (acabamento-produto)
      if (!addedIds.has(mainId)) {
        categories.push({
          id: mainId,
          label: mainFolder,
          icon: mainMeta.icon,
          description: mainMeta.description,
        });
        addedIds.add(mainId);
      }

      for (const subFolder of subFolderEntries.map((e) => e.name).sort()) {
        const subId = subFolder.toLowerCase();
        const subMeta = ACABAMENTO_META[subId] ?? { icon: "🎨", description: subFolder };

        if (!addedIds.has(subId)) {
          categories.push({
            id: subId,
            label: subFolder,
            icon: subMeta.icon,
            description: subMeta.description,
          });
          addedIds.add(subId);
        }

        const subPath = path.join(mainPath, subFolder);
        let imageFiles: string[] = [];
        try {
          imageFiles = fs
            .readdirSync(subPath, { withFileTypes: true })
            .filter((e) => e.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(e.name))
            .map((e) => e.name)
            .sort();
        } catch {
          continue;
        }

        for (const imageFile of imageFiles) {
          const productName = imageFile.replace(/\.(jpg|jpeg|png|webp)$/i, "");
          // Para modelos como Linha Home, o spec é indexado pelo subFolder (ex: "Paris")
          const productSpecs = SPECS[productName] ?? SPECS[subFolder] ?? { tamanhos: [] };

          products.push({
            id: nextId++,
            name: productName,
            description: `Vaso ${productName} ${mainFolder} no acabamento ${subFolder}.`,
            category: mainId,
            acabamentoId: subId,
            acabamentoLabel: subFolder,
            image: `/Assets/Vasos/${mainFolder}/${subFolder}/${imageFile}`,
            specs: {
              tamanhos: productSpecs?.tamanhos ?? [],
              origem: mainMeta.origem,
              material: mainMeta.material,
              uso: mainMeta.uso,
            },
            filters: [mainId, subId],
          });
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Fontes — pasta plana: public/Assets/Fontes/{Nome}.jpg
  // ---------------------------------------------------------------------------
  const fontesDir = path.join(process.cwd(), "public", "Assets", "Fontes");

  if (!addedIds.has("fontes")) {
    categories.push({ id: "fontes", label: "Fontes", icon: "⛲", description: "Fontes decorativas para ambientes internos e externos" });
    addedIds.add("fontes");
  }

  try {
    const fonteFiles = fs
      .readdirSync(fontesDir, { withFileTypes: true })
      .filter((e) => e.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(e.name))
      .map((e) => e.name)
      .sort();

    for (const imageFile of fonteFiles) {
      const productName = imageFile.replace(/\.(jpg|jpeg|png|webp)$/i, "");
      const productSpecs = getSpecs(productName);

      products.push({
        id: nextId++,
        name: productName,
        description: `${productName} — fonte decorativa.`,
        category: "fontes",
        acabamentoId: "fontes",
        acabamentoLabel: "Fonte",
        image: `/Assets/Fontes/${imageFile}`,
        specs: {
          tamanhos: productSpecs?.tamanhos ?? [],
          origem: "Brasil",
          material: "Cerâmica / Resina",
          uso: "Interno e externo",
        },
        filters: ["fontes"],
      });
    }
  } catch {
    // pasta não existe ainda — ignora
  }

  // ---------------------------------------------------------------------------
  // Acessórios — pasta plana: public/Assets/Acessorios/{Nome}.jpg
  // ---------------------------------------------------------------------------
  const acessoriosDir = path.join(process.cwd(), "public", "Assets", "Acessorios");

  if (!addedIds.has("acessorios")) {
    categories.push({ id: "acessorios", label: "Acessórios", icon: "🪴", description: "Suportes, pratos e acessórios para vasos" });
    addedIds.add("acessorios");
  }

  try {
    const acessorioFiles = fs
      .readdirSync(acessoriosDir, { withFileTypes: true })
      .filter((e) => e.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(e.name))
      .map((e) => e.name)
      .sort();

    for (const imageFile of acessorioFiles) {
      const productName = imageFile.replace(/\.(jpg|jpeg|png|webp)$/i, "");

      products.push({
        id: nextId++,
        name: productName,
        description: `${productName} — acessório para vasos.`,
        category: "acessorios",
        acabamentoId: "acessorios",
        acabamentoLabel: "Acessório",
        image: `/Assets/Acessorios/${imageFile}`,
        specs: {
          tamanhos: [],
          origem: "Brasil",
          material: "Variado",
          uso: "Decoração e proteção",
        },
        filters: ["acessorios"],
      });
    }
  } catch {
    // pasta não existe ainda — ignora
  }

  return { categories, products };
}
