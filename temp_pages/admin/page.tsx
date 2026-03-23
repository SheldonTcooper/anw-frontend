"use client";

import { useState } from "react";
import { Check, X, Eye, Clock, CheckCircle, XCircle } from "lucide-react";

type Status = "pendente" | "aprovado" | "rejeitado";

interface Anuncio {
  id: number;
  nome: string;
  cidade: string;
  categoria: string;
  cadastro: string;
  status: Status;
}

const inicial: Anuncio[] = [
  { id: 1,  nome: "Valentina Silva",   cidade: "São Paulo",      categoria: "Mulheres", cadastro: "19/03/2026 08:14", status: "pendente" },
  { id: 2,  nome: "Isabela Moreira",   cidade: "Rio de Janeiro", categoria: "Mulheres", cadastro: "19/03/2026 09:02", status: "pendente" },
  { id: 3,  nome: "Camila Rocha",      cidade: "BH",             categoria: "Mulheres", cadastro: "18/03/2026 22:47", status: "pendente" },
  { id: 4,  nome: "Fernanda Lima",     cidade: "Curitiba",       categoria: "Mulheres", cadastro: "18/03/2026 21:30", status: "aprovado" },
  { id: 5,  nome: "Juliana Ferreira",  cidade: "Porto Alegre",   categoria: "Mulheres", cadastro: "18/03/2026 19:15", status: "rejeitado" },
  { id: 6,  nome: "Larissa Nunes",     cidade: "Fortaleza",      categoria: "Trans",    cadastro: "17/03/2026 14:00", status: "pendente" },
  { id: 7,  nome: "Mariana Costa",     cidade: "Salvador",       categoria: "Mulheres", cadastro: "17/03/2026 11:22", status: "aprovado" },
  { id: 8,  nome: "Patrícia Alves",    cidade: "Brasília",       categoria: "Mulheres", cadastro: "17/03/2026 10:05", status: "pendente" },
];

const resumo = (lista: Anuncio[]) => ({
  total:     lista.length,
  pendentes: lista.filter((a) => a.status === "pendente").length,
  aprovados: lista.filter((a) => a.status === "aprovado").length,
  rejeitados:lista.filter((a) => a.status === "rejeitado").length,
});

const badgeStatus: Record<Status, { label: string; bg: string; color: string }> = {
  pendente:  { label: "Pendente",  bg: "#422006", color: "#fb923c" },
  aprovado:  { label: "Aprovado",  bg: "#14532d", color: "#4ade80" },
  rejeitado: { label: "Rejeitado", bg: "#450a0a", color: "#f87171" },
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl p-5 ${className}`}
      style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}
    >
      {children}
    </div>
  );
}

type Filtro = "todos" | Status;

export default function PainelAdmin() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>(inicial);
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const aprovar  = (id: number) => setAnuncios((prev) => prev.map((a) => a.id === id ? { ...a, status: "aprovado"  } : a));
  const rejeitar = (id: number) => setAnuncios((prev) => prev.map((a) => a.id === id ? { ...a, status: "rejeitado" } : a));

  const stats = resumo(anuncios);
  const visiveis = filtro === "todos" ? anuncios : anuncios.filter((a) => a.status === filtro);

  const metricaCards = [
    { label: "Total",     valor: stats.total,     icone: Eye,         cor: "#a78bfa" },
    { label: "Pendentes", valor: stats.pendentes,  icone: Clock,       cor: "#fb923c" },
    { label: "Aprovados", valor: stats.aprovados,  icone: CheckCircle, cor: "#4ade80" },
    { label: "Rejeitados",valor: stats.rejeitados, icone: XCircle,     cor: "#f87171" },
  ];

  const filtrosBtns: { id: Filtro; label: string }[] = [
    { id: "todos",     label: "Todos" },
    { id: "pendente",  label: "Pendentes" },
    { id: "aprovado",  label: "Aprovados" },
    { id: "rejeitado", label: "Rejeitados" },
  ];

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-5xl flex flex-col gap-6">

        {/* cabeçalho */}
        <div>
          <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
          <p className="text-sm mt-0.5" style={{ color: "#c9a8e0" }}>Moderação de anúncios</p>
        </div>

        {/* métricas */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metricaCards.map(({ label, valor, icone: Icone, cor }) => (
            <Card key={label}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${cor}20` }}
                >
                  <Icone size={18} style={{ color: cor }} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{valor}</p>
                  <p className="text-xs" style={{ color: "#c9a8e0" }}>{label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* filtros */}
        <div className="flex flex-wrap gap-2">
          {filtrosBtns.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFiltro(id)}
              className="rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors"
              style={
                filtro === id
                  ? { backgroundColor: "#C0306A", color: "#fff" }
                  : { backgroundColor: "#250C30", color: "#c9a8e0", border: "1px solid #4A1A5C" }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* tabela */}
        <Card className="overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#1A0A1E", borderBottom: "1px solid #4A1A5C" }}>
                  {["#", "Nome", "Cidade", "Categoria", "Cadastro", "Status", "Ações"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide"
                      style={{ color: "#c9a8e0" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visiveis.map((a, idx) => {
                  const badge = badgeStatus[a.status];
                  return (
                    <tr
                      key={a.id}
                      style={{ borderBottom: "1px solid #4A1A5C" }}
                      className="transition-colors hover:bg-[#2e0e3e]"
                    >
                      <td className="px-4 py-3" style={{ color: "#c9a8e0" }}>{idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{a.nome}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#c9a8e0" }}>{a.cidade}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#c9a8e0" }}>{a.categoria}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#c9a8e0" }}>{a.cadastro}</td>
                      <td className="px-4 py-3">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase"
                          style={{ backgroundColor: badge.bg, color: badge.color }}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => aprovar(a.id)}
                            disabled={a.status === "aprovado"}
                            title="Aprovar"
                            className="flex h-7 w-7 items-center justify-center rounded-lg transition-opacity hover:opacity-80 disabled:opacity-30"
                            style={{ backgroundColor: "#14532d" }}
                          >
                            <Check size={14} stroke="#4ade80" />
                          </button>
                          <button
                            onClick={() => rejeitar(a.id)}
                            disabled={a.status === "rejeitado"}
                            title="Rejeitar"
                            className="flex h-7 w-7 items-center justify-center rounded-lg transition-opacity hover:opacity-80 disabled:opacity-30"
                            style={{ backgroundColor: "#450a0a" }}
                          >
                            <X size={14} stroke="#f87171" />
                          </button>
                          <button
                            title="Visualizar"
                            className="flex h-7 w-7 items-center justify-center rounded-lg transition-opacity hover:opacity-80"
                            style={{ backgroundColor: "#1e1b4b" }}
                          >
                            <Eye size={14} stroke="#a78bfa" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {visiveis.length === 0 && (
              <p className="py-10 text-center text-sm" style={{ color: "#c9a8e0" }}>
                Nenhum anúncio neste filtro.
              </p>
            )}
          </div>
        </Card>

      </div>
    </main>
  );
}
