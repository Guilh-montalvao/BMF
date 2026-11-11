import { Suspense } from "react";
import type { Metadata } from "next";
import Shop from "@/components/shop";
export const metadata: Metadata = { title: "Loja de equipamentos" };
export default function Page() {
  return (
    <Suspense
      fallback={
        <main id="conteudo" className="store-main section-pad">
          Preparando a loja…
        </main>
      }
    >
      <Shop />
    </Suspense>
  );
}
