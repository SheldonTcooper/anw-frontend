import { Check } from "lucide-react";

const planos = [
  {
    id: "organico",
    nome: "Orgânico",
    preco: null,
    periodo: null,
    destaque: false,
    beneficios: [
      "1 foto no anúncio",
      "Aparece na listagem geral",
      "Sem destaque",
      "Sem badge verificada",
      "Suporte por e-mail",
    ],
  },
  {
    id: "pago",
    nome: "Pago",
    preco: 10,
    periodo: "mês",
    destaque: false,
    beneficios: [
      "Até 5 fotos no anúncio",
      "Aparece acima dos orgânicos",
      "Badge verificada",
      "Toggle disponível agora",
      "Suporte prioritário",
    ],
  },
  {
    id: "super-destaque",
    nome: "Super Destaque",
    preco: 49,
    periodo: "mês",
    destaque: true,
    beneficios: [
      "Até 15 fotos no anúncio",
      "Posição de destaque na home",
      "Badge verificada dourada",
      "Toggle disponível agora",
      "Aparece em 'Destaques'",
      "Suporte prioritário",
    ],
  },
  {
    id: "supertop",
    nome: "SuperTop",
    preco: 99,
    periodo: "mês",
    destaque: false,
    beneficios: [
      "Fotos ilimitadas",
      "Topo da listagem da cidade",
      "Badge verificada dourada",
      "Vídeos no perfil",
      "Aparece em 'Destaques'",
      "Destaque em buscas",
      "Suporte VIP",
    ],
  },
  {
    id: "ultratop",
    nome: "UltraTop",
    preco: 199,
    periodo: "mês",
    destaque: false,
    beneficios: [
      "Fotos e vídeos ilimitados",
      "1ª posição absoluta na cidade",
      "Badge exclusiva UltraTop",
      "Perfil em destaque na home",
      "Notificações push para clientes",
      "Relatórios de acesso",
      "Gerente de conta dedicado",
    ],
  },
];

export default function ComoFunciona() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-6xl">

        {/* hero */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Como <span style={{ color: "#C0306A" }}>Funciona</span>
          </h1>
          <p className="mt-3 text-base" style={{ color: "#c9a8e0" }}>
            Escolha o plano ideal para turbinar seu anúncio e alcançar mais clientes.
          </p>
        </div>

        {/* planos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {planos.map((plano) => (
            <div
              key={plano.id}
              className="relative flex flex-col rounded-2xl p-6"
              style={{
                backgroundColor: "#250C30",
                border: `2px solid ${plano.destaque ? "#C0306A" : "#4A1A5C"}`,
              }}
            >
              {plano.destaque && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-0.5 text-xs font-bold uppercase tracking-wide"
                  style={{ backgroundColor: "#C0306A", color: "#fff" }}
                >
                  Mais Popular
                </span>
              )}

              {/* nome e preço */}
              <div className="mb-5">
                <h2 className="text-base font-bold text-white">{plano.nome}</h2>
                {plano.preco ? (
                  <p className="mt-1">
                    <span className="text-3xl font-bold" style={{ color: "#C0306A" }}>
                      R${plano.preco}
                    </span>
                    <span className="text-sm" style={{ color: "#c9a8e0" }}>/{plano.periodo}</span>
                  </p>
                ) : (
                  <p className="mt-1 text-3xl font-bold" style={{ color: "#4ade80" }}>Grátis</p>
                )}
              </div>

              {/* benefícios */}
              <ul className="mb-6 flex flex-1 flex-col gap-2">
                {plano.beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "#c9a8e0" }}>
                    <Check size={15} className="mt-0.5 shrink-0" style={{ color: "#C0306A" }} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* botão */}
              <a
                href="/login"
                className="block rounded-lg py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: plano.destaque ? "#C0306A" : "transparent",
                  border: `1px solid ${plano.destaque ? "#C0306A" : "#4A1A5C"}`,
                }}
              >
                {plano.preco ? "Contratar" : "Começar grátis"}
              </a>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
