"use client";

import { useState } from "react";
import { Eye, MessageCircle, Phone, Edit, Trash2, Plus } from "lucide-react";

const metricas = [
  { label: "Visualizações", valor: 1234, icone: Eye, cor: "#a78bfa" },
  { label: "Cliques WhatsApp", valor: 89, icone: MessageCircle, cor: "#25D366" },
  { label: "Cliques Ligar", valor: 45, icone: Phone, cor: "#60a5fa" },
];

const fotosAnuncio = Array.from({ length: 6 }, (_, i) => i);

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

export default function PainelAnunciante() {
  const [disponivel, setDisponivel] = useState(true);

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-4xl flex flex-col gap-6">

        {/* cabeçalho */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Meu Painel</h1>
            <p className="text-sm mt-0.5" style={{ color: "#c9a8e0" }}>Bem-vinda, Valentina</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
              style={{ backgroundColor: "#14532d", color: "#4ade80", border: "1px solid #22c55e" }}
            >
              ● ATIVO
            </span>
          </div>
        </div>

        {/* toggle disponível agora */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {disponivel && (
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "#22c55e" }} />
                  <span className="relative inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                </span>
              )}
              <div>
                <p className="font-semibold text-white">Disponível Agora</p>
                <p className="text-xs" style={{ color: "#c9a8e0" }}>
                  {disponivel ? "Você está aparecendo como disponível" : "Você está oculta no momento"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setDisponivel((v) => !v)}
              className="relative h-6 w-11 rounded-full transition-colors duration-200"
              style={{ backgroundColor: disponivel ? "#C0306A" : "#4A1A5C" }}
              aria-label="Toggle disponível"
            >
              <span
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                style={{ transform: disponivel ? "translateX(20px)" : "translateX(2px)" }}
              />
            </button>
          </div>
        </Card>

        {/* métricas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {metricas.map(({ label, valor, icone: Icone, cor }) => (
            <Card key={label}>
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${cor}20` }}
                >
                  <Icone size={22} style={{ color: cor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{valor.toLocaleString("pt-BR")}</p>
                  <p className="text-xs" style={{ color: "#c9a8e0" }}>{label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* ações */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/anunciar"
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#C0306A" }}
          >
            <Edit size={16} /> Editar Anúncio
          </a>
          <button
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-70"
            style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}
          >
            <Plus size={16} /> Adicionar Fotos
          </button>
          <button
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-70"
            style={{ color: "#ef4444", backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}
          >
            <Trash2 size={16} /> Excluir Anúncio
          </button>
        </div>

        {/* galeria */}
        <Card>
          <h2 className="mb-4 font-bold text-white">Fotos do Anúncio</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {fotosAnuncio.map((i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg"
                style={{ paddingBottom: "133%", backgroundColor: "#3a3a3a" }}
              >
                {i === 0 && (
                  <span
                    className="absolute bottom-1 left-1 z-10 rounded px-1.5 py-0.5 text-xs font-bold"
                    style={{ backgroundColor: "#C0306A", color: "#fff" }}
                  >
                    Capa
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

      </div>
    </main>
  );
}
