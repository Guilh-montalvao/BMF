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
            Não espere o motor queimar ou o abastecimento parar para agir. Estruturamos contratos de manutenção preventiva e corretiva, visitas técnicas in loco e reparos em oficina própria em Samambaia — com a mesma engenharia que mantém os maiores hospitais, shoppings e órgãos federais de Brasília operando sem interrupções.
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
        <div className="service-page-3d-stage">
          <div className="stage-blueprint-rings" aria-hidden="true" />
          <img
            src="/images/elements/contrato-ciclo-motor.webp"
            alt="Ciclo de manutenção preventiva e corretiva de motores e bombas BMF"
            className="showcase-stage-render"
          />
        </div>
      </section>

      {/* Sistema de Sub-abas Interativas + Comparativo Preventiva/Corretiva/Contrato */}
      <ServicesTabs />

      <section className="service-request" id="solicitar">
        <Reveal>
          <Eyebrow>Proposta de Contrato, Visita Técnica ou Orçamento</Eyebrow>
          <h2>
            Como podemos blindar
            <br />a sua operação hoje?
          </h2>
          <p>
            Solicite uma visita técnica para avaliarmos o seu sistema no local, peça uma proposta de contrato preventivo/corretivo ou descreva o equipamento que precisa de reparo na bancada.
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
