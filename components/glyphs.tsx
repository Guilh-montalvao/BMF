import type { SVGProps, ReactNode } from "react";
type Props = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };
type Kind =
  | "motor"
  | "pump"
  | "tools"
  | "truck"
  | "basket"
  | "close"
  | "check"
  | "chat"
  | "pin"
  | "search"
  | "info"
  | "card"
  | "qr"
  | "shield"
  | "back"
  | "next"
  | "plus"
  | "minus"
  | "trash"
  | "camera";
const lines: Record<Kind, ReactNode> = {
  motor: (
    <>
      <path d="M7 6h12v12H7zM9 6V4h6v2M9 8v8m3-8v8m3-8v8m3-8v8M7 10H3v4h4M8 18l-1 3m11-3 1 3M4 21h7m5 0h6M19 8h3v8h-3" />
    </>
  ),
  pump: (
    <>
      <circle cx="11" cy="13" r="7" />
      <circle cx="11" cy="13" r="3" />
      <path d="M11 6V2h6v7m-3 10v3H8v-3M3 11H1v4h2M17 10h5v7h-5" />
    </>
  ),
  tools: (
    <path d="m14 3 3 3-2 4-4 1-7 9-3-3 9-7 1-4 3-3zM3 4l4 3M2 2l3 1 2 4-2 2-3-4V2zm10 12 7 7 3-3-7-7" />
  ),
  truck: (
    <>
      <path d="M2 9h12V5h4l4 5v9H2V9zm12 0v6h8M16 7v4h5M2 14h10" />
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
    </>
  ),
  basket: <path d="M3 9h18l-2 12H5L3 9zm4 0 3-6m7 6-3-6M9 12v6m6-6v6" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  check: <path d="m4 12 5 6L21 5" />,
  chat: <path d="M3 3h18v14H9l-6 5V3zM7 8h10M7 12h7" />,
  pin: (
    <>
      <path d="M18 9c0 5-6 12-6 12S6 14 6 9a6 6 0 0 1 12 0z" />
      <circle cx="12" cy="9" r="2" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 7 7" />
    </>
  ),
  info: <path d="M3 3h18v18H3zM12 10v7M12 6v1" />,
  card: <path d="M2 5h20v14H2zM2 10h20M6 15h4" />,
  qr: (
    <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM14 14h3v3h4v4h-3m-5-3v3m8-7v-2" />
  ),
  shield: (
    <>
      <path d="m12 2 8 3v7c0 6-8 10-8 10S4 18 4 12V5l8-3z" />
      <path d="m8 11 3 3 5-6" />
    </>
  ),
  back: <path d="M21 12H3m7-7-7 7 7 7" />,
  next: <path d="M3 12h18m-7-7 7 7-7 7" />,
  plus: <path d="M12 3v18M3 12h18" />,
  minus: <path d="M3 12h18" />,
  trash: <path d="M3 5h18M8 5V2h8v3M6 5l1 17h10l1-17M10 9v9m4-9v9" />,
  camera: (
    <>
      <path d="M3 7h5l2-3h5l2 3h4v14H3V7z" />
      <circle cx="12" cy="14" r="4" />
    </>
  ),
};
export function PartGlyph({
  kind,
  size = 24,
  strokeWidth = 1.35,
  ...props
}: Props & { kind: Kind }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
      strokeLinecap="square"
      aria-hidden="true"
      {...props}
    >
      {lines[kind]}
    </svg>
  );
}
const icon = (kind: Kind) =>
  function Icon(props: Props) {
    return <PartGlyph kind={kind} {...props} />;
  };
export const ArrowUpRight = icon("next"),
  ArrowRight = icon("next"),
  ArrowLeft = icon("back"),
  Plus = icon("plus"),
  Minus = icon("minus"),
  Check = icon("check"),
  CheckCircle2 = icon("check"),
  X = icon("close"),
  ShoppingBag = icon("basket"),
  MessageCircle = icon("chat"),
  Truck = icon("truck"),
  MapPin = icon("pin"),
  Search = icon("search"),
  Info = icon("info"),
  CreditCard = icon("card"),
  QrCode = icon("qr"),
  ShieldCheck = icon("shield"),
  Trash2 = icon("trash"),
  SlidersHorizontal = icon("tools");
