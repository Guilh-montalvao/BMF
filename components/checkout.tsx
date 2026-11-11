"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Info,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  Truck,
  MapPin,
  CreditCard,
  QrCode,
  ShieldCheck,
} from "./glyphs";
import { useStore } from "./store";
import { money, products } from "@/lib/data";
import { ButtonLink } from "./ui";
export default function Checkout() {
  const { lines, subtotal, clear, ready } = useStore();
  const [stage, setStage] = useState(1);
  const [delivery, setDelivery] = useState("retirada");
  const [method, setMethod] = useState("pix");
  const [finished, setFinished] = useState(false);
  const [order, setOrder] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (stage === 1) {
      setStage(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setOrder(`BMF-DEMO-${Date.now().toString().slice(-6)}`);
      setFinished(true);
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if (!ready)
    return (
      <main id="conteudo" className="checkout-page">
        <p>Preparando seu carrinho…</p>
      </main>
    );
  if (finished)
    return (
      <main id="conteudo" className="checkout-page">
        <div className="checkout-confirm">
          <CheckCircle2 size={60} strokeWidth={1} />
          <span className="micro">{order} / DEMONSTRAÇÃO</span>
          <h1 className="mt-5">
            Simulação
            <br />
            <span className="blue">concluída.</span>
          </h1>
          <p>
            Você percorreu o checkout da BMF.
            <br />
            Esta foi uma simulação: nenhum pedido comercial foi enviado e nenhum
            pagamento foi cobrado. Seus dados não foram enviados para
            processamento.
          </p>
          <ButtonLink href="/loja/">Voltar para a loja</ButtonLink>
          <ButtonLink href="/" className="button-dark">
            Conhecer a BMF
          </ButtonLink>
        </div>
      </main>
    );
  if (!lines.length)
    return (
      <main id="conteudo" className="checkout-page">
        <div className="checkout-confirm">
          <ShoppingBag size={50} strokeWidth={1} />
          <h1>
            Seu carrinho
            <br />
            <span className="blue">está vazio.</span>
          </h1>
          <p>Escolha um equipamento na loja para continuar.</p>
          <ButtonLink href="/loja/">Explorar a loja</ButtonLink>
        </div>
      </main>
    );
  return (
    <main id="conteudo" className="checkout-page">
      <nav className="breadcrumbs">
        <Link href="/loja/">Loja</Link>
        <span>/</span>
        <span>Checkout</span>
      </nav>
      <h1>
        Finalizar
        <br />
        <span className="blue">sua seleção.</span>
      </h1>
      <div className="checkout-steps">
        <span className={stage === 1 ? "current" : ""}>01 / Seus dados</span>
        <span />
        <span className={stage === 2 ? "current" : ""}>02 / Pagamento</span>
        <span />
        <span>03 / Conclusão</span>
      </div>
      <div className="demo-banner">
        <Info size={17} />
        <p>
          <strong>Checkout de demonstração.</strong> Use dados fictícios para
          explorar. Nenhuma compra real será efetuada e nenhum dado de cartão
          será solicitado.
        </p>
      </div>
      <div className="checkout-grid">
        <form id="checkout-form" onSubmit={submit}>
          <div style={{ display: stage === 1 ? "block" : "none" }}>
            <section className="checkout-card">
              <h2>
                <span>01</span>Vamos conhecer você
              </h2>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="checkout-name">Nome completo *</label>
                  <input
                    id="checkout-name"
                    name="name"
                    placeholder="Ex.: Cliente Demonstração"
                    autoComplete="name"
                    required={stage === 1}
                    maxLength={100}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="checkout-email">E-mail *</label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    placeholder="cliente@exemplo.com"
                    autoComplete="email"
                    required={stage === 1}
                    maxLength={150}
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="checkout-phone">Telefone *</label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  placeholder="(61) 99999-9999"
                  autoComplete="tel"
                  required={stage === 1}
                  minLength={8}
                  maxLength={25}
                />
              </div>
            </section>
            <section className="checkout-card">
              <h2>
                <span>02</span>Como prefere receber?
              </h2>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "retirada"}
                    onChange={() => setDelivery("retirada")}
                  />
                  <MapPin size={18} />
                  Retirar na BMF
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === "entrega"}
                    onChange={() => setDelivery("entrega")}
                  />
                  <Truck size={18} />
                  Entrega no DF
                </label>
              </div>
              {delivery === "retirada" ? (
                <p className="form-note mt-5">
                  ADE — Samambaia, Brasília / DF. A retirada real dependerá da
                  confirmação da equipe. Esta seleção é demonstrativa.
                </p>
              ) : (
                <div className="mt-5">
                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="checkout-cep">CEP *</label>
                      <input
                        id="checkout-cep"
                        name="cep"
                        inputMode="numeric"
                        placeholder="00000-000"
                        required={stage === 1 && delivery === "entrega"}
                        pattern="[0-9]{5}-?[0-9]{3}"
                        maxLength={9}
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="checkout-city">Cidade / região *</label>
                      <input
                        id="checkout-city"
                        name="city"
                        placeholder="Ex.: Samambaia — DF"
                        required={stage === 1 && delivery === "entrega"}
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="checkout-address">
                      Endereço completo *
                    </label>
                    <input
                      id="checkout-address"
                      name="address"
                      placeholder="Rua, número e complemento"
                      required={stage === 1 && delivery === "entrega"}
                      maxLength={200}
                    />
                  </div>
                  <p className="form-note mt-4">
                    Frete e prazo serão calculados quando as vendas forem
                    ativadas. Nenhum valor de frete está sendo cobrado nesta
                    demonstração.
                  </p>
                </div>
              )}
            </section>
          </div>
          {stage === 2 && (
            <section className="checkout-card">
              <h2>
                <span>03</span>Explore a forma de pagamento
              </h2>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="payment"
                    checked={method === "pix"}
                    onChange={() => setMethod("pix")}
                  />
                  <QrCode size={19} />
                  Pix
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="payment"
                    checked={method === "card"}
                    onChange={() => setMethod("card")}
                  />
                  <CreditCard size={19} />
                  Cartão
                </label>
              </div>
              <div className="demo-banner mt-6 mb-5">
                <ShieldCheck size={18} />
                <p>
                  {method === "pix"
                    ? "Nenhum QR Code real será gerado nesta demonstração."
                    : "Não solicitamos dados de cartão nesta demonstração."}{" "}
                  Ao concluir, você verá apenas a confirmação da simulação.
                </p>
              </div>
              <button
                type="button"
                className="text-link"
                onClick={() => setStage(1)}
              >
                <ArrowLeft size={15} /> Voltar aos dados
              </button>
            </section>
          )}
        </form>
        <aside className="checkout-summary">
          <h2>Resumo da seleção</h2>
          {lines.map((line) => {
            const p = products.find((x) => x.id === line.id)!;
            return (
              <div className="checkout-summary-line" key={line.id}>
                <img src={`/images/${p.image}.webp`} alt={p.name} />
                <div>
                  <h3>{p.name}</h3>
                  <p>Quantidade: {line.qty}</p>
                </div>
                <strong>{money(p.price * line.qty)}</strong>
              </div>
            );
          })}
          <div className="checkout-totals">
            <div>
              <span>Subtotal demonstrativo</span>
              <span>{money(subtotal)}</span>
            </div>
            <div>
              <span>
                {delivery === "retirada" ? "Retirada na BMF" : "Frete"}
              </span>
              <span>
                {delivery === "retirada" ? "A combinar" : "A definir"}
              </span>
            </div>
            <div>
              <span>Total dos produtos</span>
              <strong>{money(subtotal)}</strong>
            </div>
          </div>
          <button
            type="submit"
            form="checkout-form"
            className="button button-dark"
          >
            {stage === 1 ? "Continuar para pagamento" : "Concluir simulação"}
            <ArrowRight size={17} />
          </button>
          <p>
            Ambiente demonstrativo · Sem cobrança.
            <br />
            Preços e produtos ilustrativos.
          </p>
        </aside>
      </div>
    </main>
  );
}
