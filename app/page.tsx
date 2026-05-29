"use client";

import { useState, useMemo } from "react";
import { Chip } from "@heroui/react";

import { StoreSidebar } from "@/components/store-sidebar";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/config/products";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Pré-calcula contagem de produtos por categoria
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: products.length };
    for (const cat of categories) {
      if (cat.id !== "todos") {
        counts[cat.id] = products.filter((p) => p.category === cat.id).length;
      }
    }
    return counts;
  }, []);

  // Filtra produtos pela categoria selecionada
  const filtered = useMemo(
    () =>
      selectedCategory === "todos"
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <>
      {/* Banner hero */}
      <div
        className="w-full rounded-2xl mb-6 px-6 py-8 md:px-8 md:py-10 flex flex-col gap-3 relative overflow-hidden text-center md:text-left items-center md:items-start"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(27,67,50,0.88), rgba(45,106,79,0.72)), url('/Assets/Vasos.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Chip
          size="sm"
          className="w-fit text-white font-semibold"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          ✨ Nova coleção disponível
        </Chip>
        <h2 className="text-white font-bold text-2xl md:text-3xl leading-tight">
          Onde a natureza encontra o requinte
        </h2>
        <p className="text-sm max-w-md" style={{ color: "var(--color-store-green-light)" }}>
          Peças artesanais, importadas e nacionais com entrega para todo o Brasil.
        </p>
      </div>

      {/* Categorias mobile — barra horizontal rolável */}
      <div className="md:hidden mb-5 -mx-6 px-6 overflow-x-auto">
        <div className="flex gap-2 pb-2 w-max">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border"
                style={
                  isSelected
                    ? {
                        backgroundColor: "var(--color-store-green)",
                        color: "white",
                        borderColor: "var(--color-store-green)",
                      }
                    : {
                        backgroundColor: "var(--surface-bg)",
                        color: "var(--color-store-green-dark)",
                        borderColor: "var(--color-store-beige-200)",
                      }
                }
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conteúdo principal: sidebar (desktop) + grid */}
      <div className="flex gap-6 items-start">
        {/* Sidebar — só desktop */}
        <div className="hidden md:block">
          <StoreSidebar
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            productCounts={productCounts}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Cabeçalho da seção */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">{currentCategory?.icon}</span>
            <div>
              <h2 className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>
                {currentCategory?.label}
              </h2>
              <p className="text-sm" style={{ color: "var(--color-store-beige-dark)" }}>
                {filtered.length} produto{filtered.length !== 1 ? "s" : ""}{" "}
                encontrado{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Grid de produtos */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20" style={{ color: "var(--color-store-beige-dark)" }}>
              <span className="text-5xl mb-3">🔍</span>
              <p className="font-medium">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
