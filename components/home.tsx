"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ButtonLink, Eyebrow, Reveal, ProductCard } from "./ui";
import { PartGlyph, Check } from "./glyphs";
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

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0),
    [light, setLight] = useState(false),
    [district, setDistrict] = useState("");
  const reduced = useReducedMotion();
  const part = equipment[selected];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".bench-intro h1", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        });
        gsap.fromTo(
          ".bench-device-motion",
          { y: 0 },
          {
            y: 35,
            rotate: -3,
            ease: "none",
            scrollTrigger: {
              trigger: ".workbench",
              start: "top 20%",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".collection-truck",
          { xPercent: -18 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".collection",
              start: "top bottom",
              end: "bottom 30%",
              scrub: 1.2,
            },
          },
        );
        gsap.to(".collection-backdrop", {
          yPercent: 8,
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
    return () => mm.revert();
  }, []);

  return (
    <div ref={root}>
      <main id="conteudo" className="home-workshop">
        {/* 1. Boas-vindas Executivo & Bancada Interativa */}
        <section className="workbench" aria-labelledby="bench-title">
          <div className="bench-intro">
            <div>
              <Eyebrow>
                BMF Bombas (Eletro Ivo) · Contratos Preventivos & Corretivos · 17+ Anos no DF
              </Eyebrow>
              <h1 id="bench-title">
                Manutenção de Motores, Motobombas
                <br />
                <span>e Contratos de Serviço em Brasília.</span>
              </h1>
            </div>
            <p>
              Especialistas em manutenção preventiva e corretiva de motores elétricos, bombas d’água, poços artesianos e ferramentas elétricas.
              <br />
              Realizamos visita técnica in loco, coleta no DF e contratos contínuos com o mesmo rigor que mantém hospitais, shoppings e órgãos federais funcionando sem parar.
            </p>
          </div>
          <div className="bench-assembly">
            <div className="bench-selector">
              <span className="selector-instruction">Especialidades</span>
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
                <span>Especialidade BMF</span>
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
                        : { opacity: 0, x: 45, rotate: 3, scale: 0.94 }
                    }
                    animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -35, rotate: -2 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                    fetchPriority="high"
                  />
                </AnimatePresence>
              </div>
              <div className="bench-screen-bottom">
                <span className="bench-crosshair" />
                <strong>{part.title}</strong>
                <span>Preventiva · Corretiva · Venda</span>
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
                Como podemos
                <br />
                atender você?
              </h2>
              <div className="ticket-option">
                <span>Contrato & Preventiva</span>
                <Link href="/servicos/?aba=contratos">
                  Planos de manutenção
                  <b>↳</b>
                </Link>
                <small>Evite paradas com visitas técnicas periódicas.</small>
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
                <small>Catálogo de motores, bombas e ferramentas.</small>
              </div>
              <Link className="ticket-all-services" href="/servicos/">
                Explorar todas as abas de serviços
              </Link>
              <div className="ticket-teeth" aria-hidden="true" />
            </div>
          </div>
          <div className="bench-help">
            <PartGlyph kind="pin" size={22} />
            <p>
              Precisa que um técnico vá até o local?{" "}
              <strong>Realizamos visita técnica em Brasília e entorno para diagnosticar e resolver o seu problema.</strong>
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

        {/* 2. Clientes Institucionais de Missão Crítica */}
        <section className="clients-section" id="clientes">
          <Reveal className="clients-intro">
            <div className="clients-intro-left">
              <Eyebrow>Autoridade Institucional & Missão Crítica</Eyebrow>
              <h2>
                A mesma engenharia que mantém as maiores operações de Brasília sem parar.
              </h2>
            </div>
            <div className="clients-intro-right">
              <p>
                <strong>Em hospitais, shoppings e órgãos federais, falha hidráulica ou elétrica não é um imprevisto — é risco operacional imediato.</strong>{" "}
                Essas instituições exigem manutenção preventiva rigorosa, velocidade de resposta e zero margem para erro.
              </p>
              <p>
                Ao fechar um contrato ou serviço com a BMF Bombas, você traz para o seu condomínio, construtora, indústria ou empresa o mesmo padrão técnico homologado pelas maiores estruturas do DF.
              </p>
            </div>
          </Reveal>
          <Reveal className="clients-strip">
            {clients.map((c, idx) => (
              <div key={c.name} className="client-cell">
                <div className="client-cell-top">
                  <span className="client-index">0{idx + 1}</span>
                  <span className="client-sector">{c.category}</span>
                </div>
                <div className="client-logo-box">
                  {c.image ? (
                    <img src={c.image} alt={c.name} loading="lazy" />
                  ) : (
                    <span className="client-gov-pill">
                      <PartGlyph kind="shield" size={15} /> Governo Federal
                    </span>
                  )}
                </div>
                <strong className="client-name">{c.name}</strong>
              </div>
            ))}
          </Reveal>
        </section>

        {/* 3. Contratos de Manutenção (Preventiva & Corretiva) + Sub-abas de Aprofundamento */}
        <section className="why-choose-section" id="diferenciais">
          <Reveal className="why-header">
            <div>
              <Eyebrow>Contratos de Serviço · Manutenção Preventiva e Corretiva</Eyebrow>
              <h2>Por que condomínios, construtoras e indústrias fecham contrato com a BMF?</h2>
            </div>
            <p>
              Unimos visitas técnicas em campo, manutenção preventiva programada e oficina própria completa em Samambaia para garantir operação contínua.
            </p>
          </Reveal>
          <div className="why-layout">
            <div className="why-pillars">
              {differentiators.map((d) => (
                <Reveal key={d.number} className="why-pillar">
                  <div className="why-pillar-head">
                    <span className="why-number">{d.number}</span>
                    <h3>{d.title}</h3>
                  </div>
                  <p>{d.desc}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="field-team-card">
              <div className="field-team-content">
                <span className="field-team-tag">Modalidade Recorrente · B2B & Condomínios</span>
                <h3>Contratos de Manutenção Preventiva e Corretiva</h3>
                <p>
                  Não espere a bomba principal queimar ou o motor parar a sua obra. Nossos contratos garantem inspeções periódicas in loco, relatórios técnicos e socorro prioritário para manter seus equipamentos sempre prontos.
                </p>
                <ul className="contract-card-list">
                  <li>
                    <Check size={14} />
                    <span>Visitas técnicas programadas para revisão elétrica e mecânica</span>
                  </li>
                  <li>
                    <Check size={14} />
                    <span>Prioridade de atendimento e retirada em emergências corretivas</span>
                  </li>
                  <li>
                    <Check size={14} />
                    <span>Cobertura para motores, bombas, poços, quadros e ferramentas</span>
                  </li>
                </ul>
              </div>
              <div className="field-team-actions">
                <ButtonLink href="/servicos/?aba=contratos">
                  Conhecer planos e contratos
                </ButtonLink>
                <a
                  href={whatsapp(
                    "Olá! Quero saber como funciona o Contrato de Manutenção Preventiva e Corretiva da BMF e agendar uma visita técnica.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="field-team-link"
                >
                  Solicitar visita técnica <span>→</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Atalhos diretos para aprofundar nas Sub-abas de Serviços */}
          <Reveal className="home-subtabs-box">
            <div className="home-subtabs-head">
              <div>
                <span className="home-subtabs-eyebrow">Aprofunde por especialidade</span>
                <h3>Selecione uma sub-aba para ver o escopo técnico completo:</h3>
              </div>
              <Link href="/servicos/" className="inline-link">
                Abrir central de serviços
              </Link>
            </div>
            <div className="home-subtabs-grid">
              {serviceTabs.map((tab, i) => (
                <Link
                  key={tab.id}
                  href={`/servicos/?aba=${tab.id}`}
                  className="home-subtab-card"
                >
                  <span className="home-subtab-num">0{i + 1}</span>
                  <strong>{tab.label}</strong>
                  <small>{tab.subtitle}</small>
                  <span className="home-subtab-cta">
                    Ver detalhes técnicos <b>→</b>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 4. Visita Técnica In Loco, Coleta e Entrega no DF */}
        <section className="collection" id="coleta">
          <div className="collection-heading">
            <div>
              <Eyebrow>Visita Técnica In Loco · Coleta e Entrega no DF</Eyebrow>
              <h2>
                Vamos até o cliente entender
                <br />e resolver o problema.
              </h2>
            </div>
            <p>
              Nossa equipe visita o seu condomínio, hospital, empresa ou obra para diagnosticar o defeito no local, realizar a coleta segura e devolver o equipamento instalado.
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
            <span className="route-start">BMF / Samambaia</span>
            <span className="route-end">Visita & Coleta no Cliente</span>
            <img
              className="collection-truck"
              src="/images/truck.webp"
              alt="Frota BMF identificada para visita técnica, coleta e entrega"
              loading="lazy"
            />
            <div className="collection-tag">
              <span>Atendimento de Campo</span>
              <img
                src="/images/transport-motor.webp"
                alt="Motor protegido para transporte sobre um estrado"
                loading="lazy"
              />
              <p>
                Visita técnica, retirada
                <br />e reinstalação no local.
              </p>
            </div>
          </div>
          <div className="collection-bottom">
            <div className="collection-steps">
              <div>
                <span>1. Visita Técnica & Coleta</span>
                <p>
                  Vamos até o seu endereço avaliar o problema in loco e retirar a bomba, motor ou ferramenta com segurança.
                </p>
              </div>
              <div>
                <span>2. Laudo na Oficina</span>
                <p>
                  Desmontagem, diagnóstico técnico detalhado e orçamento transparente antes da execução.
                </p>
              </div>
              <div>
                <span>3. Entrega & Instalação</span>
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
                Atendimento em Brasília e entorno para condomínios, empresas, construtoras e residências.
              </small>
            </div>
          </div>
        </section>

        {/* 5. Vitrine Rápida de Equipamentos e Peças */}
        <section className="home-shop" id="equipamentos">
          <div className="shop-section-heading">
            <div>
              <Eyebrow>Venda de Equipamentos, Peças e Ferramentas</Eyebrow>
              <h2>Precisa substituir ou comprar novo?</h2>
            </div>
            <ButtonLink href="/loja/" secondary>
              Abrir catálogo completo
            </ButtonLink>
          </div>
          <div className="home-shop-layout">
            <aside className="department-list">
              <span>Encontre por tipo</span>
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
              <p>Precisa dimensionar uma bomba ou escolher um motor ideal?</p>
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

        {/* 6. Localização e Contato Direto (Mapa sem filtro cinza) */}
        <section className="bmf-desk" id="contato">
          <div className="desk-info">
            <Eyebrow>Sede e Oficina Própria em Samambaia · Desde 2009</Eyebrow>
            <h2>
              Pode chegar na oficina.
              <br />
              Ou chamar nossa equipe até você.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "14px 0" }}>
              <a className="desk-phone" href="tel:+556134583929">
                <span>61</span>3458–3929
              </a>
              <a className="desk-phone" href="tel:+5561996971240">
                <span>61</span>99697–1240
              </a>
            </div>
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
              Conversar no WhatsApp
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
