import { loadCatalog } from "@/lib/vasos";
import { StoreClient } from "./store-client";

// Server Component — lê as pastas em build/request time via fs.
// Para adicionar produtos: coloque um .jpg em public/Assets/Vasos/{Categoria}/{Acabamento}/
// Para adicionar especificações: edite public/Assets/Vasos/Especificacoes.txt
export default function Home() {
  const { categories, products } = loadCatalog();

  return <StoreClient categories={categories} products={products} />;
}
