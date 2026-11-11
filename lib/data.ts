export const WHATSAPP = "https://wa.me/5561996971240";
export const PHONE_LANDLINE = "(61) 3458-3929";
export const PHONE_LANDLINE_RAW = "+556134583929";
export const PHONE_WHATSAPP = "(61) 99697-1240";
export const COMPANY_NAME = "BMF Comércio de Bombas";
export const COMPANY_LEGAL_NAME =
  "Eletro Ivo - Bombas, Motores e Ferramentas LTDA";
export const COMPANY_ADDRESS =
  "Quadra ADE Sul, Conjunto 06, Lote 06, Samambaia - Brasília/DF";
export const COMPANY_CEP = "72314-706";
export const FOUNDATION_YEAR = 2009;

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
      "Motor elétrico com carcaça aletada e montagem por pés. Rebobinamento técnico e manutenção especializada com bancada de testes na BMF.",
    specs: [
      ["Aplicação", "Equipamentos, compressores e maquinário"],
      ["Montagem", "Com pés / Flange"],
      ["Configuração", "Trifásico / Monofásico"],
      ["Garantia", "Suporte e oficina técnica BMF"],
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
      "Conjunto de bomba centrífuga e motor elétrico para recalque, poços artesianos e abastecimento predial. Dimensionamento técnico preciso.",
    specs: [
      ["Tipo", "Bomba centrífuga"],
      ["Aplicação", "Movimentação de água e poços artesianos"],
      ["Dimensionamento", "Conforme vazão e altura manométrica"],
      ["Instalação", "Equipe técnica própria no DF"],
    ],
  },
  {
    id: "furadeira-dewalt",
    name: "Furadeira DeWalt 20V MAX",
    category: "Ferramentas",
    image: "furadeira-dewalt",
    price: 890,
    tag: "LINHA PROFISSIONAL",
    description:
      "Furadeira e parafusadeira DeWalt 20V MAX Íon de Lítio com mandril de 1/2\" de aperto rápido. Resistência extrema para montagem e obras.",
    specs: [
      ["Alimentação", "Bateria 20V MAX Íon de Lítio"],
      ["Mandril", "1/2\" (13mm) aperto rápido"],
      ["Aplicação", "Perfuração e fixação pesada"],
      ["Disponibilidade", "Pronta entrega em Samambaia"],
    ],
  },
  {
    id: "martelete-makita",
    name: "Martelete Rompedor Makita",
    category: "Ferramentas",
    image: "martelete-makita",
    price: 1450,
    tag: "CONSTRUÇÃO CIVIL",
    description:
      "Martelete perfurador e rompedor Makita com maleta turquesa e encaixe SDS-Plus. Alta capacidade de impacto para perfuração em concreto.",
    specs: [
      ["Impacto", "2.7 Joules de força"],
      ["Encaixe", "SDS-Plus"],
      ["Aplicação", "Perfuração e demolição leve em concreto"],
      ["Acompanha", "Maleta rígida e punho lateral"],
    ],
  },
  {
    id: "bosch-combo",
    name: "Combo Perfurador & Esmerilhadeira Bosch",
    category: "Ferramentas",
    image: "bosch-combo",
    price: 1680,
    tag: "LINHA INDUSTRIAL",
    description:
      "Conjunto profissional Bosch com martelo perfurador e esmerilhadeira angular. Alto rendimento para canteiros de obras e serralherias.",
    specs: [
      ["Composição", "Martelo Perfurador + Esmerilhadeira Bosch"],
      ["Aplicação", "Corte, desbaste e perfuração pesada"],
      ["Uso", "Serviço contínuo industrial e construção civil"],
      ["Suporte", "Oficina e peças de reposição na BMF"],
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

export type Client = {
  name: string;
  category: string;
  image?: string;
  isGovernment?: boolean;
};

export const clients: Client[] = [
  {
    name: "Hospital HOME",
    category: "Complexo Hospitalar e Ortopédico DF",
    image: "/images/clients/hospital-home.png",
  },
  {
    name: "ParkShopping",
    category: "Multiplan — Brasília / DF",
    image: "/images/clients/park-shopping.png",
  },
  {
    name: "Rede D'Or São Luiz",
    category: "Maior Rede Integrada de Saúde",
    image: "/images/clients/rede-dor.png",
  },
  {
    name: "Sabin Medicina Diagnóstica",
    category: "Laboratórios e Diagnósticos no DF",
    image: "/images/clients/sabin.png",
  },
  {
    name: "Facilities & Condomínios",
    category: "Gestão Predial e Corporativa",
    image: "/images/clients/facilities.png",
  },
  {
    name: "Ministério da Economia",
    category: "Governo Federal / Órgão Público",
    isGovernment: true,
  },
];

export const differentiators = [
  {
    number: "01",
    title: "Mais de 17 Anos no DF",
    desc: "Fundada em 2009 em Samambaia, a BMF possui tradição sólida conhecendo a fundo as demandas de água, poços artesianos e motores de Brasília.",
  },
  {
    number: "02",
    title: "Atendimento Ágil / Zero Downtime",
    desc: "Em hospitais, condomínios ou canteiros de obra, parada de água é prejuízo imediato. Nossa estrutura atua rápido para restabelecer a operação.",
  },
  {
    number: "03",
    title: "Solução Completa e Oficina Própria",
    desc: "Do diagnóstico in loco, retirada e reinstalação no poço artesiano até rebobinamento em oficina própria, torno, solda, quadros e peças à pronta entrega.",
  },
  {
    number: "04",
    title: "Padrão de Missão Crítica",
    desc: "A mesma engenharia e rigor técnico homologados por grandes nomes de Brasília levados para o seu condomínio ou empresa com total transparência.",
  },
];

export const services = [
  {
    title: "Bombas d’Água e Poços Artesianos",
    short: "Manutenção e Poços",
    text: "Instalação, retirada e manutenção de bombas de poço artesiano e sistemas de captação hidráulica. Atendimento emergencial e preventivo com equipe técnica própria no DF.",
    image: "pump",
    items: [
      "Retirada e instalação de bombas de poço artesiano",
      "Conserto e manutenção preventiva de bombas d'água",
      "Sistemas de captação, pressurização e recalque",
    ],
  },
  {
    title: "Rebobinamento e Motores Elétricos",
    short: "Rebobinamento e Conserto",
    text: "Recuperação técnica e rebobinamento de motores elétricos monofásicos e trifásicos de todos os portes. Diagnóstico completo em bancada com testes de isolação e materiais de primeira linha.",
    image: "copper",
    items: [
      "Rebobinamento de motores elétricos em geral",
      "Diagnóstico elétrico, mecânico e testes de carga",
      "Manutenção de motores prediais, industriais e comerciais",
    ],
  },
  {
    title: "Ferramentas Elétricas e Máquinas Pesadas",
    short: "Ferramentas e Máquinas",
    text: "Conserto ágil de ferramentas elétricas industriais, máquinas de lavar alta pressão, enceradeiras industriais e motores vibradores para construção civil.",
    image: "category-tools",
    items: [
      "Furadeiras, lixadeiras e serras circulares",
      "Lavadoras de alta pressão e enceradeiras industriais",
      "Motores vibradores de concreto para obras",
    ],
  },
  {
    title: "Quadros de Comando e Automação",
    short: "Quadros e Automação",
    text: "Confecção, montagem e manutenção preventiva de painéis e quadros de comando elétrico. Proteção para sobrecarga, alternância automática de bombas e controle inteligente.",
    image: "maintenance",
    items: [
      "Confecção e reforma de quadros de comando elétrico",
      "Painéis de proteção e alternância de bombas",
      "Sistemas de partida suave e contatores industriais",
    ],
  },
  {
    title: "Torno, Solda e Locação para Construção",
    short: "Usinagem e Locação",
    text: "Serviços próprios de torno mecânico, usinagem rápida e solda especializada para recuperação de eixos e carcaças, além de venda de peças e locação de equipamentos para obras.",
    image: "category-motors",
    items: [
      "Serviços de torno mecânico e usinagem rápida",
      "Solda especializada para recuperação de eixos e carcaças",
      "Venda de peças de reposição e locação para obras",
    ],
  },
];
export const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=BMF+Bombas+ADE+Sul+Conjunto+06+Lote+06+Samambaia+DF";
export const mapEmbed =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.45890665687!2d-48.0733397!3d-15.885011400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2d36ddb8e78f%3A0xf7ca21b5bf05eb62!2sBmf%20bombas!5e0!3m2!1spt-BR!2sbr!4v1794425947293!5m2!1spt-BR!2sbr";
