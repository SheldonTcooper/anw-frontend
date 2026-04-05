"use client";

import { useState, useEffect } from "react";
import { Check, X, Eye, Clock, CheckCircle, XCircle } from "lucide-react";

type Status = "EM_ANALISE" | "ATIVO" | "REMOVIDO";

interface Anuncio {
  id: string;
  titulo: string;
  cidade: string;
  estado: string;
  whatsapp: string;
  cache: number | null;
  status: Status;
  criadoEm: string;
  slug: string;
}

const badgeStatus: Record<Status, { label: string; bg: string; color: string }> = {
  EM_ANALISE: { label: "Pendente",  bg: "#422006", color: "#fb923c" },
  ATIVO:      { label: "Aprovado",  bg: "#14532d", color: "#4ade80" },
  REMOVIDO:   { label: "Rejeitado", bg: "#450a0a", color: "#f87171" },
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl p-5 ${className}`} style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
      {children}
    </div>
  );
}

export default function PainelAdmin() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"todos" | Status>("todos");

  const carregarAnuncios = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/anuncios');
      const data = await res.json();
      if (data.success) setAnuncios(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarAnuncios(); }, []);

  const atualizarStatus = async (id: string, status: Status) => {
    try {
      const res = await fetch('/api/admin/anuncios', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (data.success) {
        setAnuncios(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      }
    } catch (err) {
      alert('Erro ao atualizar status');
    }
  };

  const stats = {
    total:     anuncios.length,
    pendentes: anuncios.filter(a => a.status === 'EM_ANALISE').length,
    aprovados: anuncios.filter(a => a.status === 'ATIVO').length,
    rejeitados:anuncios.filter(a => a.status === 'REMOVIDO').length,
  };

  const visiveis = filtro === 'todos' ? anuncios : anuncios.filter(a => a.status === filtro);

  const metricaCards = [
    { label: "Total",     valor: stats.total,     icone: Eye,         cor: "#a78bfa" },
    { label: "Pendentes", valor: stats.pendentes,  icone: Clock,       cor: "#fb923c" },
    { label: "Aprovados", valor: stats.aprovados,  icone: CheckCircle, cor: "#4ade80" },
    { label: "Rejeitados",valor: stats.rejeitados, icone: XCircle,     cor: "#f87171" },
  ];

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-5xl flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
          <p className="text-sm mt-0.5" style={{ color: "#c9a8e0" }}>Moderação de anúncios</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metricaCards.map(({ label, valor, icone: Icone, cor }) => (
            <Card key={label}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${cor}20` }}>
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

        <div className="flex flex-wrap gap-2">
          {[
            { id: "todos",      label: "Todos" },
            { id: "EM_ANALISE", label: "Pendentes" },
            { id: "ATIVO",      label: "Aprovados" },
            { id: "REMOVIDO",   label: "Rejeitados" },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setFiltro(id as any)}
              className="rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors"
              style={filtro === id
                ? { backgroundColor: "#C0306A", color: "#fff" }
                : { backgroundColor: "#250C30", color: "#c9a8e0", border: "1px solid #4A1A5C" }
              }
            >
              {label}
            </button>
          ))}
        </div>

        <Card className="overflow-hidden !p-0">
          <div className="overflow-x-auto">
            {loading ? (
              <p className="py-10 text-center text-sm" style={{ color: "#c9a8e0" }}>Carregando...</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#1A0A1E", borderBottom: "1px solid #4A1A5C" }}>
                    {["#", "Título", "Cidade", "WhatsApp", "Valor/h", "Cadastro", "Status", "Ações"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide" style={{ color: "#c9a8e0" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visiveis.map((a, idx) => {
                    const badge = badgeStatus[a.status];
                    return (
                      <tr key={a.id} style={{ borderBottom: "1px solid #4A1A5C" }} className="transition-colors hover:bg-[#2e0e3e]">
                        <td className="px-4 py-3" style={{ color: "#c9a8e0" }}>{idx + 1}</td>
                        <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{a.titulo}</td>
                        <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#c9a8e0" }}>{a.cidade} - {a.estado}</td>
                        <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#c9a8e0" }}>{a.whatsapp}</td>
                        <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#c9a8e0" }}>
                          {a.cache ? `R$ ${Number(a.cache).toFixed(0)}` : '-'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#c9a8e0" }}>
                          {new Date(a.criadoEm).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase" style={{ backgroundColor: badge.bg, color: badge.color }}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => atualizarStatus(a.id, 'ATIVO')} disabled={a.status === 'ATIVO'}
                              title="Aprovar" className="flex h-7 w-7 items-center justify-center rounded-lg transition-opacity hover:opacity-80 disabled:opacity-30"
                              style={{ backgroundColor: "#14532d" }}>
                              <Check size={14} stroke="#4ade80" />
                            </button>
                            <button onClick={() => atualizarStatus(a.id, 'REMOVIDO')} disabled={a.status === 'REMOVIDO'}
                              title="Rejeitar" className="flex h-7 w-7 items-center justify-center rounded-lg transition-opacity hover:opacity-80 disabled:opacity-30"
                              style={{ backgroundColor: "#450a0a" }}>
                              <X size={14} stroke="#f87171" />
                            </button>
                            <a href={`/acompanhantes/${a.cidade?.toLowerCase().replace(/\s+/g, '-')}/${a.slug}`} target="_blank"
                              title="Visualizar" className="flex h-7 w-7 items-center justify-center rounded-lg transition-opacity hover:opacity-80"
                              style={{ backgroundColor: "#1e1b4b" }}>
                              <Eye size={14} stroke="#a78bfa" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {!loading && visiveis.length === 0 && (
              <p className="py-10 text-center text-sm" style={{ color: "#c9a8e0" }}>Nenhum anúncio neste filtro.</p>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}