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
  whatsapp,
  mapEmbed,
  mapUrl,
  PHONE_LANDLINE,
  PHONE_WHATSAPP,
  COMPANY_ADDRESS,
  COMPANY_CEP,
} from "@/lib/data";

const equipment = [
  {
    name: "Motores",
    title: "Motor elétrico",
    image: "motor",
    glyph: "motor" as const,
    category: "Motores",
    buy: "Ver motores na loja",
    service: "Rebobinamento e conserto",
    description: "Diagnóstico, reparação e rebobinamento de motores elétricos.",
    question: "O motor não liga ou perdeu força?",
  },
  {
    name: "Bombas",
    title: "Bomba d’água & Poço",
    image: "pump",
    glyph: "pump" as const,
    category: "Bombas",
    buy: "Ver bombas na loja",
    service: "Manutenção de bombas",
    description:
      "Bombas d’água, poços artesianos e sistemas hidráulicos e pneumáticos.",
    question: "A bomba parou ou perdeu pressão?",
  },
  {
    name: "Ferramentas",
    title: "Ferramenta profissional",
    image: "furadeira-dewalt",
    glyph: "tools" as const,
    category: "Ferramentas",
    buy: "Ver ferramentas na loja",
    service: "Conserto de ferramentas",
    description: "Furadeiras, marteletes, serras, lixadeiras e lavadoras de pressão.",
    question: "Sua ferramenta precisa de reparo?",
  },
];
const phases = [
  {
    title: "Você conta o que aconteceu.",
    text: "Informe o equipamento e os sintomas. Uma foto e o modelo ajudam a começar a conversa.",
    label: "Primeiro, entender o problema.",
  },
  {
    title: "A oficina faz a avaliação.",
    text: "A equipe examina o equipamento e apresenta o que precisa ser feito, junto com o orçamento.",
    label: "Olhar de perto faz diferença.",
  },
  {
    title: "O serviço passa pela sua aprovação.",
    text: "Com o orçamento aprovado, combinamos o reparo e a devolução do equipamento.",
    label: "O próximo passo é combinado com você.",
  },
];
export default function Home() {
  const root = useRef<HTMLDivElement>(null),
    film = useRef<ScrollTrigger | null>(null);
  const [selected, setSelected] = useState(0),
    [light, setLight] = useState(false),
    [phase, setPhase] = useState(0),
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
    mm.add(
      "(min-width: 950px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".repair-story",
              start: "top 78px",
              end: "+=1000",
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
          film.current = null;
          ctx.revert();
        };
      },
    );
    return () => mm.revert();
  }, []);
  const goPhase = (n: number) => {
    setPhase(n);
    if (film.current) {
      const st = film.current;
      window.scrollTo({
        top: st.start + (st.end - st.start) * [0.01, 0.49, 0.99][n],
        behavior: "smooth",
      });
    }
  };
  return (
    <div ref={root}>
      <main id="conteudo" className="home-workshop">
        <section className="workbench" aria-labelledby="bench-title">
          <div className="bench-intro">
            <div>
              <Eyebrow>BMF Comércio de Bombas (Eletro Ivo) · 17+ Anos no Distrito Federal</Eyebrow>
              <h1 id="bench-title">
                Soluções em Bombas, Motores
                <br />
                <span>e Manutenção em Brasília.</span>
              </h1>
            </div>
            <p>
              Especialistas em conserto de bombas d’água, poços artesianos e motores elétricos.
              <br />
              Agilidade técnica e o mesmo rigor que mantém hospitais, shoppings e órgãos federais funcionando sem parar.
            </p>
          </div>
          <div className="bench-assembly">
            <div className="bench-selector">
              <span className="selector-instruction">Na sua bancada</span>
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
                <span>Peça de referência</span>
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
                <span>Imagem ilustrativa</span>
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
                <span>BMF / ATENDIMENTO</span>
                <i className="ticket-perforation" />
              </div>
              <h2>
                Qual é o<br />
                seu próximo passo?
              </h2>
              <div className="ticket-option">
                <span>Para comprar</span>
                <Link href={`/loja/?categoria=${part.category}`}>
                  {part.buy}
                  <b>↳</b>
                </Link>
                <small>Confira os equipamentos disponíveis.</small>
              </div>
              <div className="ticket-option">
                <span>Para consertar</span>
                <Link
                  href={whatsapp(
                    `Olá! Gostaria de atendimento para ${part.service.toLowerCase()}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part.service}
                  <b>↳</b>
                </Link>
                <small>{part.question}</small>
              </div>
              <Link className="ticket-all-services" href="/servicos/">
                Conhecer os serviços da oficina
              </Link>
              <div className="ticket-teeth" aria-hidden="true" />
            </div>
          </div>
          <div className="bench-help">
            <PartGlyph kind="camera" size={23} />
            <p>
              Não sabe o modelo? <strong>Uma foto já ajuda na conversa.</strong>
            </p>
            <a
              href={whatsapp(
                "Olá, BMF! Preciso de ajuda para identificar meu equipamento. Vou enviar uma foto.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir orientação
            </a>
          </div>
        </section>

        {/* Clientes Institucionais de Missão Crítica */}
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
                Essas instituições exigem rigor técnico, velocidade de resposta e zero margem para erro.
              </p>
              <p>
                Ao contratar a BMF Bombas, você leva para o seu condomínio, construtora, indústria ou residência o mesmo padrão de engenharia homologado pelas maiores estruturas do Distrito Federal.
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

        {/* Por que escolher a BMF & Equipe Técnica */}
        <section className="why-choose-section" id="diferenciais">
          <Reveal className="why-header">
            <div>
              <Eyebrow>Diferenciais BMF Bombas</Eyebrow>
              <h2>Por que condomínios, construtoras e indústrias escolhem a BMF?</h2>
            </div>
            <p>
              Estrutura de oficina própria em Samambaia combinada com atendimento de campo ágil em todo o Distrito Federal.
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
                <span className="field-team-tag">Segurança e Identificação em Campo</span>
                <h3>Técnicos Próprios e Padronizados no DF</h3>
                <p>
                  Para atuar dentro de hospitais, condomínios e canteiros de obras, identificação visual e conformidade são inegociáveis. Nossa equipe atua uniformizada, com EPIs completos e frota pronta para retirada e instalação.
                </p>
                <div className="field-team-actions">
                  <ButtonLink href={whatsapp("Olá! Gostaria de agendar uma avaliação técnica com a equipe da BMF.")}>
                    Solicitar visita técnica
                  </ButtonLink>
                  <Link href="/servicos/" className="field-team-link">
                    Ver escopo de serviços <span>→</span>
                  </Link>
                </div>
              </div>
              <div className="field-team-media">
                <img
                  src="/images/uniforme-tecnico.webp"
                  alt="Uniforme industrial BMF frente e verso — equipe técnica identificada"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="repair-story" id="manutencao">
          <div className="repair-intro">
            <Eyebrow>Dentro da oficina</Eyebrow>
            <h2>
              O conserto começa
              <br />
              com um diagnóstico.
            </h2>
            <p>
              Motor elétrico, bomba ou ferramenta:
              <br />
              primeiro a gente entende o defeito.
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
                    <small>
                      {["Recebimento", "Avaliação", "Autorização"][i]}
                    </small>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </button>
              ))}
              <Link href="/servicos/" className="inline-link">
                Conhecer os serviços da BMF
              </Link>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  background: "#f8fafc",
                  padding: "12px 16px",
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <img
                  src="/images/caderno-bmf.webp"
                  alt="Caderno BMF"
                  style={{ width: "42px", height: "46px", objectFit: "contain" }}
                  loading="lazy"
                />
                <div style={{ fontSize: "11px", lineHeight: "1.5", color: "#334155" }}>
                  <strong>Orçamento Técnico Transparente</strong>
                  <br />
                  Anotação minuciosa e laudo antes de qualquer execução.
                </div>
              </div>
            </div>
            <div className={`repair-media phase-${phase}`}>
              <div className="repair-media-base">
                <img
                  src="/images/motor.webp"
                  alt="Motor elétrico antes da avaliação"
                  loading="lazy"
                />
              </div>
              <img
                className="repair-copper"
                src="/images/copper.webp"
                alt="Enrolamentos internos de um motor elétrico"
                loading="lazy"
              />
              <img
                className="repair-bench"
                src="/images/maintenance.webp"
                alt="Cena ilustrativa de motor desmontado para manutenção"
                loading="lazy"
              />
              <div className="repair-media-caption">
                <span>
                  {
                    [
                      "Equipamento recebido",
                      "Avaliação técnica",
                      "Serviço aprovado",
                    ][phase]
                  }
                </span>
                <p>{phases[phase].label}</p>
                <i>
                  {phase + 1}
                  <span> / 3</span>
                </i>
              </div>
            </div>
          </div>
        </section>
        <section className="home-shop" id="equipamentos">
          <div className="shop-section-heading">
            <div>
              <Eyebrow>Equipamentos, peças e ferramentas</Eyebrow>
              <h2>Conheça a loja.</h2>
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
              <p>Precisa dimensionar uma bomba ou escolher um motor?</p>
              <a
                href={whatsapp(
                  "Olá! Preciso de orientação para escolher um equipamento.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Converse com a equipe antes de comprar.
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
                ilustrativos. As vendas reais ainda não estão ativadas.
              </p>
            </div>
          </div>
        </section>
        <section className="collection" id="coleta">
          <div className="collection-heading">
            <div>
              <Eyebrow>Coleta e entrega / DF</Eyebrow>
              <h2>
                Não consegue levar
                <br />
                até a oficina?
              </h2>
            </div>
            <p>
              A BMF combina a busca do equipamento
              <br />e a devolução depois do serviço.
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
            <span className="route-end">Seu endereço</span>
            <img
              className="collection-truck"
              src="/images/truck.webp"
              alt="Picape BMF identificada para coleta e entrega"
              loading="lazy"
            />
            <div className="collection-tag">
              <span>Vai com a BMF</span>
              <img
                src="/images/transport-motor.webp"
                alt="Motor protegido para transporte sobre um estrado"
                loading="lazy"
              />
              <p>
                O cuidado começa
                <br />
                antes da bancada.
              </p>
            </div>
          </div>
          <div className="collection-bottom">
            <div className="collection-steps">
              <div>
                <span>Coleta</span>
                <p>
                  Informe onde está
                  <br />o equipamento.
                </p>
              </div>
              <div>
                <span>Oficina</span>
                <p>
                  Avaliação e orçamento
                  <br />
                  com a equipe.
                </p>
              </div>
              <div>
                <span>Devolução</span>
                <p>
                  Combinamos a entrega
                  <br />
                  depois do serviço.
                </p>
              </div>
            </div>
            <div className="collection-enquiry">
              <label htmlFor="pickup-district">
                Em qual bairro está o equipamento?
              </label>
              <div>
                <input
                  id="pickup-district"
                  placeholder="Ex.: Samambaia"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  maxLength={100}
                />
                <a
                  href={whatsapp(
                    `Olá! Gostaria de consultar a coleta de um equipamento. ${district ? `O bairro é ${district}.` : "Preciso confirmar a área de atendimento."}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar coleta
                </a>
              </div>
              <small>
                Consulte área atendida, disponibilidade e condições.
              </small>
            </div>
          </div>
        </section>
        <section className="bmf-desk" id="contato">
          <div className="desk-info">
            <Eyebrow>Oficina própria em Samambaia · Desde 2009</Eyebrow>
            <h2>
              Pode chegar.
              <br />
              Ou chamar por aqui.
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
              href={whatsapp("Olá, BMF! Quero conversar com a oficina.")}
            >
              Conversar no WhatsApp
            </ButtonLink>
            <small>Atendimento a condomínios, empresas e residências.</small>
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
        <section className="workshop-notes">
          <div>
            <Eyebrow>@bmf_bombas</Eyebrow>
            <h2>
              Da nossa bancada
              <br />
              para o seu feed.
            </h2>
            <p>
              Bombas, motores e manutenção
              <br />
              também no Instagram da BMF.
            </p>
            <a
              className="inline-link"
              href="https://www.instagram.com/bmf_bombas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acompanhar a BMF
            </a>
          </div>
          <div className="notes-images">
            {["post-motor", "post-service", "post-pump"].map((img, i) => (
              <a
                key={img}
                href="https://www.instagram.com/bmf_bombas/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`BMF no Instagram: ${["motores", "manutenção", "bombas"][i]}`}
              >
                <img
                  src={`/images/${img}.webp`}
                  alt={
                    [
                      "Manutenção de motores BMF",
                      "Manutenção e reparo de bombas e motores",
                      "Manutenção de bombas BMF",
                    ][i]
                  }
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
