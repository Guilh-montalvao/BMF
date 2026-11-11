import { ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <main id="conteudo" className="checkout-page">
      <div className="checkout-confirm">
        <span className="micro">BMF / 404</span>
        <h1 className="mt-5">
          Página
          <br />
          <span className="blue">não encontrada.</span>
        </h1>
        <p>Volte para a bancada inicial ou procure seu equipamento na loja.</p>
        <ButtonLink href="/">Voltar ao início</ButtonLink>
        <ButtonLink href="/loja/" className="button-dark">
          Explorar a loja
        </ButtonLink>
      </div>
    </main>
  );
}
