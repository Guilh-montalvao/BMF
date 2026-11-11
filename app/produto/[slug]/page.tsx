import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: products.find((p) => p.id === slug)?.name || "Produto" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
