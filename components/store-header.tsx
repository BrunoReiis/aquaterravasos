import Image from "next/image";

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[--color-store-beige-200] bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo + Nome */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/Assets/Logo.png"
            alt="Logo AquaTerra"
            width={36}
            height={36}
            className="rounded-xl object-contain"
            style={{ width: "auto", height: "auto" }}
            priority
          />
          <div className="leading-tight">
            <h1
              className="font-bold text-base md:text-lg tracking-tight"
              style={{ color: "var(--color-store-green)" }}
            >
              AquaTerra
            </h1>
            <p className="text-xs text-gray-400">Vasos &amp; Decoração</p>
          </div>
        </div>

        {/* Tagline central — só desktop */}
        <p className="hidden lg:block text-sm text-gray-500 italic truncate">
          &ldquo;Natureza que decora, beleza que transforma&rdquo;
        </p>

        {/* Contato rápido */}
        <div className="flex items-center gap-2 text-sm shrink-0">
          <a
            href="tel:+5511981373932"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "var(--color-store-beige-100)",
              color: "var(--color-store-green-dark)",
            }}
          >
            📞 (11) 98137-3932
          </a>
          <a
            href="https://wa.me/5511981373932"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: "var(--color-store-green)" }}
          >
            💬 <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
