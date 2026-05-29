import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import { StoreHeader } from "@/components/store-header";
import { StoreFooter } from "@/components/store-footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "AquaTerra Vasos",
  description: "Os melhores vasos para decorar seu lar e jardim. Peças artesanais, importadas e nacionais.",
  icons: {
    icon: "/Assets/Logo.png",
    shortcut: "/Assets/Logo.png",
    apple: "/Assets/Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
        style={{ backgroundColor: "var(--color-store-beige)" }}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="flex flex-col min-h-screen">
            <StoreHeader />
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6">
              {children}
            </main>
            <StoreFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
