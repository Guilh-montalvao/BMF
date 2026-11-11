"use client";
import { FormEvent, useState } from "react";
import { ArrowUpRight, MessageCircle, Check } from "./glyphs";
import { whatsapp } from "@/lib/data";
export default function ServiceRequest() {
  const [message, setMessage] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setMessage(
      `Olá, BMF! Sou ${data.get("name")}.\nPreciso de atendimento para: ${data.get("equipment")}.\nBairro/região: ${data.get("region")}.\n${data.get("collect") ? "Gostaria de combinar a coleta do equipamento." : "Posso levar o equipamento até a oficina."}\nDescrição: ${data.get("description")}`,
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
          <label htmlFor="service-region">Bairro / região *</label>
          <input
            id="service-region"
            name="region"
            placeholder="Ex.: Samambaia"
            required
            maxLength={100}
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="service-equipment">
          Qual equipamento precisa de cuidado? *
        </label>
        <select
          id="service-equipment"
          name="equipment"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Selecione o equipamento
          </option>
          <option>Motor elétrico / rebobinamento</option>
          <option>Bomba d’água</option>
          <option>Bomba de poço artesiano</option>
          <option>Ferramenta elétrica</option>
          <option>Lavadora / equipamento de limpeza</option>
          <option>Outro equipamento ou serviço</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="service-description">
          Conte o que está acontecendo *
        </label>
        <textarea
          id="service-description"
          name="description"
          placeholder="Descreva o problema e, se souber, informe o modelo do equipamento."
          required
          maxLength={2000}
        />
      </div>
      <label className="flex items-center gap-3 text-[11px]">
        <input type="checkbox" name="collect" className="accent-[#151bcc]" />{" "}
        Quero consultar a coleta do equipamento
      </label>
      <button type="submit" className="button button-dark">
        Preparar atendimento <ArrowUpRight size={18} />
      </button>
      <p className="form-note">
        Você revisa a mensagem antes de enviá-la no WhatsApp. O serviço e a
        coleta dependem de avaliação, disponibilidade e aprovação do orçamento.
      </p>
      {message && (
        <div className="request-success" role="status">
          <h3 className="flex items-center gap-2">
            <Check size={18} />
            Sua mensagem está pronta.
          </h3>
          <p className="form-note">
            Continue no WhatsApp para conversar com a BMF e enviar fotos do
            equipamento.
          </p>
          <a
            className="button"
            href={whatsapp(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continuar no WhatsApp <MessageCircle size={18} />
          </a>
        </div>
      )}
    </form>
  );
}
