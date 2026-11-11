import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowLeft } from "@/components/glyphs";
import { services, whatsapp } from "@/lib/data";
import { ButtonLink, Eyebrow, Reveal } from "@/components/ui";
import ServiceRequest from "@/components/service-request";
export const metadata: Metadata = { title: "Oficina e manutenção" };
export default function Page() {
  return (
    <main id="conteudo" className="services-page">
      <div className="subpage-top-nav">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Voltar ao início</span>
        </Link>
      </div>
      <section className="service-page-heading">
        <div>
          <Eyebrow>A oficina da BMF / Samambaia</Eyebrow>
          <h1>
            Conte o defeito.
            <br />A gente olha de perto.
          </h1>
          <p>
            Manutenção e conserto de bombas, motores e ferramentas. Informe o
            equipamento e o que aconteceu para começar o atendimento.
          </p>
          <ButtonLink href="#solicitar">
            Conversar sobre meu equipamento
          </ButtonLink>
        </div>
        <img
          src="/images/maintenance.webp"
          alt="Cena ilustrativa de um motor desmontado na bancada"
        />
      </section>
      <div className="service-directory">
        {services.map((s, i) => (
          <section key={s.title} className="service-detail" id={`servico-${i}`}>
            <Reveal className="service-detail-visual">
              <img
                src={`/images/${s.image}.webp`}
                alt={`Imagem ilustrativa: ${s.title.toLowerCase()}`}
                loading="lazy"
              />
            </Reveal>
            <Reveal className="service-detail-copy">
              <Eyebrow>{s.short}</Eyebrow>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>
                    <Check size={12} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                className="text-link"
                href={whatsapp(
                  `Olá! Preciso de atendimento sobre ${s.title.toLowerCase()}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a oficina sobre este serviço
              </a>
            </Reveal>
          </section>
        ))}
      </div>
      <section className="service-request" id="solicitar">
        <Reveal>
          <Eyebrow>Vamos começar por uma conversa.</Eyebrow>
          <h2>
            Que equipamento
            <br />
            precisa de cuidado?
          </h2>
          <p>
            Conte o que aconteceu e onde o equipamento está. O formulário
            prepara uma mensagem para você conversar com a BMF no WhatsApp.
          </p>
          <ButtonLink href="/#coleta" secondary className="request-coleta-link">
            Como funciona a coleta?
          </ButtonLink>
        </Reveal>
        <ServiceRequest />
      </section>
    </main>
  );
}
