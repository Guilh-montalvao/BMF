"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "./glyphs";
import { serviceTabs, whatsapp } from "@/lib/data";
import { ButtonLink, Eyebrow } from "./ui";

function ServicesTabsInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(serviceTabs[0].id);
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const param = searchParams.get("aba");
    if (param && serviceTabs.some((t) => t.id === param)) {
      setActiveTab(param);
    }
  }, [searchParams]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".service-callout-float",
          { y: 18, rotate: -4 },
          {
            y: -18,
            rotate: 4,
            ease: "none",
            scrollTrigger: {
              trigger: ".services-subtabs-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.from(".mode-column", {
          y: 36,
          opacity: 0,
          stagger: 0.14,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".maintenance-modes-grid",
            start: "top 82%",
          },
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const current =
    serviceTabs.find((t) => t.id === activeTab) || serviceTabs[0];

  return (
    <section
      ref={root}
      className="services-subtabs-section"
      id="especialidades"
    >
      <div className="services-subtabs-header">
        <div>
          <Eyebrow>Aprofundamento Técnico por Especialidade</Eyebrow>
          <h2>Navegue pelas sub-abas e conheça nossa estrutura em detalhes.</h2>
        </div>
        <p>
          Cada frente de trabalho da BMF possui bancada dedicada, ferramental específico e protocolos de manutenção preventiva e corretiva para operações que não admitem falhas.
        </p>
      </div>

      {/* Barra de Sub-abas Interativa */}
      <div
        className="services-tabs-bar"
        role="tablist"
        aria-label="Sub-abas de serviços da BMF"
      >
        {serviceTabs.map((tab) => {
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
              <span className="service-tab-label">{tab.label}</span>
              {isActive && (
                <motion.span
                  layoutId="active-service-tab-line"
                  className="service-tab-active-line"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Painel Ativo da Sub-aba com Animações de Entrada e Saída */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="service-tab-panel"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="service-tab-hero">
            <motion.div
              className="service-tab-copy"
              initial={reduced ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.42, delay: 0.05 }}
            >
              <span className="service-tab-badge">{current.badge}</span>
              <h3>{current.title}</h3>
              <p className="service-tab-subtitle">{current.subtitle}</p>
              <p className="service-tab-desc">{current.description}</p>

              <div className="service-tab-checklist">
                <strong>Escopo técnico desta especialidade:</strong>
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
                  Solicitar visita ou proposta
                </ButtonLink>
              </div>
            </motion.div>

            <div className="service-tab-visual">
              <div className="service-tab-image-box">
                <div className="stage-blueprint-rings" aria-hidden="true" />
                <motion.img
                  key={current.image}
                  src={`/images/${current.image}.webp`}
                  alt={current.title}
                  initial={
                    reduced
                      ? false
                      : { opacity: 0, scale: 0.85, rotate: -5, y: 24 }
                  }
                  animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="service-tab-callout">
                <img
                  src="/images/caderno-bmf.webp"
                  alt="Laudo e orçamento BMF"
                  className="service-callout-float"
                  loading="lazy"
                />
                <div>
                  <strong>Visita Técnica In Loco & Laudo Detalhado</strong>
                  <p>
                    Vamos até o seu condomínio, hospital, indústria ou obra diagnosticar o problema pessoalmente antes de definir o orçamento.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pilares detalhados da Sub-aba */}
          <div className="service-tab-highlights">
            {current.highlights.map((h, i) => (
              <motion.div
                key={h.title}
                className="service-highlight-card"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: 0.1 + i * 0.08 }}
              >
                <h4>{h.title}</h4>
                <p>{h.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Comparativo Visual com Elementos 3D: Preventiva vs Corretiva vs Contrato */}
      <div className="maintenance-modes-block">
        <div className="maintenance-modes-head">
          <div>
            <Eyebrow>Formatos de Contratação BMF</Eyebrow>
            <h2>Manutenção Preventiva, Corretiva ou Contrato Contínuo?</h2>
          </div>
          <p>
            Atendemos desde uma emergência imediata até a gestão eletromecânica completa da sua operação através de contrato mensal.
          </p>
        </div>

        <div className="maintenance-modes-grid">
          <div className="mode-card mode-column">
            <div>
              <img
                src="/images/elements/pilar-contratos.webp"
                alt="Manutenção Preventiva Programada"
                className="mode-3d-img"
                loading="lazy"
              />
              <span className="mode-tag">Antecipação de Falhas</span>
              <h3>Manutenção Preventiva</h3>
              <p>
                Inspeções programadas para evitar queimas inesperadas de motores e falta d’água em condomínios, hospitais e empresas.
              </p>
              <ul>
                <li><Check size={13} /> Medição de isolação (megômetro) e corrente</li>
                <li><Check size={13} /> Substituição preventiva de rolamentos e selos</li>
                <li><Check size={13} /> Revisão de quadros de comando e boias</li>
                <li><Check size={13} /> Testes de bombas reserva e pressurização</li>
              </ul>
            </div>
            <a
              href={whatsapp("Olá! Quero programar uma Manutenção Preventiva com a BMF.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mode-link"
            >
              Programar preventiva <span>→</span>
            </a>
          </div>

          <div className="mode-card mode-column">
            <div>
              <img
                src="/images/elements/pilar-oficina.webp"
                alt="Manutenção Corretiva e Oficina"
                className="mode-3d-img"
                loading="lazy"
              />
              <span className="mode-tag">Resposta Rápida</span>
              <h3>Manutenção Corretiva</h3>
              <p>
                Socorro técnico quando o equipamento para, perde pressão, apresenta ruído mecânico, vazamento ou queima elétrica.
              </p>
              <ul>
                <li><Check size={13} /> Visita técnica para diagnóstico e retirada</li>
                <li><Check size={13} /> Rebobinamento completo de motores na oficina</li>
                <li><Check size={13} /> Usinagem de eixo em torno próprio e solda</li>
                <li><Check size={13} /> Sacamento e reinstalação em poço artesiano</li>
              </ul>
            </div>
            <a
              href={whatsapp("Olá! Preciso de Manutenção Corretiva urgente para um equipamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mode-link"
            >
              Acionar corretiva <span>→</span>
            </a>
          </div>

          <div className="mode-card mode-column">
            <div>
              <img
                src="/images/elements/contrato-ciclo-motor.webp"
                alt="Contrato de Manutenção Preventiva e Corretiva"
                className="mode-3d-img"
                loading="lazy"
              />
              <span className="mode-tag">Recomendado para Condomínios & Empresas</span>
              <h3>Contrato de Manutenção (Preventiva + Corretiva)</h3>
              <p>
                A parceria contínua que une visitas preventivas regulares com suporte corretivo prioritário e previsibilidade financeira.
              </p>
              <ul>
                <li><Check size={13} /> Cronograma de visitas técnicas com checklist e laudo</li>
                <li><Check size={13} /> Prioridade máxima em chamados de emergência</li>
                <li><Check size={13} /> Coleta, oficina própria e reinstalação no fluxo</li>
                <li><Check size={13} /> Padrão técnico homologado por hospitais e shoppings</li>
              </ul>
            </div>
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
      </div>
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
