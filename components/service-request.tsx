"use client";
import { FormEvent, useState } from "react";
import { ArrowUpRight, MessageCircle, Check } from "./glyphs";
import { whatsapp } from "@/lib/data";

export default function ServiceRequest() {
  const [message, setMessage] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const company = data.get("company")
      ? `\nEmpresa / Condomínio: ${data.get("company")}`
      : "";
    setMessage(
      `Olá, BMF! Sou ${data.get("name")}.${company}\nModalidade desejada: ${data.get("modality")}\nEquipamento / Demanda: ${data.get("equipment")}\nBairro/região: ${data.get("region")}\n${data.get("collect") ? "Solicito visita técnica in loco ou coleta do equipamento." : "Posso levar até a oficina em Samambaia."}\nDetalhes: ${data.get("description")}`,
    );
  };
  return (
    <form onSubmit={submit} className="request-form">
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="service-name">Seu nome *</label>
          <input
            id="service-name"
            name="name"
            autoComplete="name"
            placeholder="Como podemos chamar você?"
            required
            maxLength={80}
          />
        </div>
        <div className="form-field">
          <label htmlFor="service-company">
            Condomínio, Empresa ou Órgão (opcional)
          </label>
          <input
            id="service-company"
            name="company"
            autoComplete="organization"
            placeholder="Ex.: Condomínio Residencial / Construtora"
            maxLength={100}
          />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="service-modality">
            Qual modalidade você procura? *
          </label>
          <select
            id="service-modality"
            name="modality"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecione a modalidade
            </option>
            <option>Contrato de Manutenção (Preventiva + Corretiva)</option>
            <option>Visita Técnica In Loco para Diagnóstico</option>
            <option>Manutenção Preventiva Programada</option>
            <option>Manutenção Corretiva / Conserto de Equipamento</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="service-region">Bairro / região no DF *</label>
          <input
            id="service-region"
            name="region"
            placeholder="Ex.: Asa Sul, Águas Claras, Samambaia..."
            required
            maxLength={100}
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="service-equipment">
          Qual equipamento ou sistema precisa de atendimento? *
        </label>
        <select
          id="service-equipment"
          name="equipment"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Selecione o equipamento ou sistema
          </option>
          <option>Casa de bombas completa / Contrato predial ou industrial</option>
          <option>Motor elétrico / rebobinamento</option>
          <option>Motobomba d’água (recalque, pressurização, incêndio)</option>
          <option>Bomba de poço artesiano (retirada / instalação)</option>
          <option>Frota de ferramentas elétricas (furadeira, martelete, serra)</option>
          <option>Lavadora de alta pressão / enceradeira industrial</option>
          <option>Quadro de comando / painel elétrico de bombas</option>
          <option>Torno mecânico, solda ou usinagem</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="service-description">
          Conte o que você precisa ou o que aconteceu *
        </label>
        <textarea
          id="service-description"
          name="description"
          placeholder="Descreva a demanda (ex.: interesse em contrato mensal para condomínio, visita técnica na casa de bombas ou sintomas do equipamento)."
          required
          maxLength={2000}
        />
      </div>
      <label className="flex items-center gap-3 text-[11px]">
        <input
          type="checkbox"
          name="collect"
          defaultChecked
          className="accent-[#151bcc]"
        />{" "}
        Preciso de Visita Técnica no local ou Coleta do equipamento pela BMF
      </label>
      <button type="submit" className="button button-dark">
        Preparar solicitação <ArrowUpRight size={18} />
      </button>
      <p className="form-note">
        Você revisa a mensagem antes de enviá-la no WhatsApp. Visitas técnicas, coletas e contratos são agendados diretamente com nossa equipe técnica.
      </p>
      {message && (
        <div className="request-success" role="status">
          <h3 className="flex items-center gap-2">
            <Check size={18} />
            Sua solicitação está pronta.
          </h3>
          <p className="form-note">
            Continue no WhatsApp para falar com o setor técnico/comercial da BMF.
          </p>
          <a
            className="button"
            href={whatsapp(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar pelo WhatsApp <MessageCircle size={18} />
          </a>
        </div>
      )}
    </form>
  );
}
