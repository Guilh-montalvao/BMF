import type { Metadata } from "next";
import { StoreProvider } from "@/components/store";
import { Header, Footer, Cart } from "@/components/shell";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "BMF — Loja e oficina em Samambaia", template: "%s | BMF" },
  description:
    "Bombas, motores e ferramentas no Distrito Federal. Manutenção, rebobinamento, venda de equipamentos e coleta e entrega com a BMF.",
  metadataBase: new URL("https://bmf-bombas-motores.mateusmrm.chatgpt.site"),
  icons: { icon: "/images/logo.webp" },
  openGraph: {
    title: "BMF — Loja e oficina em Samambaia",
    description:
      "Bombas, motores e ferramentas. Da escolha do equipamento à manutenção.",
    images: ["/images/shop-banner.webp"],
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <StoreProvider>
          <Header />
          <div className="site-content">
            {children}
            <Footer />
          </div>
          <Cart />
        </StoreProvider>
      </body>
    </html>
  );
}
