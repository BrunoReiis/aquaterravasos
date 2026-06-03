import fs from "fs";
import path from "path";

import type { Category, Product } from "@/config/products";

// ---------------------------------------------------------------------------
// Spec parser — lê Especificacoes.txt e mapeia Nome → tamanhos
// ---------------------------------------------------------------------------
function parseSpecs(): Map<string, { tamanhos: string[] }> {
  const txtPath = path.join(process.cwd(), "public", "Assets", "Vasos", "Especificacoes.txt");
  const specs = new Map<string, { tamanhos: string[] }>();

  if (!fs.existsSync(txtPath)) return specs;

  const lines = fs
    .readFileSync(txtPath, "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("Nome:")) {
      const name = line.slice("Nome:".length).trim();
      const next = lines[i + 1] ?? "";

      if (next.startsWith("Tamanho:")) {
        const raw = next.slice("Tamanho:".length).trim();
        specs.set(name, { tamanhos: raw.split(" e ").map((t) => t.trim()) });
        i++; // pula a linha de tamanho
      }
    }
  }

  return specs;
}

// ---------------------------------------------------------------------------
// Metadados fixos por categoria/acabamento
// Adicione novas entradas aqui quando criar novas pastas
// ---------------------------------------------------------------------------
const CATEGORY_META: Record<
  string,
  { icon: string; description: string; origem: string; material: string; uso: string }
> = {
  nacionais: {
    icon: "🇧🇷",
    description: "Modelos nacionais com acabamentos exclusivos",
    origem: "Brasil",
    material: "Cerâmica",
    uso: "Sala, varanda e jardim",
  },
  importados: {
    icon: "🌍",
    description: "Peças exclusivas de todo o mundo",
    origem: "Importado",
    material: "Porcelana / Cerâmica premium",
    uso: "Decoração interna",
  },
};

const ACABAMENTO_META: Record<string, { icon: string; description: string }> = {
  areia:    { icon: "🏜️", description: "Acabamento em tom areia" },
  bronze:   { icon: "🥉", description: "Acabamento bronze" },
  offwhite: { icon: "🤍", description: "Acabamento offwhite" },
  preto:    { icon: "🖤", description: "Acabamento preto fosco" },
  branco:   { icon: "🤍", description: "Acabamento branco" },
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
  const specs = parseSpecs();

  const categories: Category[] = [
    { id: "todos", label: "Todos os Vasos", icon: "🏺", description: "Veja toda a nossa coleção" },
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

    if (!addedIds.has(mainId)) {
      categories.push({
        id: mainId,
        label: mainFolder,
        icon: mainMeta.icon,
        description: mainMeta.description,
      });
      addedIds.add(mainId);
    }

    // Lê pastas de segundo nível (ex: "Areia", "Bronze", "Offwhite")
    const mainPath = path.join(vasosDir, mainFolder);
    let subFolders: string[] = [];
    try {
      subFolders = fs
        .readdirSync(mainPath, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
        .sort();
    } catch {
      continue;
    }

    for (const subFolder of subFolders) {
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

      // Lê arquivos de imagem dentro do acabamento
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
        const productSpecs = specs.get(productName);

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

  return { categories, products };
}
