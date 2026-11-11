"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PartGlyph, X, Trash2 } from "./glyphs";
import { useStore } from "./store";
import { money, products, whatsapp, mapUrl } from "@/lib/data";
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
        initial={reduced ? false : { y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 70, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
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
    { href: "/loja/", label: "Loja", kind: "basket" as const },
    { href: "/servicos/", label: "Oficina", kind: "tools" as const },
    { href: "/#coleta", label: "Coleta", kind: "truck" as const },
    { href: "/#contato", label: "Onde estamos", kind: "pin" as const },
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
                    className="text-button"
                    onClick={() => setOpen(false)}
                  >
                    Voltar aos equipamentos
                  </button>
                </div>
              </>
            )}
          </FocusPanel>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
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
        <img src="/images/logo.webp" alt="BMF" width="130" height="60" />
        <p>
          Uma oficina.
          <br />
          Várias formas de ajudar.
        </p>
        <a href="tel:+5561996971240">(61) 99697-1240</a>
      </div>
      <div className="footer-details">
        <div>
          <span>Atendimento</span>
          <a
            href={whatsapp("Olá! Preciso de atendimento da BMF.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conversar no WhatsApp
          </a>
          <a
            href="https://www.instagram.com/bmf_bombas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram / @bmf_bombas
          </a>
        </div>
        <div>
          <span>A oficina</span>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            ADE — Samambaia, Brasília / DF
            <br />
            CEP 72314-708
          </a>
          <p>
            Segunda a sexta, 08h às 18h.
            <br />
            Feriados: consulte a equipe.
          </p>
        </div>
        <div>
          <span>Equipamentos & serviços</span>
          <Link href="/loja/">Comprar equipamentos</Link>
          <Link href="/servicos/">Solicitar manutenção</Link>
          <Link href="/#coleta">Combinar coleta e entrega</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Eletro Ivo — Bombas, Motores e Ferramentas LTDA
          <br />
          CNPJ 11.042.318/0001-51
        </p>
        <span>© {new Date().getFullYear()} BMF</span>
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
          Voltar ao começo
        </button>
      </div>
    </footer>
  );
}
