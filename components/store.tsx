"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { products } from "@/lib/data";
type Line = { id: string; qty: number };
type Store = {
  lines: Line[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string, qty?: number) => void;
  change: (id: string, qty: number) => void;
  clear: () => void;
  toast: string;
  ready: boolean;
};
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("bmf-cart-v1") || "[]");
      if (Array.isArray(raw)) {
        const valid = raw.filter(
          (x: Line) =>
            products.some((p) => p.id === x.id) &&
            Number.isInteger(x.qty) &&
            x.qty > 0 &&
            x.qty < 100,
        );
        setLines((current) => (current.length > 0 ? current : valid));
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready && typeof window !== "undefined") {
      try {
        localStorage.setItem("bmf-cart-v1", JSON.stringify(lines));
      } catch {}
    }
  }, [lines, ready]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);
  const add = (id: string, qty = 1) => {
    if (!products.find((p) => p.id === id)) return;
    setLines((prev) => {
      const match = prev.find((x) => x.id === id);
      const next = match
        ? prev.map((x) =>
            x.id === id ? { ...x, qty: Math.min(99, x.qty + qty) } : x,
          )
        : [...prev, { id, qty }];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("bmf-cart-v1", JSON.stringify(next));
        } catch {}
      }
      return next;
    });
    setToast("Produto adicionado ao carrinho");
  };
  const change = (id: string, qty: number) =>
    setLines((prev) => {
      const next =
        qty <= 0
          ? prev.filter((x) => x.id !== id)
          : prev.map((x) => (x.id === id ? { ...x, qty: Math.min(99, qty) } : x));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("bmf-cart-v1", JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  const clear = () => {
    setLines([]);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("bmf-cart-v1");
      } catch {}
    }
  };
  return (
    <Context.Provider
      value={{
        lines,
        count: lines.reduce((n, x) => n + x.qty, 0),
        subtotal: lines.reduce(
          (n, x) =>
            n + (products.find((p) => p.id === x.id)?.price || 0) * x.qty,
          0,
        ),
        open,
        setOpen,
        add,
        change,
        clear: () => setLines([]),
        toast,
        ready,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useStore = () => {
  const value = useContext(Context);
  if (!value) throw new Error("StoreProvider required");
  return value;
};
