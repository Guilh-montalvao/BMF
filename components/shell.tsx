"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PartGlyph, X, Trash2 } from "./glyphs";
import { useStore } from "./store";
import {
  money,
  products,
  whatsapp,
  mapUrl,
  PHONE_WHATSAPP,
  COMPANY_ADDRESS,
  COMPANY_CEP,
  COMPANY_LEGAL_NAME,
} from "@/lib/data";
import { Quantity } from "./ui";
function FocusPanel({
  children,
  onClose,
  label,
  className = "",
}: {
  children: React.ReactNode;
  onClose: () => void;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null),
    closeRef = useRef(onClose);
  const reduced = useReducedMotion();
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = ref.current;
    panel?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab" && panel) {
        const all = Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]',
          ),
        );
        const first = all[0],
          last = all[all.length - 1];
        if (!all.length) {
          e.preventDefault();
          return;
        }
        if (
          e.shiftKey &&
          (document.activeElement === first || document.activeElement === panel)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, []);
  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className="overlay-backdrop"
        onClick={onClose}
        aria-label="Fechar janela"
      />
      <motion.aside
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`side-panel ${className}`}
        initial={reduced ? false : { x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.aside>
    </motion.div>
  );
}
export function Header() {
  const [menu, setMenu] = useState(false);
  const path = usePathname();
  const { count, setOpen } = useStore();
  useEffect(() => setMenu(false), [path]);
  const links = [
    { href: "/servicos/", label: "Serviços", kind: "tools" as const },
    { href: "/loja/", label: "Loja", kind: "basket" as const },
    { href: "/#coleta", label: "Visita & Coleta", kind: "truck" as const },
    { href: "/#contato", label: "Onde estamos", kind: "pin" as const },
    { href: "/trabalhe-conosco/", label: "Carreiras", kind: "shield" as const },
  ];
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="side-rail">
        <Link href="/" className="rail-brand" aria-label="BMF — início">
          <img
            src="/images/logo.webp"
            alt="BMF Bombas, Motores e Ferramentas"
            width="90"
            height="45"
          />
        </Link>
        <nav className="rail-nav" aria-label="Navegação principal">
          {links.map((l) => (
            <Link
              key={l.href}
              className={path === l.href ? "current" : ""}
              href={l.href}
            >
              <PartGlyph kind={l.kind} size={26} />
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>
        <a
          className="rail-help"
          href={whatsapp("Olá! Preciso de atendimento da BMF.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PartGlyph kind="chat" size={24} />
          <span>Atendimento</span>
        </a>
        <span className="rail-location">SAMAMBAIA · DF</span>
        <div className="mobile-rail-actions">
          <button
            onClick={() => setOpen(true)}
            aria-label={`Abrir carrinho, ${count} itens`}
          >
            Carrinho <span>{count}</span>
          </button>
          <button
            className="menu-trigger"
            onClick={() => setMenu(true)}
            aria-label="Abrir menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className="utility-bar">
        <p>
          Bombas, motores e ferramentas <span>em Samambaia, DF</span>
        </p>
        <div className="utility-hours">
          seg—sex <span>08:00—18:00</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label={`Abrir carrinho, ${count} itens`}
        >
          <span>Sua seleção</span>
          <PartGlyph kind="basket" size={18} />
          <strong>{count}</strong>
        </button>
      </div>
      <AnimatePresence>
        {menu && (
          <FocusPanel
            label="Menu principal"
            onClose={() => setMenu(false)}
            className="mobile-panel"
          >
            <div className="panel-head">
              <span>O que você precisa?</span>
              <button aria-label="Fechar menu" onClick={() => setMenu(false)}>
                <X size={20} />
              </button>
            </div>
            <nav>
              {links.map((l) => (
                <Link href={l.href} key={l.href} onClick={() => setMenu(false)}>
                  <PartGlyph kind={l.kind} size={32} />
                  {l.label}
                </Link>
              ))}
            </nav>
            <a
              className="button"
              href={whatsapp("Olá! Preciso de atendimento da BMF.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conversar com a oficina
            </a>
          </FocusPanel>
        )}
      </AnimatePresence>
    </>
  );
}
export function Cart() {
  const { lines, open, setOpen, subtotal, change, toast } = useStore();
  return (
    <>
      <AnimatePresence>
        {open && (
          <FocusPanel label="Seu carrinho" onClose={() => setOpen(false)}>
            <div className="panel-head">
              <div>
                <small>BMF / SUA SELEÇÃO</small>
                <h2>Equipamentos no carrinho</h2>
              </div>
              <button
                aria-label="Fechar carrinho"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            {!lines.length ? (
              <div className="empty-cart">
                <PartGlyph kind="basket" size={56} />
                <h3>Seu carrinho está vazio.</h3>
                <p>Escolha um equipamento na loja para começar.</p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link
                    href="/loja/"
                    className="button"
                    onClick={() => setOpen(false)}
                  >
                    Conhecer os equipamentos
                  </Link>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => setOpen(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="cart-lines">
                  {lines.map((line) => {
                    const p = products.find((x) => x.id === line.id);
                    if (!p) return null;
                    return (
                      <div className="cart-line" key={line.id}>
                        <Link
                          href={`/produto/${p.id}/`}
                          onClick={() => setOpen(false)}
                          className="cart-photo"
                        >
                          <img src={`/images/${p.image}.webp`} alt={p.name} />
                        </Link>
                        <div>
                          <span className="micro">{p.category}</span>
                          <Link
                            href={`/produto/${p.id}/`}
                            onClick={() => setOpen(false)}
                          >
                            <h3>{p.name}</h3>
                          </Link>
                          <strong>{money(p.price * line.qty)}</strong>
                          <Quantity
                            value={line.qty}
                            onChange={(n) => change(line.id, n)}
                            name={p.name}
                          />
                        </div>
                        <button
                          className="remove-item"
                          aria-label={`Remover ${p.name}`}
                          onClick={() => change(line.id, 0)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{money(subtotal)}</strong>
                  </div>
                  <p>
                    Catálogo demonstrativo. Valores ilustrativos, sem cobrança.
                  </p>
                  <Link
                    href="/checkout/"
                    className="button"
                    onClick={() => setOpen(false)}
                  >
                    Revisar seleção e continuar
                  </Link>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => setOpen(false)}
                  >
                    Continuar comprando
                  </button>
                </div>
              </>
            )}
          </FocusPanel>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && !open && (
          <motion.div
            role="status"
            className="toast"
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 25, opacity: 0 }}
          >
            <PartGlyph kind="check" size={17} />
            {toast}
            <button onClick={() => setOpen(true)}>Abrir seleção</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-heading">
        <img
          src="/images/logo.webp"
          alt="BMF Bombas — Eletro Ivo"
          width="130"
          height="60"
        />
        <p>
          Mais de 17 anos em Brasília.
          <br />
          Especialistas em bombas d’água, poços e motores elétricos.
        </p>
        <div className="footer-phones">
          <a
            href={whatsapp("Olá! Preciso de atendimento da BMF Bombas.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            (61) 99697-1240 (WhatsApp)
          </a>
        </div>
      </div>
      <div className="footer-details">
        <div>
          <span>Atendimento & Emergências</span>
          <a
            href={whatsapp("Olá! Preciso de atendimento da BMF.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conversar no WhatsApp
          </a>
          <a href="tel:+5561996971240">Telefone: (61) 99697-1240</a>
          <a
            href="https://www.instagram.com/bmf_bombas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram / @bmf_bombas
          </a>
        </div>
        <div>
          <span>Sede & Oficina</span>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            Quadra ADE Sul, Conjunto 06, Lote 06
            <br />
            Samambaia, Brasília / DF · CEP 72314-706
          </a>
          <p>
            Segunda a sexta, 08h às 18h.
            <br />
            Atendimento para condomínios, empresas e residências.
          </p>
        </div>
        <div>
          <span>Contratos & Especialidades</span>
          <Link href="/servicos/?aba=contratos">Contratos: Preventiva & Corretiva</Link>
          <Link href="/servicos/?aba=motores">Motores Elétricos & Rebobinamento</Link>
          <Link href="/servicos/?aba=bombas">Motobombas & Poços Artesianos</Link>
          <Link href="/servicos/?aba=ferramentas">Ferramentas Elétricas & Obras</Link>
          <Link href="/trabalhe-conosco/">Trabalhe Conosco (Vagas & Equipe)</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          BMF Comércio de Bombas — Eletro Ivo - Bombas, Motores e Ferramentas LTDA
          <br />
          CNPJ 11.042.318/0001-51 · Fundação em 2009 (Mais de 17 anos de tradição no DF)
        </p>
        <span>© {new Date().getFullYear()} BMF Bombas</span>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          Voltar ao começo ↑
        </button>
      </div>
      <a
        href={whatsapp("Olá! Gostaria de falar com a equipe técnica da BMF Bombas.")}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Falar com a BMF no WhatsApp"
        title="Falar no WhatsApp: (61) 99697-1240"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.031 2c-5.516 0-9.999 4.486-9.999 10.004 0 1.766.461 3.49 1.337 5.01L2 22l5.122-1.343a9.957 9.957 0 0 0 4.906 1.292h.004c5.515 0 9.998-4.486 9.998-10.004 0-2.673-1.04-5.186-2.928-7.075A9.936 9.936 0 0 0 12.031 2zm5.828 14.298c-.246.693-1.434 1.326-1.988 1.409-.508.075-1.15.107-1.856-.117-.428-.136-.977-.318-1.681-.622-2.959-1.277-4.891-4.258-5.039-4.455-.147-.197-1.203-1.601-1.203-3.054 0-1.453.761-2.167 1.031-2.463.271-.296.59-.37.787-.37.197 0 .393.002.565.01.181.009.424-.069.663.507.246.591.835 2.045.909 2.193.074.148.123.32.025.517-.098.197-.148.32-.295.493-.147.172-.31.385-.442.517-.148.148-.302.309-.13.605.172.295.764 1.261 1.641 2.043 1.127 1.005 2.078 1.317 2.373 1.465.295.148.467.123.639-.074.172-.197.737-.862.934-1.158.197-.295.393-.246.664-.148.271.099 1.721.813 2.016.961.295.148.492.222.566.345.073.123.073.714-.173 1.407z" />
        </svg>
        <span className="whatsapp-float-label">WhatsApp</span>
      </a>
    </footer>
  );
}
