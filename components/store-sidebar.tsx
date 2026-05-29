"use client";

import { Category } from "@/config/products";
import clsx from "clsx";

interface StoreSidebarProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
  productCounts: Record<string, number>;
}

export function StoreSidebar({
  categories,
  selected,
  onSelect,
  productCounts,
}: StoreSidebarProps) {
  return (
    <aside className="w-60 shrink-0">
      <div
        className="sticky top-20 rounded-2xl shadow-md overflow-hidden border"
        style={{
          borderColor: "var(--color-store-beige-200)",
          backgroundColor: "white",
        }}
      >
        {/* Cabeçalho da sidebar */}
        <div
          className="px-5 py-4"
          style={{ backgroundColor: "var(--color-store-green)" }}
        >
          <h2 className="text-white font-bold text-base">Categorias</h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-store-green-light)" }}>
            Encontre o vaso ideal
          </p>
        </div>

        {/* Lista de categorias */}
        <nav className="p-2 flex flex-col gap-0.5">
          {categories.map((cat) => {
            const isSelected = selected === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={clsx(
                  "flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-left",
                  "transition-all duration-200 cursor-pointer text-sm font-medium",
                  isSelected
                    ? "text-white shadow-sm"
                    : "text-gray-700 hover:bg-[--color-store-beige-100]"
                )}
                style={
                  isSelected
                    ? { backgroundColor: "var(--color-store-green)" }
                    : undefined
                }
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                </span>

                {/* Contador */}
                <span
                  className={clsx(
                    "text-xs rounded-full px-2 py-0.5 font-semibold min-w-[24px] text-center"
                  )}
                  style={
                    isSelected
                      ? { backgroundColor: "rgba(255,255,255,0.22)", color: "white" }
                      : {
                          backgroundColor: "var(--color-store-beige-200)",
                          color: "var(--color-store-beige-dark)",
                        }
                  }
                >
                  {productCounts[cat.id] ?? 0}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Rodapé da sidebar */}
        <div
          className="mx-3 mb-3 mt-1 rounded-xl px-3 py-3 text-xs text-center"
          style={{
            backgroundColor: "var(--color-store-beige-100)",
            color: "var(--color-store-beige-dark)",
          }}
        >
          <p className="font-medium">Precisa de ajuda?</p>
          <p className="mt-0.5">Entre em contato pelo WhatsApp</p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-semibold underline underline-offset-2"
            style={{ color: "var(--color-store-green)" }}
          >
            💬 Chamar no WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}
