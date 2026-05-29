import Image from "next/image";

export function StoreFooter() {
  return (
    <footer style={{ backgroundColor: "var(--color-store-green-dark)" }} className="text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/Assets/Logo.png"
                alt="Logo AquaTerra"
                width={36}
                height={36}
                className="rounded-lg object-contain"
                style={{ width: "auto", height: "auto" }}
              />
              <div>
                <span className="font-bold text-xl tracking-tight">AquaTerra</span>
                <p className="text-xs" style={{ color: "var(--color-store-green-light)" }}>
                  Vasos &amp; Decoração
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-store-green-light)" }}
            >
              Elegância inspirada nos elementos naturais.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h3
              className="font-bold text-base mb-4"
              style={{ color: "var(--color-store-beige-300)" }}
            >
              Contato
            </h3>
            <ul
              className="flex flex-col gap-2.5 text-sm"
              style={{ color: "var(--color-store-green-light)" }}
            >
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>(11) 96293-5940 / (11) 98137-3932</span>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <a
                  href="https://wa.me/5511981373932"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-white transition-colors"
                >
                  WhatsApp: (11) 98137-3932
                </a>
              </li>
              {/* <li className="flex items-center gap-2">
                <span>📧</span>
                <span>contato@aquaterra.com.br</span>
              </li> */}
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📸</span>
                <span>@aquaterrasaopaulo</span>
              </li>
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h3
              className="font-bold text-base mb-4"
              style={{ color: "var(--color-store-beige-300)" }}
            >
              Horário de Atendimento
            </h3>
            <ul
              className="flex flex-col gap-2.5 text-sm"
              style={{ color: "var(--color-store-green-light)" }}
            >
              <li className="flex items-center justify-between">
                <span>Segunda a Sexta</span>
                <span className="font-medium text-white">9h às 18h</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Sábado</span>
                <span className="font-medium text-white">9h às 14h</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Domingo</span>
                <span
                  className="font-medium"
                  style={{ color: "var(--color-store-beige-300)" }}
                >
                  Fechado
                </span>
              </li>
            </ul>

            <div
              className="mt-5 rounded-xl p-3 text-sm"
              style={{ backgroundColor: "var(--color-store-green)" }}
            >
              <p className="font-semibold text-white">🚚 Enviamos em todo o Brasil</p>
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full opacity-20 bg-white" />

        <p
          className="text-center text-sm"
          style={{ color: "var(--color-store-green-light)" }}
        >
          © {new Date().getFullYear()} AquaTerra Vasos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
