"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ButtonLink, Eyebrow, Reveal, ProductCard } from "./ui";
import { PartGlyph } from "./glyphs";
import {
  products,
  categories,
  clients,
  differentiators,
  serviceTabs,
  whatsapp,
  mapEmbed,
  mapUrl,
} from "@/lib/data";

const equipment = [
  {
    name: "Motores",
    title: "Motor elétrico industrial e predial",
    image: "motor",
    glyph: "motor" as const,
    category: "Motores",
    tab: "motores",
    buy: "Ver motores na loja",
    service: "Manutenção e rebobinamento",
    description:
      "Manutenção preventiva, corretiva e rebobinamento de motores elétricos monofásicos e trifásicos.",
    question: "Motor queimou, aqueceu ou precisa de revisão preventiva?",
  },
  {
    name: "Bombas",
    title: "Motobomba & Poço Artesiano",
    image: "pump",
    glyph: "pump" as const,
    category: "Bombas",
    tab: "bombas",
    buy: "Ver motobombas na loja",
    service: "Manutenção de bombas e poços",
    description:
      "Bombas de recalque, pressurização e retirada/instalação de bombas de poço artesiano.",
    question: "A bomba parou, perdeu pressão ou precisa de contrato mensal?",
  },
  {
    name: "Ferramentas",
    title: "Ferramenta elétrica profissional",
    image: "furadeira-dewalt",
    glyph: "tools" as const,
    category: "Ferramentas",
    tab: "ferramentas",
    buy: "Ver ferramentas na loja",
    service: "Conserto de frotas e máquinas",
    description:
      "Manutenção preventiva e corretiva de marteletes, furadeiras, serras e lavadoras de alta pressão.",
    question: "Ferramentas da obra ou empresa precisam de reparo rápido?",
  },
];

