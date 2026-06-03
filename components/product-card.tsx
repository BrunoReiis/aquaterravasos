"use client";

import { useState } from "react";
import { Card, Button, Chip, Modal } from "@heroui/react";
import { Product } from "@/config/products";

interface ProductCardProps {
  products: Product[];
}

export function ProductCard({ products }: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = products[currentIndex];
  const hasVariants = products.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + products.length) % products.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % products.length);
  };

  const categoryName =
    product.acabamentoLabel ||
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  const whatsappMessage = `Olá! Tenho interesse no Vaso ${product.name} — acabamento ${product.acabamentoLabel}.`;
  const whatsappUrl = `https://wa.me/5511981373932?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Card
      className="group border hover:shadow-lg transition-all duration-300"
      style={{
        borderColor: "var(--color-store-beige-200)",
        backgroundColor: "var(--surface-bg)",
      }}
    >
      {/* Imagem */}
      <div className="relative w-full h-56 rounded-t-xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: "var(--color-store-beige-100)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={`Vaso ${product.name} — ${product.acabamentoLabel}`}
          className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />

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

        {/* Badge de acabamento */}
        <div className="absolute bottom-3 left-3">
          <Chip
            size="sm"
            className="font-medium"
            style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "white" }}
          >
            {product.acabamentoLabel}
          </Chip>
        </div>

        {/* Setas de navegação entre variantes */}
        {hasVariants && (
          <>
            <button
              onClick={prev}
              aria-label="Acabamento anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md opacity-75 hover:opacity-100 transition-opacity text-base leading-none"
              style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Próximo acabamento"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md opacity-75 hover:opacity-100 transition-opacity text-base leading-none"
              style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots de acabamento */}
      {hasVariants && (
        <div className="flex items-center justify-center gap-2 pt-2 pb-0.5">
          {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(i)}
              aria-label={p.acabamentoLabel}
              title={p.acabamentoLabel}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor:
                  i === currentIndex
                    ? "var(--color-store-green)"
                    : "var(--color-store-beige-200)",
                transform: i === currentIndex ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}

      <div className="px-4 pt-3 pb-2">
        <h3 className="font-bold text-sm leading-tight" style={{ color: "var(--text-primary)" }}>
          {product.name}
        </h3>
        <p
          className="text-xs mt-1.5 leading-relaxed line-clamp-2"
          style={{ color: "var(--color-store-beige-dark)" }}
        >
          {product.description}
        </p>
      </div>

      <div className="px-4 pb-4 pt-2 flex flex-col gap-3">
        <span
          className="font-bold text-lg italic"
          style={{ color: "var(--color-store-green)" }}
        >
          A Consultar
        </span>

        <div className="flex gap-2">
          <Modal>
            <Modal.Trigger>
              <Button
                size="sm"
                variant="tertiary"
                className="text-xs flex-1 border"
                style={{
                  backgroundColor: "var(--color-store-beige-100)",
                  color: "var(--color-store-green-dark)",
                  borderColor: "var(--color-store-beige-200)",
                }}
              >
                Detalhes
              </Button>
            </Modal.Trigger>

            <Modal.Backdrop>
              <Modal.Container size="md" placement="center">
                <Modal.Dialog
                  className="border"
                  style={{
                    backgroundColor: "var(--surface-bg)",
                    borderColor: "var(--color-store-beige-200)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Modal.Header
                    className="flex items-center justify-between gap-3 border-b"
                    style={{ borderColor: "var(--color-store-beige-200)" }}
                  >
                    <div>
                      <Modal.Heading
                        className="text-base font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {product.name}
                      </Modal.Heading>
                      <p className="text-xs mt-1" style={{ color: "var(--color-store-beige-dark)" }}>
                        Categoria: {categoryName}
                      </p>
                    </div>
                  </Modal.Header>

                  <Modal.Body className="space-y-3 text-sm" style={{ color: "var(--text-primary)" }}>
                    {/* Imagem grande no modal */}
                    <div className="relative w-full h-64 rounded-xl overflow-hidden border flex items-center justify-center" style={{ borderColor: "var(--color-store-beige-200)", backgroundColor: "var(--color-store-beige-100)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={`Vaso ${product.name} — ${product.acabamentoLabel}`}
                        className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-300"
                      />

                      {hasVariants && (
                        <>
                          <button
                            onClick={prev}
                            aria-label="Acabamento anterior"
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md opacity-75 hover:opacity-100 transition-opacity text-lg leading-none"
                            style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                          >
                            ‹
                          </button>
                          <button
                            onClick={next}
                            aria-label="Próximo acabamento"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md opacity-75 hover:opacity-100 transition-opacity text-lg leading-none"
                            style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                          >
                            ›
                          </button>
                          {/* Dots no modal */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                            {products.map((p, i) => (
                              <button
                                key={p.id}
                                onClick={() => setCurrentIndex(i)}
                                aria-label={p.acabamentoLabel}
                                title={p.acabamentoLabel}
                                className="w-2 h-2 rounded-full transition-all duration-200"
                                style={{
                                  backgroundColor:
                                    i === currentIndex
                                      ? "white"
                                      : "rgba(255,255,255,0.45)",
                                  transform: i === currentIndex ? "scale(1.4)" : "scale(1)",
                                }}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

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

                    <div
                      className="rounded-lg px-3 py-2"
                      style={{ backgroundColor: "var(--color-store-beige-100)" }}
                    >
                      <p className="text-xs" style={{ color: "var(--color-store-beige-dark)" }}>
                        Preço
                      </p>
                      <p className="text-lg font-bold italic" style={{ color: "var(--color-store-green)" }}>
                        A Consultar
                      </p>
                    </div>

                    <div className="rounded-lg border border-[--color-store-beige-200] p-3">
                      <p
                        className="text-xs font-semibold uppercase tracking-wide mb-2"
                        style={{ color: "var(--color-store-beige-dark)" }}
                      >
                        Especificações
                      </p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-sm">
                        <p style={{ color: "var(--color-store-beige-dark)" }}>Tamanho(s)</p>
                        <p className="font-medium text-right" style={{ color: "var(--text-primary)" }}>
                          {product.specs.tamanhos.length > 0
                            ? product.specs.tamanhos.join(" / ")
                            : "—"}
                        </p>

                        <p style={{ color: "var(--color-store-beige-dark)" }}>Acabamento</p>
                        <p className="font-medium text-right" style={{ color: "var(--text-primary)" }}>
                          {product.acabamentoLabel}
                        </p>

                        <p style={{ color: "var(--color-store-beige-dark)" }}>Origem</p>
                        <p className="font-medium text-right" style={{ color: "var(--text-primary)" }}>
                          {product.specs.origem}
                        </p>

                        <p style={{ color: "var(--color-store-beige-dark)" }}>Material</p>
                        <p className="font-medium text-right" style={{ color: "var(--text-primary)" }}>
                          {product.specs.material}
                        </p>

                        <p style={{ color: "var(--color-store-beige-dark)" }}>Uso ideal</p>
                        <p className="font-medium text-right" style={{ color: "var(--text-primary)" }}>
                          {product.specs.uso}
                        </p>
                      </div>
                    </div>
                  </Modal.Body>

                  <Modal.Footer
                    className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 border-t"
                    style={{ borderColor: "var(--color-store-beige-200)" }}
                  >
                    <Modal.CloseTrigger
                      className="static w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border transition-colors"
                      style={{
                        color: "var(--text-primary)",
                        borderColor: "var(--color-store-beige-200)",
                        backgroundColor: "var(--color-store-beige-100)",
                      }}
                    >
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
                        Consultar no WhatsApp
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
              Consultar
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}

