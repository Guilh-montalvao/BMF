import type { Metadata } from "next";
import Careers from "@/components/careers";

export const metadata: Metadata = {
  title: "Trabalhe Conosco | BMF Bombas",
  description:
    "Faça parte da equipe técnica da BMF Bombas em Samambaia - DF. Vagas e banco de talentos para rebobinadores, técnicos em motobombas, poços artesianos e ferramentas.",
};

export default function Page() {
  return <Careers />;
}

