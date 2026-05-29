import { Card, Button, Chip, Modal } from "@heroui/react";
import { Product } from "@/config/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = `R$ ${product.price.toFixed(2).replace(".", ",")}`;
  const categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const whatsappMessage = `Ola! Tenho interesse no ${product.name} (${formattedPrice}).`;
  const whatsappUrl = `https://wa.me/5511981373932?text=${encodeURIComponent(whatsappMessage)}`;

  const specMap: Record<
    string,
    { tamanho: string; origem: string; material: string; uso: string }
  > = {
    importados: {
      tamanho: "M (32cm altura)",
      origem: "Importado",
      material: "Porcelana/Cerâmica premium",
      uso: "Decoração interna",
    },
    nacionais: {
      tamanho: "M (28cm altura)",
      origem: "Brasil",
      material: "Cerâmica artesanal",
      uso: "Sala e varanda",
    },
    ceramica: {
      tamanho: "P/M (22cm altura)",
      origem: "Brasil",
      material: "Cerâmica esmaltada",
      uso: "Suculentas e folhagens",
    },
    vidro: {
      tamanho: "P/M (24cm altura)",
      origem: "Importado",
      material: "Vidro soprado",
      uso: "Hidroponia e arranjos",
    },
    suspensos: {
      tamanho: "M (26cm altura)",
      origem: "Brasil",
      material: "Fibra natural + cerâmica",
      uso: "Jardins verticais",
    },
    jardim: {
      tamanho: "G (40cm altura)",
      origem: "Brasil",
      material: "Polietileno/Fibra de cimento",
      uso: "Ambiente externo",
    },
    decorativos: {
      tamanho: "M/G (35cm altura)",
      origem: "Importado",
      material: "Resina/Concreto/Metal",
      uso: "Ambientes sofisticados",
    },
  };

  const specs =
    specMap[product.category] ?? {
      tamanho: "Médio",
      origem: "Nacional",
      material: "Cerâmica",
      uso: "Decoração",
    };

  return (
    <Card
      className="group border hover:shadow-lg transition-all duration-300 bg-white"
      style={{ borderColor: "var(--color-store-beige-200)" }}
    >
      {/* Imagem / Thumbnail */}
      <div
        className={`relative w-full h-44 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden rounded-t-xl`}
      >
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none">
          {product.emoji}
        </span>

        {/* Tag de destaque */}
        {product.tag && (
          <div className="absolute top-3 right-3">
            <Chip
              size="sm"
              className="text-white font-semibold shadow-sm"
              style={{ backgroundColor: "var(--color-store-green)" }}
            >
              {product.tag}
            </Chip>
          </div>
        )}
      </div>

      <div className="px-4 pt-3 pb-2">
        <h3 className="font-bold text-gray-800 text-sm leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1.5 leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="px-4 pb-4 pt-2 flex flex-col gap-3">
        <span
          className="font-bold text-xl whitespace-nowrap"
          style={{ color: "var(--color-store-green)" }}
        >
          {formattedPrice}
        </span>

        <div className="flex gap-2">
          <Modal>
            <Modal.Trigger>
              <Button
                size="sm"
                variant="flat"
                className="text-xs flex-1"
                style={{
                  backgroundColor: "var(--color-store-beige-100)",
                  color: "var(--color-store-green-dark)",
                }}
              >
                Detalhes
              </Button>
            </Modal.Trigger>

            <Modal.Backdrop>
              <Modal.Container size="md" placement="center">
                <Modal.Dialog>
                  <Modal.Header className="flex items-center justify-between gap-3">
                    <div>
                      <Modal.Heading className="text-base font-bold text-gray-800">
                        {product.name}
                      </Modal.Heading>
                      <p className="text-xs text-gray-500 mt-1">Categoria: {categoryName}</p>
                    </div>
                    <span className="text-3xl" aria-hidden>
                      {product.emoji}
                    </span>
                  </Modal.Header>

                  <Modal.Body className="space-y-3 text-sm text-gray-700">
                    <p>{product.description}</p>

                    {product.tag && (
                      <Chip
                        size="sm"
                        className="text-white font-semibold"
                        style={{ backgroundColor: "var(--color-store-green)" }}
                      >
                        {product.tag}
                      </Chip>
                    )}

                    <div className="rounded-lg px-3 py-2" style={{ backgroundColor: "var(--color-store-beige-100)" }}>
                      <p className="text-xs text-gray-500">Preço</p>
                      <p className="text-lg font-bold" style={{ color: "var(--color-store-green)" }}>
                        {formattedPrice}
                      </p>
                    </div>

                    <div className="rounded-lg border border-[--color-store-beige-200] p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                        Especificacoes
                      </p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-sm">
                        <p className="text-gray-500">Tamanho</p>
                        <p className="font-medium text-gray-800 text-right">{specs.tamanho}</p>

                        <p className="text-gray-500">Origem</p>
                        <p className="font-medium text-gray-800 text-right">{specs.origem}</p>

                        <p className="text-gray-500">Material</p>
                        <p className="font-medium text-gray-800 text-right">{specs.material}</p>

                        <p className="text-gray-500">Uso ideal</p>
                        <p className="font-medium text-gray-800 text-right">{specs.uso}</p>
                      </div>
                    </div>
                  </Modal.Body>

                  <Modal.Footer className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                    <Modal.CloseTrigger className="static w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">
                      <span aria-hidden>✕</span>
                      Fechar detalhes
                    </Modal.CloseTrigger>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        size="sm"
                        className="text-xs text-white w-full sm:w-auto"
                        style={{ backgroundColor: "var(--color-store-green)" }}
                      >
                        Comprar no WhatsApp
                      </Button>
                    </a>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              size="sm"
              className="text-xs text-white w-full"
              style={{ backgroundColor: "var(--color-store-green)" }}
            >
              Comprar
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}
