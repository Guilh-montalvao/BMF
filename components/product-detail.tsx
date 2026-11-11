"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  MessageCircle,
  Info,
} from "./glyphs";
import { Product, products, money, whatsapp } from "@/lib/data";
import { useStore } from "./store";
import { Eyebrow, Quantity, ProductCard } from "./ui";
export default function ProductDetail({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useStore();
  return (
    <main id="conteudo" className="product-page">
      <nav className="breadcrumbs" aria-label="Caminho de navegação">
        <Link href="/">Início</Link>
        <span>/</span>
        <Link href="/loja/">Loja</Link>
        <span>/</span>
        <Link href={`/loja/?categoria=${p.category}`}>{p.category}</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>
      <div className="product-detail">
        <div className="detail-visual">
          <img src={`/images/${p.image}.webp`} alt={p.name} />
          <span className="detail-image-note">
            IMAGEM ILUSTRATIVA / SELEÇÃO DEMONSTRATIVA
          </span>
        </div>
        <div className="detail-copy">
          <Eyebrow>{p.tag}</Eyebrow>
          <h1>{p.name}</h1>
          <p>{p.description}</p>
          <div className="detail-price">
            <strong>{money(p.price)}</strong>
            <small>
              Preço ilustrativo para demonstrar a experiência de compra.
            </small>
          </div>
          <div className="detail-buy">
            <Quantity
              value={qty}
              onChange={(n) => setQty(Math.max(1, Math.min(99, n)))}
            />
            <button
              className="button button-dark"
              onClick={() => {
                add(p.id, qty);
                setOpen(true);
              }}
            >
              <ShoppingBag size={17} />
              Adicionar ao carrinho <ArrowUpRight size={17} />
            </button>
          </div>
          <a
            className="detail-help"
            href={whatsapp(
              `Olá! Gostaria de informações sobre ${p.name.toLowerCase()} e os modelos disponíveis na BMF.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            Confirmar aplicação com a BMF <ArrowUpRight size={16} />
          </a>
          <div className="detail-specs">
            <h3>Conheça a aplicação</h3>
            {p.specs.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className="demo-banner mt-6">
            <Info size={16} />
            <p>
              Produto demonstrativo. Modelo, configuração, preço e
              disponibilidade serão definidos no catálogo comercial. Nenhuma
              venda real está ativa.
            </p>
          </div>
        </div>
      </div>
      <section className="related-products">
        <h2>Outros equipamentos</h2>
        <div className="product-grid">
          {products
            .filter((x) => x.id !== p.id)
            .map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
        </div>
      </section>
    </main>
  );
}
