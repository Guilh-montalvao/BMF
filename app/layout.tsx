import type { Metadata } from "next";
import { StoreProvider } from "@/components/store";
import { Header, Footer, Cart } from "@/components/shell";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "BMF Bombas — Especialistas em Bombas, Poços e Motores em Brasília",
    template: "%s | BMF Bombas",
  },
  description:
    "Mais de 17 anos no DF. Manutenção de bombas d’água, poços artesianos, rebobinamento de motores elétricos e quadros de comando com oficina própria em Samambaia.",
  metadataBase: new URL("https://bmf-bombas-motores.mateusmrm.chatgpt.site"),
  icons: { icon: "/images/logo.webp" },
  openGraph: {
    title: "BMF Bombas — Especialistas em Bombas, Poços e Motores em Brasília",
    description:
      "A mesma engenharia e confiabilidade que atende os maiores hospitais e shoppings do Distrito Federal.",
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
