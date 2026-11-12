"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from "./glyphs";
import { ButtonLink, Eyebrow, Reveal } from "./ui";
import { whatsapp, COMPANY_ADDRESS } from "@/lib/data";

const areas = [
  {
    number: "01",
    title: "Rebobinador de Motores Elétricos",
    desc: "Rebobinamento de motores monofásicos e trifásicos, ligação de esquemas elétricos, testes de isolação e montagem em bancada.",
  },
  {
    number: "02",
    title: "Técnico de Motobombas e Poços Artesianos",
    desc: "Manutenção de bombas centrífugas, pressurizadores, bombas submersas, visitas técnicas em condomínios/hospitais e retirada em poços.",
  },
  {
    number: "03",
    title: "Técnico em Ferramentas Elétricas e Máquinas",
    desc: "Diagnóstico e conserto de marteletes, furadeiras, esmerilhadeiras, serras, lavadoras de alta pressão e motores vibradores.",
  },
  {
    number: "04",
    title: "Torneiro Mecânico / Quadros / Auxiliar Técnico",
    desc: "Usinagem de eixos e buchas, montagem de quadros de comando elétrico, logística de coleta/entrega e apoio operacional na oficina.",
  },
];

export default function Careers() {
  const [message, setMessage] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setMessage(
      `Olá, BMF! Gostaria de me candidatar pelo Trabalhe Conosco.\nNome: ${data.get("name")}\nTelefone: ${data.get("phone")}\nBairro/Cidade: ${data.get("region")}\nÁrea de interesse: ${data.get("role")}\nTempo de experiência / Resumo: ${data.get("experience")}`,
    );
  };

  return (
    <main id="conteudo" className="careers-page">
      <div className="subpage-top-nav">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Voltar ao início</span>
        </Link>
      </div>

      <section className="careers-hero">
        <div className="careers-hero-copy">
          <Eyebrow>Carreiras & Equipe Técnica · Samambaia / DF</Eyebrow>
          <h1>
            Vista a camisa de quem mantém Brasília funcionando.
          </h1>
          <p>
            Há mais de 17 anos a BMF Bombas (Eletro Ivo) é referência em manutenção eletromecânica no Distrito Federal. Nossa equipe atua uniformizada, com segurança, oficina estruturada e orgulho de atender desde residências até os maiores hospitais, shoppings e órgãos públicos de Brasília.
          </p>
          <div className="careers-hero-badges">
            <span><Check size={14} /> Oficina própria em Samambaia</span>
            <span><Check size={14} /> Equipe padronizada e EPIs completos</span>
            <span><Check size={14} /> Ambiente técnico de alto nível</span>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <ButtonLink href="#candidatar">
              Enviar meus dados profissionais
            </ButtonLink>
            <ButtonLink href="/servicos/" secondary>
              Conhecer áreas de atuação
            </ButtonLink>
          </div>
        </div>

        <div className="careers-uniform-showcase">
          <span className="uniform-badge">Identidade Oficial BMF</span>
          <img
            src="/images/uniforme-tecnico.webp"
            alt="Uniforme oficial da equipe técnica BMF Bombas frente e verso"
          />
          <p>
            Padronização, identificação visual e respeito ao profissional em cada visita técnica e bancada.
          </p>
        </div>
      </section>

      <section className="careers-areas">
        <Reveal className="careers-areas-head">
          <div>
            <Eyebrow>Áreas Técnicas na BMF</Eyebrow>
            <h2>Onde seu talento pode somar na nossa oficina e em campo:</h2>
          </div>
          <p>
            Mantemos banco de talentos ativo e vagas para profissionais comprometidos com qualidade técnica, pontualidade e segurança.
          </p>
        </Reveal>

        <div className="careers-grid">
          {areas.map((a) => (
            <Reveal key={a.number} className="career-card">
              <span className="why-number">{a.number}</span>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="service-request" id="candidatar">
        <Reveal>
          <Eyebrow>Trabalhe Conosco · Banco de Talentos BMF</Eyebrow>
          <h2>
            Apresente sua experiência
            <br />
            para a nossa equipe.
          </h2>
          <p>
            Preencha seus dados abaixo para iniciar a conversa pelo WhatsApp e enviar seu currículo em PDF diretamente ao nosso setor responsável.
          </p>
          <div className="careers-location-box">
            <strong>Local de trabalho:</strong>
            <span>{COMPANY_ADDRESS}</span>
          </div>
        </Reveal>

        <form onSubmit={submit} className="request-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="career-name">Nome completo *</label>
              <input
                id="career-name"
                name="name"
                placeholder="Seu nome completo"
                required
                maxLength={80}
              />
            </div>
            <div className="form-field">
              <label htmlFor="career-phone">Telefone / WhatsApp *</label>
              <input
                id="career-phone"
                name="phone"
                placeholder="(61) 99999-9999"
                required
                maxLength={30}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="career-region">Onde você mora? *</label>
              <input
                id="career-region"
                name="region"
                placeholder="Ex.: Samambaia, Taguatinga, Ceilândia..."
                required
                maxLength={80}
              />
            </div>
            <div className="form-field">
              <label htmlFor="career-role">Área de interesse *</label>
              <select id="career-role" name="role" required defaultValue="">
                <option value="" disabled>
                  Selecione a função
                </option>
                <option>Rebobinador de Motores Elétricos</option>
                <option>Técnico de Motobombas / Poços Artesianos</option>
                <option>Técnico de Ferramentas Elétricas</option>
                <option>Torneiro Mecânico / Soldador</option>
                <option>Eletricista de Quadros de Comando</option>
                <option>Auxiliar Técnico / Motorista Coleta</option>
                <option>Atendimento Comercial / Administrativo</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="career-exp">
              Resumo da sua experiência profissional *
            </label>
            <textarea
              id="career-exp"
              name="experience"
              placeholder="Conte brevemente sua experiência com motores, bombas, ferramentas, CNH ou cursos na área."
              required
              maxLength={1500}
            />
          </div>

          <button type="submit" className="button button-dark">
            Preparar candidatura <ArrowUpRight size={18} />
          </button>
          <p className="form-note">
            Ao clicar em continuar no WhatsApp, você também poderá anexar o seu currículo em PDF.
          </p>

          {message && (
            <div className="request-success" role="status">
              <h3 className="flex items-center gap-2">
                <Check size={18} />
                Apresentação pronta para envio!
              </h3>
              <p className="form-note">
                Clique abaixo para enviar sua mensagem no WhatsApp da BMF e anexar seu currículo.
              </p>
              <a
                className="button"
                href={whatsapp(message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar candidatura no WhatsApp <MessageCircle size={18} />
              </a>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