const phases = [
  {
    step: "Diagnóstico em Campo ou Bancada",
    title: "Vamos até você entender a causa raiz.",
    text: "Não trocamos peça no escuro. Nossa equipe visita sua casa de bombas, poço artesiano ou planta industrial para medir corrente, isolação, pressão e identificar exatamente por que o equipamento falhou.",
    label: "Inspeção técnica presencial ou recepção imediata na oficina.",
  },
  {
    step: "Engenharia de Oficina, Torno & Cobre",
    title: "Recuperação completa dentro de casa.",
    text: "Em nossa sede própria em Samambaia, desmontamos o conjunto, executamos o rebobinamento com cobre de alta isolação térmica, recuperamos eixos no torno mecânico e apresentamos o laudo antes de executar.",
    label: "Rebobinamento, usinagem própria e componentes de primeira linha.",
  },
  {
    step: "Testes de Carga, Entrega & Prevenção",
    title: "Volta operando — e entra no ciclo preventivo.",
    text: "Após os ensaios em bancada, reinstalamos o equipamento no local e estruturamos o cronograma de manutenção preventiva para que sua operação não volte a sofrer paradas inesperadas.",
    label: "Equipamento testado, instalado e monitorado por contrato.",
  },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null),
    showcaseSt = useRef<ScrollTrigger | null>(null),
    film = useRef<ScrollTrigger | null>(null);
  const [selected, setSelected] = useState(0),
    [activePillar, setActivePillar] = useState(0),
    [phase, setPhase] = useState(0),
    [light, setLight] = useState(false),
    [district, setDistrict] = useState("");
  const reduced = useReducedMotion();
  const part = equipment[selected];
  const currentPillar = differentiators[activePillar] || differentiators[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".bench-intro h1", {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        // Hero 3D device scroll parallax
        gsap.fromTo(
          ".bench-device-motion",
          { y: 0, rotate: 0 },
          {
            y: 42,
            rotate: -4,
            ease: "none",
            scrollTrigger: {
              trigger: ".workbench",
              start: "top 15%",
              end: "bottom top",
              scrub: 1,
            },
          },
        );

        // Floating shield in Clients Authority section
        if (root.current?.querySelector(".clients-shield-visual")) {
          gsap.fromTo(
            ".clients-shield-visual",
            { y: 20, rotate: -4 },
            {
              y: -20,
              rotate: 4,
              ease: "none",
              scrollTrigger: {
                trigger: ".clients-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }

        // Stagger reveal of client logos on scroll
        gsap.from(".client-ledger-item", {
          y: 28,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".clients-ledger",
            start: "top 85%",
          },
        });

        // Rotating blueprint rings on scroll
        gsap.to(".stage-blueprint-rings", {
          rotate: 140,
          ease: "none",
          scrollTrigger: {
            trigger: ".why-choose-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Floating notebook in repair story
        gsap.fromTo(
          ".repair-notebook-float",
          { y: 20, rotate: -3 },
          {
            y: -25,
            rotate: 3,
            ease: "none",
            scrollTrigger: {
              trigger: ".repair-story",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );

        // Collection truck & backdrop parallax
        gsap.fromTo(
          ".collection-truck",
          { xPercent: -22 },
          {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: ".collection",
              start: "top bottom",
              end: "bottom 25%",
              scrub: 1.2,
            },
          },
        );
        gsap.to(".collection-backdrop", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".collection",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, root);
      return () => ctx.revert();
    });

    // Desktop Pinned Scrollytelling for both Engineering Showcase & X-Ray Repair Story
    mm.add(
      "(min-width: 950px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          // 1. Pinned 3D Engineering Showcase (cycles through the 5 3D renders on scroll!)
          const totalPillars = differentiators.length;
          showcaseSt.current = ScrollTrigger.create({
            trigger: ".engineering-showcase",
            start: "top 85px",
            end: "+=1450",
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              const idx = Math.min(
                totalPillars - 1,
                Math.floor(self.progress * totalPillars),
              );
              setActivePillar(idx);
            },
          });

          // 2. Pinned X-Ray Motor & Copper Disassembly Story
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".repair-story",
              start: "top 78px",
              end: "+=1100",
              pin: true,
              scrub: 0.8,
              onUpdate: (self) =>
                setPhase(Math.min(2, Math.floor(self.progress * 3))),
            },
          });
          film.current = timeline.scrollTrigger || null;
          timeline
            .to(".repair-copper", {
              clipPath: "circle(90% at 66% 50%)",
              duration: 1,
            })
            .to(".repair-bench", {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
            });
        }, root);
        return () => {
          showcaseSt.current = null;
          film.current = null;
          ctx.revert();
        };
      },
    );

    return () => mm.revert();
  }, []);

  const goPillar = (idx: number) => {
    setActivePillar(idx);
    if (showcaseSt.current) {
      const st = showcaseSt.current;
      const ratios = [0.02, 0.24, 0.48, 0.72, 0.96];
      window.scrollTo({
        top: st.start + (st.end - st.start) * (ratios[idx] ?? 0),
        behavior: "smooth",
      });
    }
  };

  const goPhase = (n: number) => {
    setPhase(n);
    if (film.current) {
      const st = film.current;
      window.scrollTo({
        top: st.start + (st.end - st.start) * [0.02, 0.5, 0.98][n],
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={root}>
      <main id="conteudo" className="home-workshop">
        {/* ATO 1 — Abertura Executiva & Bancada Interativa */}
        <section className="workbench" aria-labelledby="bench-title">
          <div className="bench-intro">
            <div>
              <Eyebrow>
                BMF Bombas (Eletro Ivo) · Engenharia de Manutenção · Desde 2009 no DF
              </Eyebrow>
              <h1 id="bench-title">
                Sua operação não pode parar
                <br />
                <span>por causa de uma bomba ou motor.</span>
              </h1>
            </div>
            <p>
              Somos a empresa de manutenção preventiva e corretiva por trás de grandes hospitais, shoppings, condomínios e construtoras de Brasília.
              <br />
              Vamos até o seu local diagnosticar o problema, executamos rebobinamento e usinagem em oficina própria e blindamos sua estrutura com contratos contínuos.
            </p>
          </div>
          <div className="bench-assembly">
            <div className="bench-selector">
              <span className="selector-instruction">Na bancada</span>
              <div role="tablist" aria-label="Escolha seu equipamento">
                {equipment.map((e, i) => (
                  <button
                    id={`equipment-tab-${i}`}
                    role="tab"
                    key={e.name}
                    aria-selected={selected === i}
                    aria-controls="bench-panel"
                    tabIndex={selected === i ? 0 : -1}
                    className={selected === i ? "selected" : ""}
                    onClick={() => setSelected(i)}
                    onKeyDown={(ev) => {
                      if (
                        [
                          "ArrowDown",
                          "ArrowRight",
                          "ArrowUp",
                          "ArrowLeft",
                          "Home",
                          "End",
                        ].includes(ev.key)
                      ) {
                        ev.preventDefault();
                        const n =
                          ev.key === "Home"
                            ? 0
                            : ev.key === "End"
                              ? 2
                              : (selected +
                                  (["ArrowDown", "ArrowRight"].includes(ev.key)
                                    ? 1
                                    : 2)) %
                                3;
                        setSelected(n);
                        document.getElementById(`equipment-tab-${n}`)?.focus();
                      }
                    }}
                  >
                    <PartGlyph kind={e.glyph} size={38} />
                    <span>{e.name}</span>
                    <i />
                  </button>
                ))}
              </div>
              <span className="selector-footer">
                BMF
                <br />
                Samambaia, DF
              </span>
            </div>
            <div className={`bench-screen ${light ? "light-mode" : ""}`}>
              <picture className="bench-room">
                <source
                  media="(max-width:700px)"
                  srcSet="/images/hero-mobile.webp"
                />
                <img
                  src="/images/hero-desktop.webp"
                  alt=""
                  fetchPriority="high"
                />
              </picture>
              <div className="bench-screen-top">
                <span>Inspeção interativa</span>
                <button
                  className="light-control"
                  role="switch"
                  aria-checked={light}
                  onClick={() => setLight(!light)}
                >
                  <i />
                  <span>Fundo claro</span>
                </button>
              </div>
              <div className="bench-device-motion">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={part.image}
                    src={`/images/${part.image}.webp`}
                    alt={`Imagem ilustrativa: ${part.title.toLowerCase()}`}
                    initial={
                      reduced
                        ? false
                        : { opacity: 0, x: 45, rotate: 4, scale: 0.92 }
                    }
                    animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -35, rotate: -3, scale: 0.95 }}
                    transition={{ duration: 0.42, ease: [0.2, 0.7, 0.2, 1] }}
                    fetchPriority="high"
                  />
                </AnimatePresence>
              </div>
              <div className="bench-screen-bottom">
                <span className="bench-crosshair" />
                <strong>{part.title}</strong>
                <span>Preventiva · Corretiva · Contratos</span>
              </div>
              <div className="bench-ruler" aria-hidden="true" />
            </div>
            <div
              className="bench-ticket"
              id="bench-panel"
              role="tabpanel"
              aria-labelledby={`equipment-tab-${selected}`}
            >
              <div className="ticket-header">
                <span>BMF / SOLUÇÕES</span>
                <i className="ticket-perforation" />
              </div>
              <h2>
                Qual é a sua
                <br />
                prioridade hoje?
              </h2>
              <div className="ticket-option">
                <span>Contratos & Preventiva</span>
                <Link href="/servicos/?aba=contratos">
                  Blindar minha operação
                  <b>↳</b>
                </Link>
                <small>Visitas programadas e prioridade em emergências.</small>
              </div>
              <div className="ticket-option">
                <span>Manutenção Corretiva</span>
                <Link href={`/servicos/?aba=${part.tab}`}>
                  {part.service}
                  <b>↳</b>
                </Link>
                <small>{part.question}</small>
              </div>
              <div className="ticket-option">
                <span>Equipamentos & Peças</span>
                <Link href={`/loja/?categoria=${part.category}`}>
                  {part.buy}
                  <b>↳</b>
                </Link>
                <small>Substituição rápida e catálogo profissional.</small>
              </div>
              <Link className="ticket-all-services" href="/servicos/">
                Explorar todas as sub-abas de serviços
              </Link>
              <div className="ticket-teeth" aria-hidden="true" />
            </div>
          </div>
          <div className="bench-help">
            <PartGlyph kind="pin" size={22} />
            <p>
              Quer que um técnico avalie pessoalmente?{" "}
              <strong>Vamos até o seu condomínio, hospital, empresa ou obra diagnosticar o sistema no local.</strong>
            </p>
            <a
              href={whatsapp(
                "Olá, BMF! Gostaria de agendar uma visita técnica para avaliar nosso equipamento/sistema.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar visita técnica
            </a>
          </div>
        </section>

        {/* ATO 2 — Autoridade de Missão Crítica com Parceria Técnica Mercosul & Órgãos Federais */}
        <section className="clients-section" id="clientes">
          <div className="clients-intro">
            <Reveal className="clients-intro-left">
              <div className="clients-badge-row">
                <span className="clients-kicker">Autoridade Comprovada em Ambientes Críticos</span>
                <span className="clients-partner-tag">
                  <span className="partner-pulse" /> Parceiro Técnico Oficial Mercosul Motores
                </span>
              </div>
              <h2>
                Você sabe o que acontece se o sistema de bombeamento de um hospital ou shopping parar por dez minutos?
              </h2>
              <p className="clients-lead-text">
                Uma cirurgia é interrompida, lojas fecham as portas e um prédio inteiro entra em colapso. Grandes operações não confiam em soluções improvisadas — exigem credibilidade de fábrica, conformidade com normas ABNT e prontidão técnica absoluta.
              </p>
            </Reveal>

            <Reveal className="clients-shield-card">
              <div className="shield-card-glow" aria-hidden="true" />
              <img
                src="/images/elements/pilar-missao-critica.webp"
                alt="Escudo de Missão Crítica e Proteção Operacional BMF"
                className="clients-shield-visual"
                loading="lazy"
              />
              <div className="shield-card-content">
                <span className="shield-eyebrow">Padrão de Missão Crítica</span>
                <strong>Segurança Homologada no DF</strong>
                <p>
                  A BMF une assistência e parceria técnica homologada com fabricantes de ponta, oficina própria em Samambaia e corpo técnico para visitas imediatas em todo o Distrito Federal.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="clients-ledger-wrap">
            <div className="clients-ledger-header">
              <span className="ledger-header-label">HOMOLOGAÇÃO TÉCNICA, CLIENTES & PARCERIAS INDUSTRIAIS</span>
              <span className="ledger-header-note">Desde 2009 mantendo Brasília em movimento</span>
            </div>
            <div className="clients-ledger">
              {clients.map((c) => (
                <div
                  key={c.name}
                  className={`client-ledger-item ${c.highlight ? "client-featured" : ""}`}
                >
                  <div className="client-ledger-logo">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={`Logomarca oficial ${c.name}`}
                        className={c.name === "Ministério de Minas e Energia" ? "logo-mme" : c.name === "Mercosul Motores" ? "logo-mercosul" : ""}
                        loading="lazy"
                      />
                    ) : (
                      <span className="client-gov-mark">
                        <PartGlyph kind="shield" size={16} /> Governo Federal
                      </span>
                    )}
                  </div>
                  {c.highlight && (
                    <span className="client-highlight-tag">{c.highlight}</span>
                  )}
                  <strong className="client-ledger-name">{c.name}</strong>
                  <span className="client-ledger-sector">{c.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ATO 3 — Scrollytelling Interativo 3D: Como Funciona a Parceria e o Contrato BMF */}
        <section className="why-choose-section" id="diferenciais">
          <Reveal className="why-header">
            <div>
              <Eyebrow>A Apresentação da Nossa Engenharia · Role para Explorar</Eyebrow>
              <h2>Por que grandes operações substituem consertos avulsos pelo Contrato BMF?</h2>
            </div>
            <p>
              Role a página ou selecione cada pilar abaixo para ver como integramos visitas técnicas, prevenção e oficina própria em um único ciclo.
            </p>
          </Reveal>

          <div className="engineering-showcase">
            {/* Coluna Esquerda: Narrativa Guiada pelo Scroll */}
            <div
              className="showcase-index"
              role="tablist"
              aria-label="Pilares do Contrato e Engenharia BMF"
            >
              {differentiators.map((d, idx) => {
                const isActive = idx === activePillar;
                return (
                  <div
                    key={d.title}
                    className={`showcase-row ${isActive ? "active" : ""}`}
                    onMouseEnter={() => setActivePillar(idx)}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className="showcase-row-trigger"
                      onClick={() => goPillar(idx)}
                    >
                      <div className="showcase-row-titles">
                        <span className="showcase-row-tag">{d.tag}</span>
                        <h3>{d.title}</h3>
                      </div>
                      <img
                        src={d.image}
                        alt=""
                        className="showcase-row-thumb"
                        loading="lazy"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          className="showcase-row-expand"
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p>{d.desc}</p>
                          <Link href={d.ctaHref} className="showcase-row-link">
                            {d.ctaLabel} <b>↳</b>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Coluna Direita: Palco Escultural 3D Vivo sincronizado com o Scroll */}
            <div className="showcase-stage">
              <div className="showcase-stage-visual">
                <div className="stage-blueprint-rings" aria-hidden="true" />
                <motion.span
                  key={`tag-top-${activePillar}`}
                  className="stage-floating-pill pill-top-left"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {currentPillar.tag}
                </motion.span>
                <motion.span
                  key={`tag-bottom-${activePillar}`}
                  className="stage-floating-pill pill-bottom-right"
                  initial={reduced ? false : { opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 }}
                >
                  {currentPillar.specLabel}
                </motion.span>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPillar.image}
                    src={currentPillar.image}
                    alt={currentPillar.title}
                    className="showcase-stage-render"
                    initial={
                      reduced
                        ? false
                        : { opacity: 0, y: 36, scale: 0.84, rotate: -6 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, y: -32, scale: 0.88, rotate: 5 }}
                    transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </div>

              <div className="showcase-stage-spec">
                <div>
                  <small>{currentPillar.specLabel}</small>
                  <strong>{currentPillar.specValue}</strong>
                </div>
                <div className="showcase-stage-actions">
                  <ButtonLink href="/servicos/?aba=contratos">
                    Conhecer planos e contratos
                  </ButtonLink>
                  <a
                    href={whatsapp(
                      "Olá! Quero saber como funciona o Contrato de Manutenção Preventiva e Corretiva da BMF e agendar uma visita técnica.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="showcase-stage-whatsapp"
                  >
                    Solicitar visita técnica <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Índice Tipográfico Direto das Sub-abas */}
          <div className="specialty-index-strip">
            <span className="specialty-index-label">
              Mergulhe nos detalhes técnicos de cada área:
            </span>
            <nav className="specialty-index-links" aria-label="Sub-abas de especialidades">
              {serviceTabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={`/servicos/?aba=${tab.id}`}
                  className="specialty-index-link"
                >
                  <span>{tab.label}</span>
                  <b>↗</b>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* ATO 4 — Raio-X no Scroll: Da Visita In Loco ao Rebobinamento e Prevenção */}
        <section className="repair-story" id="manutencao">
          <div className="repair-intro">
            <Eyebrow>Por dentro da intervenção BMF · Role para ver o processo</Eyebrow>
            <h2>
              Do diagnóstico no seu local
              <br />
              até a bancada de testes.
            </h2>
            <p>
              Veja como transformamos uma emergência crítica
              <br />
              em uma operação previsível e documentada.
            </p>
          </div>
          <div className="repair-layout">
            <div className="repair-stages">
              {phases.map((p, i) => (
                <button
                  key={p.title}
                  className={phase === i ? "active" : ""}
                  onClick={() => goPhase(i)}
                  aria-pressed={phase === i}
                >
                  <span className="phase-track">
                    <span />
                  </span>
                  <div>
                    <small>{p.step}</small>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </button>
              ))}
              <div className="repair-notebook-row">
                <img
                  src="/images/caderno-bmf.webp"
                  alt="Caderno de laudo técnico BMF"
                  className="repair-notebook-float"
                  loading="lazy"
                />
                <div>
                  <strong>Laudo e Orçamento Transparente antes da Execução</strong>
                  <p>
                    Tudo é registrado: medições elétricas, fotos da desmontagem e escopo aprovado por você antes do reparo.
                  </p>
                  <Link href="/servicos/" className="inline-link">
                    Explorar sub-abas de engenharia e serviços
                  </Link>
                </div>
              </div>
            </div>
            <div className={`repair-media phase-${phase}`}>
              <div className="repair-media-base">
                <img
                  src="/images/motor.webp"
                  alt="Motor elétrico recebido para avaliação técnica"
                  loading="lazy"
                />
              </div>
              <img
                className="repair-copper"
                src="/images/copper.webp"
                alt="Rebobinamento em cobre de alta isolação térmica"
                loading="lazy"
              />
              <img
                className="repair-bench"
                src="/images/maintenance.webp"
                alt="Motor desmontado em bancada para revisão completa"
                loading="lazy"
              />
              <div className="repair-media-caption">
                <span>
                  {
                    [
                      "Inspeção & Diagnóstico",
                      "Rebobinamento & Usinagem",
                      "Teste de Carga & Entrega",
                    ][phase]
                  }
                </span>
                <p>{phases[phase].label}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ATO 5 — Logística em Movimento: Visita Técnica In Loco, Coleta e Entrega no DF */}
        <section className="collection" id="coleta">
          <div className="collection-heading">
            <div>
              <Eyebrow>Frota Própria · Visita Técnica, Retirada e Instalação no DF</Eyebrow>
              <h2>
                Não consegue trazer o equipamento?
                <br />A oficina da BMF vai até você.
              </h2>
            </div>
            <p>
              Visitamos sua operação em Brasília e entorno para diagnosticar o sistema no local, sacar bombas de poço ou motores pesados e devolver tudo instalado.
            </p>
          </div>
          <div className="collection-canvas">
            <img
              className="collection-backdrop"
              src="/images/logistics.webp"
              alt=""
              loading="lazy"
            />
            <div className="collection-fade" />
            <div className="route-line" aria-hidden="true">
              <i />
              <span />
              <i />
            </div>
            <span className="route-start">Oficina BMF · Samambaia</span>
            <span className="route-end">Visita & Coleta no Cliente</span>
            <img
              className="collection-truck"
              src="/images/truck.webp"
              alt="Frota BMF identificada para visita técnica, coleta e entrega"
              loading="lazy"
            />
            <div className="collection-tag">
              <span>Logística Técnica</span>
              <img
                src="/images/transport-motor.webp"
                alt="Motor protegido para transporte sobre um estrado"
                loading="lazy"
              />
              <p>
                Retirada segura, bancada
                <br />e reinstalação in loco.
              </p>
            </div>
          </div>
          <div className="collection-bottom">
            <div className="collection-steps">
              <div>
                <span>Visita Técnica & Coleta</span>
                <p>
                  Vamos até o seu endereço avaliar o problema in loco e retirar a bomba, motor ou ferramenta com segurança.
                </p>
              </div>
              <div>
                <span>Laudo na Oficina</span>
                <p>
                  Desmontagem, diagnóstico técnico detalhado e orçamento transparente antes da execução.
                </p>
              </div>
              <div>
                <span>Entrega & Instalação</span>
                <p>
                  Devolvemos o equipamento revisado, testado em bancada e pronto para operar sem falhas.
                </p>
              </div>
            </div>
            <div className="collection-enquiry">
              <label htmlFor="pickup-district">
                Em qual região ou bairro você precisa de visita técnica ou coleta?
              </label>
              <div>
                <input
                  id="pickup-district"
                  placeholder="Ex.: Asa Sul, Águas Claras, Samambaia, SIA..."
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  maxLength={100}
                />
                <a
                  href={whatsapp(
                    `Olá! Gostaria de agendar uma visita técnica / coleta de equipamento. ${district ? `Região/Bairro: ${district}.` : "Preciso confirmar disponibilidade de atendimento."}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar visita / coleta
                </a>
              </div>
              <small>
                Atendimento em Brasília e entorno para condomínios, hospitais, indústrias, construtoras e residências.
              </small>
            </div>
          </div>
        </section>

        {/* ATO 6 — Fornecimento Rápido de Equipamentos e Ferramentas */}
        <section className="home-shop" id="equipamentos">
          <div className="shop-section-heading">
            <div>
              <Eyebrow>Fornecimento de Equipamentos, Peças e Ferramentas</Eyebrow>
              <h2>Quando substituir vale mais a pena do que reparar.</h2>
            </div>
            <ButtonLink href="/loja/" secondary>
              Abrir catálogo completo
            </ButtonLink>
          </div>
          <div className="home-shop-layout">
            <aside className="department-list">
              <span>Linhas disponíveis</span>
              {categories.map((c) => (
                <Link href={`/loja/?categoria=${c.name}`} key={c.name}>
                  <img src={`/images/${c.image}.webp`} alt="" loading="lazy" />
                  <div>
                    <h3>{c.name}</h3>
                    <span>Conhecer a categoria</span>
                  </div>
                  <b>↳</b>
                </Link>
              ))}
              <p>Precisa dimensionar uma motobomba ou especificar um motor novo?</p>
              <a
                href={whatsapp(
                  "Olá! Preciso de orientação técnica para dimensionar/comprar um equipamento.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Converse com um técnico antes de comprar.
              </a>
            </aside>
            <div>
              <div className="product-grid">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
              <p className="demo-note">
                Catálogo de demonstração: produtos, imagens e valores
                ilustrativos. Consulte estoque e cotação comercial pelo WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* ATO 7 — Sede Própria e Contato Direto */}
        <section className="bmf-desk" id="contato">
          <div className="desk-info">
            <Eyebrow>Sede e Oficina Própria em Samambaia · Desde 2009</Eyebrow>
            <h2>
              Portas abertas na oficina.
              <br />
              Ou nossa equipe na sua operação.
            </h2>
            <a className="desk-phone" href="tel:+5561996971240">
              <span>61</span>99697–1240
            </a>
            <div className="desk-address">
              <p>
                Quadra ADE Sul, Conjunto 06, Lote 06
                <br />
                Samambaia — Brasília / DF · 72314-706
              </p>
              <p>
                Segunda a sexta
                <br />
                08h às 18h
              </p>
            </div>
            <ButtonLink
              href={whatsapp("Olá, BMF! Quero conversar sobre manutenção / contrato de serviço.")}
            >
              Iniciar conversa no WhatsApp
            </ButtonLink>
            <small>Contratos preventivos, manutenção corretiva, visitas técnicas e vendas no DF.</small>
          </div>
          <div className="desk-map">
            <iframe
              title="Localização da BMF Bombas em Samambaia, Distrito Federal"
              src={mapEmbed}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              Como chegar até a BMF <PartGlyph kind="pin" size={18} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
