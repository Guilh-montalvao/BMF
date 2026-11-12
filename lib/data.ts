export const WHATSAPP = "https://wa.me/5561996971240";
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
    image: "elements/pilar-visita",
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
    image: "bosch-combo",
    subtitle: "Ferramentas de trabalho",
    number: "03",
  },
];

export type Client = {
  name: string;
  category: string;
  image?: string;
  isGovernment?: boolean;
  highlight?: string;
};

export const clients: Client[] = [
  {
    name: "Mercosul Motores",
    category: "Parceiro Oficial & Fabricante Nacional",
    image: "/images/mercosul.webp",
    highlight: "Assistência e Parceria Técnica Autorizada",
  },
  {
    name: "Ministério de Minas e Energia",
    category: "Governo Federal · Esplanada dos Ministérios",
    image: "/images/mme.webp",
    isGovernment: true,
  },
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
];

export const differentiators = [
  {
    number: "01",
    tag: "GESTÃO RECORRENTE · B2B & CONDOMÍNIOS",
    title: "Contratos de Manutenção Preventiva e Corretiva",
    image: "/images/elements/contrato-ciclo-motor.webp",
    specLabel: "CICLO PREVENTIVO + CORRETIVO",
    specValue: "SLA prioritário · Visitas periódicas · Previsibilidade",
    desc: "Não espere a bomba principal queimar ou o motor parar a sua obra. Nossos contratos garantem inspeções periódicas in loco, relatórios técnicos e socorro prioritário para manter seus equipamentos sempre operando.",
    ctaLabel: "Conhecer planos de contrato",
    ctaHref: "/servicos/?aba=contratos",
  },
  {
    number: "02",
    tag: "CHECKLIST TÉCNICO PROGRAMADO",
    title: "Manutenção Preventiva com Diagnóstico Antecipado",
    image: "/images/elements/pilar-contratos.webp",
    specLabel: "PROTOCOLO DE INSPEÇÃO",
    specValue: "Megômetro · Corrente · Rolamentos · Selos · Quadros",
    desc: "Planos sob medida para condomínios, hospitais, indústrias e construtoras identificarem desgaste de rolamentos, aquecimento, perda de isolação e vazamentos antes que se tornem paradas críticas.",
    ctaLabel: "Ver escopo da preventiva",
    ctaHref: "/servicos/?aba=contratos",
  },
  {
    number: "03",
    tag: "ENGENHARIA EM CAMPO NO DF",
    title: "Visita Técnica In Loco para Entender e Resolver",
    image: "/images/elements/pilar-visita.webp",
    specLabel: "COBERTURA PRESENCIAL",
    specValue: "Brasília e Entorno · Casa de Bombas · Poços · Obras",
    desc: "Nossa equipe vai até o cliente para inspecionar a casa de bombas, poço artesiano ou quadro elétrico no local, diagnosticar a causa raiz do problema e executar a retirada e reinstalação técnica.",
    ctaLabel: "Agendar visita técnica",
    ctaHref: "#coleta",
  },
  {
    number: "04",
    tag: "INFRAESTRUTURA PRÓPRIA · DESDE 2009",
    title: "Oficina Completa de Rebobinamento, Torno e Bancada",
    image: "/images/elements/pilar-oficina.webp",
    specLabel: "SEDE PRÓPRIA EM SAMAMBAIA",
    specValue: "Rebobinamento · Torno mecânico · Solda · Testes",
    desc: "Mais de 17 anos de tradição com bancada de rebobinamento de motores, usinagem própria em torno mecânico, montagem de painéis elétricos e peças de reposição sem depender de terceiros.",
    ctaLabel: "Conhecer nossa oficina",
    ctaHref: "/servicos/?aba=motores",
  },
  {
    number: "05",
    tag: "OPERAÇÃO CONTÍNUA · ZERO DOWNTIME",
    title: "Padrão de Missão Crítica Homologado no DF",
    image: "/images/elements/pilar-missao-critica.webp",
    specLabel: "CONFIABILIDADE OPERACIONAL",
    specValue: "Hospitais · Shoppings · Órgãos Federais · Indústrias",
    desc: "A mesma engenharia, conformidade técnica e velocidade de resposta exigidas pelas operações mais críticas de Brasília aplicadas diretamente ao seu condomínio, construtora ou empresa.",
    ctaLabel: "Falar com especialista",
    ctaHref: "/servicos/",
  },
];

export type ServiceTab = {
  id: string;
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: { title: string; text: string }[];
  checklist: string[];
  ctaText: string;
  whatsappPrompt: string;
};

