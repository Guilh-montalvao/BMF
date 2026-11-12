import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@/components/glyphs";
import { whatsapp } from "@/lib/data";
import { ButtonLink, Eyebrow, Reveal } from "@/components/ui";
import ServiceRequest from "@/components/service-request";
import ServicesTabs from "@/components/services-tabs";

export const metadata: Metadata = {
  title: "Contratos e Serviços de Manutenção | BMF Bombas",
};

export default function Page() {
  return (
    <main id="conteudo" className="services-page">
      <div className="subpage-top-nav">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Voltar ao início</span>
        </Link>
      </div>
      <section className="service-page-heading">
        <div>
          <Eyebrow>
            Contratos Preventivos & Corretivos · Oficina Própria · 17+ Anos no DF
          </Eyebrow>
          <h1>
            Contratos de Manutenção,
            <br />
            Motores, Bombas e Ferramentas.
          </h1>
          <p>
            Atuamos com contratos de manutenção preventiva e corretiva, visitas técnicas in loco e reparos especializados em nossa oficina própria em Samambaia. A mesma engenharia que mantém grandes hospitais, shoppings e órgãos públicos funcionando sem parar.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <ButtonLink href="#especialidades">
              Explorar sub-abas de serviço
            </ButtonLink>
            <ButtonLink
              href={whatsapp(
                "Olá! Gostaria de agendar uma visita técnica ou solicitar proposta de Contrato de Manutenção com a BMF.",
              )}
              secondary
            >
              Agendar visita técnica
            </ButtonLink>
          </div>
        </div>
        <img
          src="/images/maintenance.webp"
          alt="Bancada de manutenção eletromecânica da BMF Bombas"
        />
      </section>

      {/* Sistema de Sub-abas Interativas + Comparativo Preventiva/Corretiva/Contrato */}
      <ServicesTabs />

      <section className="service-request" id="solicitar">
        <Reveal>
          <Eyebrow>Proposta de Contrato, Visita Técnica ou Orçamento</Eyebrow>
          <h2>
            Como podemos atender
            <br />a sua operação hoje?
          </h2>
          <p>
            Solicite uma visita técnica para avaliarmos o seu problema no local, peça uma proposta de contrato preventivo/corretivo ou descreva o equipamento que precisa de reparo.
          </p>
          <ButtonLink href="/#coleta" secondary className="request-coleta-link">
            Ver como funciona a Visita e Coleta no DF
          </ButtonLink>
        </Reveal>
        <ServiceRequest />
      </section>
    </main>
  );
}
