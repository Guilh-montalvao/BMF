"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, PartGlyph } from "./glyphs";
import { serviceTabs, whatsapp } from "@/lib/data";
import { ButtonLink, Eyebrow, Reveal } from "./ui";

function ServicesTabsInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(serviceTabs[0].id);

  useEffect(() => {
    const param = searchParams.get("aba");
    if (param && serviceTabs.some((t) => t.id === param)) {
      setActiveTab(param);
    }
  }, [searchParams]);

  const current =
    serviceTabs.find((t) => t.id === activeTab) || serviceTabs[0];

  return (
    <section className="services-subtabs-section" id="especialidades">
      <div className="services-subtabs-header">
        <div>
          <Eyebrow>Navegue pelas Sub-abas de Serviço</Eyebrow>
          <h2>Escolha a modalidade ou o equipamento para aprofundar:</h2>
        </div>
        <p>
          Atuamos desde o atendimento corretivo avulso até contratos contínuos de manutenção preventiva e corretiva para condomínios, hospitais, órgãos públicos, indústrias e construtoras.
        </p>
      </div>

      {/* Barra de Sub-abas */}
      <div
        className="services-tabs-bar"
        role="tablist"
        aria-label="Sub-abas de serviços da BMF"
      >
        {serviceTabs.map((tab, idx) => {
          const isActive = tab.id === current.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={`service-tab-button ${isActive ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="service-tab-idx">0{idx + 1}</span>
              <span className="service-tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Painel Ativo da Sub-aba */}
      <div
        key={current.id}
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="service-tab-panel"
      >
        <div className="service-tab-hero">
          <div className="service-tab-copy">
            <span className="service-tab-badge">{current.badge}</span>
            <h3>{current.title}</h3>
            <p className="service-tab-subtitle">{current.subtitle}</p>
            <p className="service-tab-desc">{current.description}</p>

            <div className="service-tab-checklist">
              <strong>Escopo de atuação nesta especialidade:</strong>
              <ul>
                {current.checklist.map((item) => (
                  <li key={item}>
                    <Check size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-tab-actions">
              <ButtonLink href={whatsapp(current.whatsappPrompt)}>
                {current.ctaText}
              </ButtonLink>
              <ButtonLink href="#solicitar" secondary>
                Preencher formulário técnico
              </ButtonLink>
            </div>
          </div>

          <div className="service-tab-visual">
            <div className="service-tab-image-box">
              <img
                src={`/images/${current.image}.webp`}
                alt={current.title}
                loading="lazy"
              />
            </div>
            <div className="service-tab-callout">
              <img
                src="/images/caderno-bmf.webp"
                alt="Laudo e orçamento BMF"
                loading="lazy"
              />
              <div>
                <strong>Visita Técnica & Laudo Transparente</strong>
                <p>
                  Vamos até o cliente avaliar o problema in loco ou recebemos na oficina em Samambaia com diagnóstico detalhado antes de qualquer execução.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pilares detalhados da Sub-aba */}
        <div className="service-tab-highlights">
          {current.highlights.map((h, i) => (
            <div key={h.title} className="service-highlight-card">
              <span className="service-highlight-num">0{i + 1}</span>
              <h4>{h.title}</h4>
              <p>{h.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparativo Fixo: Preventiva vs Corretiva vs Contrato */}
      <Reveal className="maintenance-modes-block">
        <div className="maintenance-modes-head">
          <div>
            <Eyebrow>Entenda as Modalidades de Atendimento</Eyebrow>
            <h2>Manutenção Preventiva, Corretiva ou Contrato Mensal?</h2>
          </div>
          <p>
            Você pode acionar a BMF para uma emergência pontual ou blindar a sua operação com um contrato preventivo e corretivo contínuo.
          </p>
        </div>

        <div className="maintenance-modes-grid">
          <div className="mode-card">
            <span className="mode-tag">Ação Programada</span>
            <h3>Manutenção Preventiva</h3>
            <p>
              Ideal para evitar queimas inesperadas de motores e falta d’água em condomínios, hospitais e empresas.
            </p>
            <ul>
              <li><Check size={13} /> Inspeção elétrica, corrente e megômetro</li>
              <li><Check size={13} /> Troca programada de rolamentos e selos</li>
              <li><Check size={13} /> Revisão de quadros de comando e boias</li>
              <li><Check size={13} /> Testes de bombas reserva e pressurização</li>
            </ul>
            <a
              href={whatsapp("Olá! Quero programar uma Manutenção Preventiva com a BMF.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mode-link"
            >
              Agendar preventiva <span>→</span>
            </a>
          </div>

          <div className="mode-card">
            <span className="mode-tag">Socorro Rápido</span>
            <h3>Manutenção Corretiva</h3>
            <p>
              Para equipamentos que pararam, perderam pressão, apresentaram ruído, vazamento ou queima de bobinado.
            </p>
            <ul>
              <li><Check size={13} /> Visita técnica para diagnóstico e retirada</li>
              <li><Check size={13} /> Rebobinamento completo de motores na oficina</li>
              <li><Check size={13} /> Usinagem de eixo em torno próprio e solda</li>
              <li><Check size={13} /> Sacamento e reinstalação em poço artesiano</li>
            </ul>
            <a
              href={whatsapp("Olá! Preciso de Manutenção Corretiva urgente para um equipamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mode-link"
            >
              Acionar corretiva <span>→</span>
            </a>
          </div>

          <div className="mode-card mode-card-featured">
            <span className="mode-tag">Recomendado para Condomínios & Empresas</span>
            <h3>Contrato de Manutenção (Preventiva + Corretiva)</h3>
            <p>
              A solução completa que une visitas preventivas periódicas com suporte corretivo prioritário e previsibilidade financeira.
            </p>
            <ul>
              <li><Check size={13} /> Visitas técnicas regulares com checklist e laudo</li>
              <li><Check size={13} /> Prioridade máxima em chamados de emergência</li>
              <li><Check size={13} /> Coleta, oficina própria e reinstalação inclusas no fluxo</li>
              <li><Check size={13} /> Padrão técnico homologado por hospitais e shoppings</li>
            </ul>
            <a
              href={whatsapp("Olá! Quero solicitar uma proposta de Contrato de Manutenção (Preventiva e Corretiva) com a BMF.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Solicitar proposta de contrato
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function ServicesTabs() {
  return (
    <Suspense fallback={null}>
      <ServicesTabsInner />
    </Suspense>
  );
}