export const serviceTabs: ServiceTab[] = [
  {
    id: "contratos",
    label: "Contratos (Preventiva & Corretiva)",
    badge: "MODALIDADE PRINCIPAL · B2B & CONDOMÍNIOS",
    title: "Contratos de Manutenção Preventiva e Corretiva",
    subtitle:
      "Previsibilidade operacional, visitas técnicas programadas e socorro prioritário para quem não pode parar.",
    description:
      "Um motor queimado ou uma bomba parada sem aviso gera falta d'água em condomínios, paralisa obras e compromete operações hospitalares e comerciais. Com o Contrato de Manutenção BMF, sua operação conta com acompanhamento técnico contínuo, manutenção preventiva programada e atendimento corretivo imediato.",
    image: "elements/contrato-ciclo-motor",
    highlights: [
      {
        title: "Manutenção Preventiva Programada",
        text: "Visitas periódicas para medição de isolação elétrica (megômetro), corrente, tensão, análise de ruído/vibração, troca programada de rolamentos e selos mecânicos e revisão de quadros de comando.",
      },
      {
        title: "Manutenção Corretiva Prioritária",
        text: "Em caso de falha ou parada súbita, clientes sob contrato possuem prioridade na visita técnica, retirada em campo, rebobinamento em bancada própria e reinstalação ágil.",
      },
      {
        title: "Visita Técnica Diagnóstica",
        text: "Antes de fechar o contrato ou iniciar um reparo complexo, vamos até o seu endereço em Brasília e entorno para levantar todos os motores, bombas e quadros instalados.",
      },
    ],
    checklist: [
      "Cronograma mensal ou quinzenal de inspeção preventiva in loco",
      "Relatório técnico com diagnóstico de desgaste antes da quebra",
      "Atendimento emergencial prioritário para bombas d'água e motores críticos",
      "Coleta, transporte seguro e reinstalação pela equipe própria da BMF",
      "Cobertura para motores elétricos, motobombas, poços artesianos, quadros e frotas de ferramentas",
    ],
    ctaText: "Solicitar visita técnica para contrato",
    whatsappPrompt:
      "Olá! Gostaria de agendar uma visita técnica e conhecer os Contratos de Manutenção Preventiva e Corretiva da BMF.",
  },
  {
    id: "motores",
    label: "Motores Elétricos",
    badge: "OFICINA DE REBOBINAMENTO PRÓPRIA",
    title: "Manutenção e Rebobinamento de Motores Elétricos",
    subtitle:
      "Recuperação eletromecânica completa de motores monofásicos e trifásicos de todos os portes.",
    description:
      "Executamos manutenção preventiva e corretiva em motores elétricos industriais, prediais e comerciais. Nossa oficina em Samambaia realiza desde o rebobinamento completo com fios de cobre de alta isolação térmica até a recuperação mecânica de eixos e tampas em torno próprio.",
    image: "elements/pilar-oficina",
    highlights: [
      {
        title: "Rebobinamento Técnico de Precisão",
        text: "Substituição completa do bobinado com materiais isolantes classe F/H, impregnação em verniz e secagem controlada em estufa.",
      },
      {
        title: "Revisão Mecânica e Usinagem",
        text: "Troca de rolamentos de primeira linha, embuchamento de tampas, recuperação de pontas de eixo no torno e balanceamento.",
      },
      {
        title: "Testes em Bancada antes da Entrega",
        text: "Medição de resistência ôhmica, teste de isolação com megômetro e ensaio de corrente nominal para garantir confiabilidade total.",
      },
    ],
    checklist: [
      "Motores elétricos trifásicos e monofásicos (WEG e principais marcas)",
      "Motores de bombas de recalque, compressores, exaustores e maquinário",
      "Motores vibradores e equipamentos para construção civil",
      "Manutenção preventiva com limpeza química, secagem e rejuvenescimento",
      "Coleta e entrega programada em todo o Distrito Federal",
    ],
    ctaText: "Orçar manutenção de motor elétrico",
    whatsappPrompt:
      "Olá! Preciso de manutenção/rebobinamento para um motor elétrico e gostaria de falar com a oficina da BMF.",
  },
  {
    id: "bombas",
    label: "Motobombas & Poços",
    badge: "SISTEMAS HIDRÁULICOS & POÇOS ARTESIANOS",
    title: "Motobombas, Pressurização e Poços Artesianos",
    subtitle:
      "Visita técnica, retirada, conserto e instalação de bombas prediais, industriais e submersas.",
    description:
      "Atendemos condomínios, hospitais, shoppings, indústrias e residências em toda a linha de bombeamento de água. Realizamos a visita técnica na casa de bombas ou no poço artesiano, identificamos se a falha é hidráulica, mecânica ou elétrica e executamos a solução completa.",
    image: "pump",
    highlights: [
      {
        title: "Poços Artesianos (Retirada e Instalação)",
        text: "Equipe técnica equipada para sacar bombas submersas de poços artesianos, realizar o laudo em oficina, consertar ou substituir e reinstalar com segurança.",
      },
      {
        title: "Bombas de Recalque, Incêndio e Pressurização",
        text: "Manutenção preventiva e corretiva em bombas centrífugas, multiestágio, submersíveis de esgoto/drenagem e sistemas pressurizadores.",
      },
      {
        title: "Substituição de Selos, Rotores e Rolamentos",
        text: "Eliminação de vazamentos, recuperação de perda de pressão/vazão e alinhamento completo do conjunto motobomba.",
      },
    ],
    checklist: [
      "Retirada e instalação de bombas submersas em poços artesianos",
      "Manutenção preventiva em casas de bombas de condomínios e hospitais",
      "Conserto de bombas centrífugas, autoaspirantes, submersíveis e injetoras",
      "Troca de selo mecânico, gaxetas, rotores, difusores e rolamentos",
      "Dimensionamento técnico para compra ou substituição de motobombas",
    ],
    ctaText: "Solicitar atendimento para bombas/poço",
    whatsappPrompt:
      "Olá! Preciso de atendimento técnico para bomba d'água / poço artesiano com a BMF.",
  },
  {
    id: "ferramentas",
    label: "Ferramentas Elétricas",
    badge: "CONSTRUÇÃO CIVIL & INDÚSTRIA",
    title: "Manutenção de Ferramentas Elétricas e Máquinas",
    subtitle:
      "Conserto ágil e contratos de manutenção para frotas de ferramentas de construtoras e oficinas.",
    description:
      "Ferramenta parada no canteiro de obras significa equipe ociosa e atraso no cronograma. A BMF realiza manutenção corretiva e preventiva em ferramentas elétricas pesadas, lavadoras industriais e equipamentos de construção civil, além de locação e venda de peças.",
    image: "bosch-combo",
    highlights: [
      {
        title: "Atendimento para Construtoras e Empreiteiras",
        text: "Manutenção de lotes e frotas de ferramentas (DeWalt, Makita, Bosch e similares) com orçamento rápido e controle por equipamento.",
      },
      {
        title: "Máquinas de Limpeza e Conservação",
        text: "Conserto especializado de lavadoras de alta pressão profissionais/industriais e enceradeiras industriais para condomínios e empresas de facilities.",
      },
      {
        title: "Equipamentos de Concretagem e Obra",
        text: "Revisão e reparo de marteletes rompedores, serras circulares, lixadeiras, esmerilhadeiras e motores vibradores de concreto.",
      },
    ],
    checklist: [
      "Furadeiras de impacto, parafusadeiras, esmerilhadeiras e lixadeiras",
      "Marteletes perfuradores e rompedores SDS-Plus / SDS-Max",
      "Lavadoras de alta pressão e enceradeiras industriais",
      "Serras circulares, serras mármore, policorte e motores vibradores",
      "Troca de induzidos, estatores, escovas de carvão, engrenagens e cabos",
    ],
    ctaText: "Falar sobre manutenção de ferramentas",
    whatsappPrompt:
      "Olá! Preciso de manutenção para ferramentas elétricas / máquinas com a BMF.",
  },
  {
    id: "quadros",
    label: "Quadros, Torno & Visita Técnica",
    badge: "AUTOMAÇÃO, USINAGEM & LOGÍSTICA DF",
    title: "Quadros de Comando, Usinagem e Visita Técnica no DF",
    subtitle:
      "Engenharia completa: do painel elétrico que protege sua bomba até a usinagem e coleta no seu endereço.",
    description:
      "Muitas queimas de motores e bombas acontecem por falha no quadro elétrico ou falta de proteção térmica. A BMF projeta, monta e reforma quadros de comando, executa serviços próprios de torno e solda e realiza visitas técnicas e coletas em todo o DF.",
    image: "elements/pilar-visita",
    highlights: [
      {
        title: "Quadros de Comando e Alternância",
        text: "Montagem e reforma de painéis elétricos para alternância automática entre bomba principal e reserva, proteção contra falta de fase, sobrecarga e trabalho a seco.",
      },
      {
        title: "Torno Mecânico e Solda na Própria Oficina",
        text: "Recuperação de eixos gastos, confecção de buchas, embuchamento de mancais e solda técnica sem depender de terceiros — reduzindo o prazo de entrega.",
      },
      {
        title: "Visita Técnica In Loco + Coleta e Entrega",
        text: "Vamos até o seu local diagnosticar o problema, retiramos o equipamento com veículo próprio e devolvemos instalado e testado.",
      },
    ],
    checklist: [
      "Confecção e manutenção preventiva de quadros de comando elétrico",
      "Instalação de contatores, relés térmicos, boias de nível e soft-starters",
      "Serviços de torno mecânico e solda para recuperação de peças",
      "Visita técnica diagnóstica em condomínios, empresas e obras no DF",
      "Coleta e entrega programada pela frota própria da BMF",
    ],
    ctaText: "Agendar visita ou consultar coleta",
    whatsappPrompt:
      "Olá! Gostaria de agendar uma visita técnica / consultar manutenção de quadro de comando ou coleta com a BMF.",
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
    image: "elements/pilar-oficina",
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
    image: "bosch-combo",
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
    image: "elements/contrato-ciclo-motor",
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
    image: "elements/pilar-visita",
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
