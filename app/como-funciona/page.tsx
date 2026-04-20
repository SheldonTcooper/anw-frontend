import { Check } from "lucide-react";

const planos = [
  {
    id: "pago",
    nome: "Basico",
    preco: 49,
    periodo: "mes",
    destaque: false,
    beneficios: [
      "Ate 5 fotos no anuncio",
      "Aparece na listagem",
      "Badge verificada",
      "Toggle disponivel agora",
      "Suporte prioritario",
    ],
  },
  {
    id: "super-destaque",
    nome: "Super Destaque",
    preco: 99,
    periodo: "mes",
    destaque: true,
    beneficios: [
      "Ate 15 fotos no anuncio",
      "Posicao de destaque na home",
      "Badge verificada dourada",
      "Toggle disponivel agora",
      "Aparece em Destaques",
      "Suporte prioritario",
    ],
  },
  {
    id: "supertop",
    nome: "SuperTop",
    preco: 149,
    periodo: "mes",
    destaque: false,
    beneficios: [
      "Fotos ilimitadas",
      "Topo da listagem da cidade",
      "Badge verificada dourada",
      "Videos no perfil",
      "Aparece em Destaques",
      "Destaque em buscas",
      "Suporte VIP",
    ],
  },
  {
    id: "ultratop",
    nome: "UltraTop",
    preco: 199,
    periodo: "mes",
    destaque: false,
    beneficios: [
      "Fotos e videos ilimitados",
      "1a posicao absoluta na cidade",
      "Badge exclusiva UltraTop",
      "Popup de destaque na home",
      "Relatorios de acesso",
      "Gerente de conta dedicado",
    ],
  },
];

export default function ComoFunciona() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-5xl">

        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Planos e <span style={{ color: "#C0306A" }}>Precos</span>
          </h1>
          <p className="mt-3 text-base" style={{ color: "#c9a8e0" }}>
            Escolha o plano ideal para turbinar seu anuncio e alcancar mais clientes.
          </p>
          <p className="mt-2 text-sm" style={{ color: "#c9a8e0" }}>
            Pagamento via PIX. Anuncio ativado apos confirmacao pelo admin.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {planos.map((plano) => (
            <div
              key={plano.id}
              className="relative flex flex-col rounded-2xl p-6"
              style={{ backgroundColor: "#250C30", border: "2px solid " + (plano.destaque ? "#C0306A" : "#4A1A5C") }}
            >
              {plano.destaque && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-0.5 text-xs font-bold uppercase tracking-wide"
                  style={{ backgroundColor: "#C0306A", color: "#fff" }}
                >
                  Mais Popular
                </span>
              )}

              <div className="mb-5">
                <h2 className="text-base font-bold text-white">{plano.nome}</h2>
                <p className="mt-1">
                  <span className="text-3xl font-bold" style={{ color: "#C0306A" }}>R${plano.preco}</span>
                  <span className="text-sm" style={{ color: "#c9a8e0" }}>/{plano.periodo}</span>
                </p>
              </div>

              <ul className="mb-6 flex flex-1 flex-col gap-2">
                {plano.beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "#c9a8e0" }}>
                    <Check size={15} className="mt-0.5 shrink-0" style={{ color: "#C0306A" }} />
                    {b}
                  </li>
                ))}
              </ul>

              
                href="/anunciar"
                className="block rounded-lg py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white hover:opacity-90"
                style={{ backgroundColor: plano.destaque ? "#C0306A" : "transparent", border: "1px solid " + (plano.destaque ? "#C0306A" : "#4A1A5C") }}
              >
                Contratar
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl p-6 text-center" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
          <p className="text-white font-bold mb-2">Como funciona o pagamento?</p>
          <p className="text-sm" style={{ color: "#c9a8e0" }}>
            Apos escolher seu plano, entre em contato pelo WhatsApp. Enviaremos o QR Code PIX e seu anuncio sera ativado em ate 24h apos a confirmacao do pagamento.
          </p>
          
            href="https://wa.me/5585991879866"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg px-6 py-3 font-bold text-white hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            Falar com Suporte
          </a>
        </div>

      </div>
    </main>
  );
}