# BMF — Loja e oficina em Samambaia

Website em Next.js App Router, React, TypeScript, Tailwind CSS, GSAP/ScrollTrigger e Motion.

## Desenvolvimento

```sh
npm install
npm run dev
```

O adaptador de desenvolvimento aceita os argumentos de host/porta do ambiente de prévia e os encaminha para o Next.js.

```sh
npm run typecheck
npm run build
```

O build gera uma exportação estática em `out/`. Rotas: início, loja, serviços, três páginas de produto, checkout e página 404.

## Direção visual

- Azul #151BCC, azul-marinho #101B33, amarelo #DFFF00 e fundo #F4F4EF.
- Sora para os títulos, BMF Interface Sans (IBM Plex Sans) para o texto e BMF Interface Mono (IBM Plex Mono) para rótulos, hospedadas localmente com licenças OFL em `public/fonts`.
- A abertura é uma bancada interativa: motor, bomba ou ferramentas, com links contextuais de compra e manutenção e alternância de fundo claro. A navegação desktop é lateral. A loja organiza equipamentos em linhas, e o carrinho abre como uma bandeja inferior.
- GSAP coordena a abertura visual do equipamento durante a sequência de diagnóstico e o percurso da picape. Motion cuida da troca de equipamento e das entradas e saídas dos painéis.
- A preferência de redução de movimento é respeitada. A navegação por teclado inclui foco visível, fechamento por Escape e contenção de foco nos painéis.
- As 17 imagens aprovadas estão otimizadas em `public/images`, incluindo cenários desktop/mobile, equipamentos transparentes, categorias, picape, material de transporte, logo e três peças para o Instagram.

## Comércio e atendimento

O catálogo é explicitamente demonstrativo. Nomes de produtos, preços, imagens e configurações não constituem oferta comercial. Carrinho e quantidades persistem no navegador. O checkout valida os campos, permite simular retirada/entrega e Pix/cartão, e conclui uma simulação sem cobrança ou envio de pedido. Nenhum dado de cartão é solicitado; os dados de formulário não são persistidos nem enviados.

Para ativar compras reais:

1. Substituir os itens de `lib/data.ts` pelo catálogo, fotos oficiais, especificações, variações, preços e estoque reais.
2. Conectar um backend com validação independente de preços e disponibilidade.
3. Integrar um provedor de pagamentos com checkout hospedado/tokenização, webhooks verificados e controle idempotente de pedidos.
4. Configurar cálculo de frete, prazos, estoque, e-mails e políticas comerciais e de privacidade.
5. Revisar dados de atendimento, domínio e configuração de indexação. A versão de revisão usa `noindex`.

O formulário de manutenção prepara uma mensagem e oferece um link para o visitante continuar voluntariamente no WhatsApp. Não envia mensagens automaticamente. Contato, endereço e horários foram transcritos das informações fornecidas. Os cenários gerados são ilustrativos e não representam uma fotografia da sede.

## Verificação realizada

- Compilação de produção e TypeScript.
- Revisão visual desktop e viewport de celular de 375 px, sem overflow horizontal.
- Troca de equipamento e iluminação na bancada; links contextuais até a categoria correspondente na loja.
- Novo menu mobile e bandeja de seleção, com atualização de quantidade e subtotal.
- Busca com resultado vazio, limpeza de filtros e seleção de categoria.
- Adição de produto, alteração de quantidade e subtotal, remoção e persistência após recarregar.
- Validação de endereço na entrega, seleção de pagamento e confirmação da simulação sem cobrança.
- Menu e carrinho no celular.
- Preparação da mensagem de manutenção com solicitação de coleta, sem envio externo.
- Seção de coleta/entrega, alternância das etapas e carregamento do mapa informado.
