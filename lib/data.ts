export const WHATSAPP = "https://wa.me/5561996971240";
export const whatsapp = (text: string) =>
  `${WHATSAPP}?text=${encodeURIComponent(text)}`;
export const money = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    n,
  );
export type Category = "Todos" | "Motores" | "Bombas" | "Ferramentas";
export type Product = {
  id: string;
  name: string;
  category: Category;
  image: string;
  price: number;
  tag: string;
  description: string;
  specs: [string, string][];
};
export const products: Product[] = [
  {
    id: "motor-industrial",
    name: "Motor elétrico industrial",
    category: "Motores",
    image: "motor",
    price: 1290,
    tag: "LINHA INDUSTRIAL",
    description:
      "Motor elétrico com carcaça aletada e montagem por pés. A potência, a tensão e o modelo exatos serão definidos no catálogo comercial. Esta peça é demonstrativa.",
    specs: [
      ["Aplicação", "Equipamentos e máquinas"],
      ["Montagem", "Com pés"],
      ["Configuração", "A definir no catálogo real"],
      ["Imagem", "Ilustrativa"],
    ],
  },
  {
    id: "bomba-centrifuga",
    name: "Conjunto motobomba",
    category: "Bombas",
    image: "pump",
    price: 1890,
    tag: "LINHA HIDRÁULICA",
    description:
      "Conjunto de bomba centrífuga e motor elétrico para movimentação de água. O dimensionamento depende da vazão, da altura e da aplicação. Produto demonstrativo.",
    specs: [
      ["Tipo", "Bomba centrífuga"],
      ["Aplicação", "Movimentação de água"],
      ["Dimensionamento", "Conforme a necessidade"],
      ["Imagem", "Ilustrativa"],
    ],
  },
  {
    id: "ferramentas-oficina",
    name: "Ferramentas para oficina",
    category: "Ferramentas",
    image: "category-tools",
    price: 349,
    tag: "LINHA PROFISSIONAL",
    description:
      "Seleção ilustrativa de ferramentas manuais para montagem e manutenção. A composição do conjunto será definida no catálogo comercial.",
    specs: [
      ["Categoria", "Ferramentas manuais"],
      ["Aplicação", "Montagem e manutenção"],
      ["Composição", "A definir no catálogo real"],
      ["Imagem", "Ilustrativa"],
    ],
  },
];
export const categories = [
  {
    name: "Motores",
    image: "category-motors",
    subtitle: "Motores elétricos",
    number: "01",
  },
  {
    name: "Bombas",
    image: "category-pumps",
    subtitle: "Bombas para água",
    number: "02",
  },
  {
    name: "Ferramentas",
    image: "category-tools",
    subtitle: "Ferramentas de trabalho",
    number: "03",
  },
];
export const services = [
  {
    title: "Motores elétricos e rebobinamento",
    short: "Rebobinamento e conserto",
    text: "Diagnóstico, conserto e rebobinamento de motores elétricos. Conte com orientação para entender a manutenção adequada ao seu equipamento.",
    image: "copper",
    items: [
      "Rebobinamento de motores elétricos",
      "Diagnóstico e reparação",
      "Manutenção de equipamentos industriais",
    ],
  },
  {
    title: "Bombas d’água e de poço",
    short: "Manutenção hidráulica",
    text: "Manutenção de bombas d’água, equipamentos hidráulicos e pneumáticos. Serviços de retirada e instalação de bombas de poço artesiano sob avaliação.",
    image: "pump",
    items: [
      "Conserto de bombas d’água",
      "Retirada e instalação de bombas de poço",
      "Equipamentos hidráulicos e pneumáticos",
    ],
  },
  {
    title: "Ferramentas e equipamentos",
    short: "Reparação de ferramentas",
    text: "Conserto de ferramentas elétricas, enceradeiras industriais e equipamentos de limpeza de alta pressão. Fale com a BMF sobre o seu modelo.",
    image: "category-tools",
    items: [
      "Furadeiras, serras e lixadeiras",
      "Enceradeiras industriais",
      "Lavadoras de alta pressão",
    ],
  },
  {
    title: "Torno, solda e instalação elétrica",
    short: "Outros serviços e equipamentos",
    text: "Serviços de torno, solda e instalação elétrica predial, além de venda de equipamentos, peças e locação para construção civil. Consulte disponibilidade.",
    image: "maintenance",
    items: [
      "Torno e solda",
      "Instalação elétrica predial",
      "Peças e locação de equipamentos",
    ],
  },
];
export const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=BMF+Bombas+Samambaia+DF";
export const mapEmbed =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.45890665687!2d-48.0733397!3d-15.885011400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2d36ddb8e78f%3A0xf7ca21b5bf05eb62!2sBmf%20bombas!5e0!3m2!1spt-BR!2sbr!4v1794425947293!5m2!1spt-BR!2sbr";
