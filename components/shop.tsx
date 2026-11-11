"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, Info } from "./glyphs";
import { products, Category, whatsapp } from "@/lib/data";
import { ButtonLink, Eyebrow, ProductCard } from "./ui";
export default function Shop() {
  const params = useSearchParams();
  const [category, setCategory] = useState<Category>("Todos"),
    [query, setQuery] = useState(""),
    [sort, setSort] = useState("featured");
  useEffect(() => {
    const cat = params.get("categoria");
    setCategory(
      ["Motores", "Bombas", "Ferramentas"].includes(cat || "")
        ? (cat as Category)
        : "Todos",
    );
  }, [params]);
  const filtered = useMemo(() => {
    const normalize = (s: string) =>
      s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    const result = products.filter(
      (p) =>
        (category === "Todos" || p.category === category) &&
        normalize(`${p.name} ${p.category} ${p.description}`).includes(
          normalize(query),
        ),
    );
    return sort === "price-asc"
      ? result.sort((a, b) => a.price - b.price)
      : sort === "price-desc"
        ? result.sort((a, b) => b.price - a.price)
        : sort === "name"
          ? result.sort((a, b) => a.name.localeCompare(b.name))
          : result;
  }, [category, query, sort]);
  return (
    <main id="conteudo" className="store-main">
      <section className="catalog-heading">
        <div>
          <Eyebrow>A loja da BMF</Eyebrow>
          <h1>
            Equipamentos para
            <br />o seu trabalho.
          </h1>
          <p>
            Selecione uma categoria ou procure pelo nome.
            <br />
            Se precisar dimensionar, converse com a oficina.
          </p>
        </div>
        <img
          src="/images/shop-banner.webp"
          alt="Seleção ilustrativa de motores e bomba d’água"
        />
      </section>
      <div className="catalog-layout">
        <aside className="catalog-filters">
          <h2>O que você procura?</h2>
          <div className="filter-buttons" aria-label="Filtrar por categoria">
            {(["Todos", "Motores", "Bombas", "Ferramentas"] as Category[]).map(
              (cat) => (
                <button
                  key={cat}
                  className={category === cat ? "selected" : ""}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                >
                  {cat}
                </button>
              ),
            )}
          </div>
          <div className="catalog-filter-note">
            Potência, tensão e aplicação fazem diferença na escolha.
            <a
              href={whatsapp(
                "Olá! Preciso de orientação para escolher um equipamento.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero orientação da BMF
            </a>
          </div>
        </aside>
        <section className="catalog-results">
          <div className="demo-banner">
            <Info size={16} />
            <p>
              <strong>Catálogo demonstrativo.</strong> Produtos, imagens e
              preços ilustrativos. As vendas reais ainda não estão ativadas.
            </p>
          </div>
          <div className="store-controls">
            <div className="store-search">
              <Search size={17} />
              <input
                type="search"
                aria-label="Buscar produtos"
                placeholder="Nome do equipamento ou categoria"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button aria-label="Limpar busca" onClick={() => setQuery("")}>
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
          <div className="store-toolbar">
            <span aria-live="polite">
              {filtered.length}{" "}
              {filtered.length === 1
                ? "equipamento encontrado"
                : "equipamentos encontrados"}
            </span>
            <label>
              <span className="sr-only">Ordenar produtos</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Ordenar produtos"
              >
                <option value="featured">Organização da loja</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="name">Nome: A–Z</option>
              </select>
            </label>
          </div>
          {filtered.length ? (
            <div className="product-grid">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <Search size={27} className="mx-auto" />
              <h2>Nenhum equipamento por aqui.</h2>
              <p>Tente outro nome ou selecione outra categoria.</p>
              <button
                className="button button-secondary"
                onClick={() => {
                  setQuery("");
                  setCategory("Todos");
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
          <div className="store-support">
            <div>
              <h3>Não encontrou o que precisa?</h3>
              <p>Pergunte à equipe sobre modelos, peças e disponibilidade.</p>
            </div>
            <ButtonLink
              href={whatsapp(
                "Olá! Estou procurando um equipamento ou peça. Podem me ajudar?",
              )}
            >
              Consultar a BMF
            </ButtonLink>
          </div>
        </section>
      </div>
    </main>
  );
}
