"use client";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "./glyphs";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Product, money } from "@/lib/data";
import { useStore } from "./store";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <Link
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
    </Link>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</div>
  );
}
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { add } = useStore();
  return (
    <Reveal delay={index * 0.04} className="product-card">
      <Link href={`/produto/${product.id}/`} className="product-visual">
        <img
          src={`/images/${product.image}.webp`}
          alt={product.name}
          loading="lazy"
        />
        <span className="product-image-caption">imagem ilustrativa</span>
      </Link>
      <div className="product-description">
        <span className="product-category">{product.category}</span>
        <Link href={`/produto/${product.id}/`}>
          <h3>{product.name}</h3>
        </Link>
        <p>{product.specs[0][1]}</p>
        <Link className="product-detail-link" href={`/produto/${product.id}/`}>
          Ver detalhes do equipamento
        </Link>
      </div>
      <div className="product-purchase">
        <strong>{money(product.price)}</strong>
        <small>valor demonstrativo</small>
        <button
          aria-label={`Adicionar ${product.name} ao carrinho`}
          onClick={() => add(product.id)}
        >
          Adicionar
        </button>
      </div>
    </Reveal>
  );
}
export function Quantity({
  value,
  onChange,
  name = "Quantidade",
}: {
  value: number;
  onChange: (n: number) => void;
  name?: string;
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        aria-label={`Diminuir ${name}`}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label={`Aumentar ${name}`}
        onClick={() => onChange(Math.min(99, value + 1))}
      >
        +
      </button>
    </div>
  );
}
export { ArrowUpRight, ArrowRight, Check };
