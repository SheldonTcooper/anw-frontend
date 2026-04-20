"use client";
import { useState } from "react";
import { Eye, MessageCircle, Phone, Edit, Star } from "lucide-react";

const planos = [
  {
    id: "PAGO",
    nome: "Basico",
    preco: "R$ 49/mes",
    cor: "#60a5fa",
    beneficios: ["Aparece na listagem", "Fotos ilimitadas", "Botao WhatsApp"],
  },
  {
    id: "SUPER_DESTAQUE",
    nome: "Destaque",
    preco: "R$ 99/mes",
    cor: "#a78bfa",
    beneficios: ["Tudo do Basico", "Aparece no topo", "Badge Destaque"],
  },
  {
    id: "SUPERTOP",
    nome: "Super Top",
    preco: "R$ 149/mes",
    cor: "#C0306A",
    beneficios: ["Tudo do Destaque", "Primeiro da lista", "Badge Super Top"],
  },
  {
    id: "ULTRATOP",
    nome: "Ultra Top",
    preco: "R$ 199/mes",
    cor: "#B8960C",
    beneficios: ["Tudo do Super Top", "Popup de destaque", "Badge Gold"],
  },
];

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl p-5 ${className}`}
      style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
      {children}
    </div>
  );
}

export default function PainelAnunciante() {
  const [disponivel, setDisponivel] = useState(true);
  const [abaSelecionada, setAbaSelecionada] = useState<"painel" | "planos">("painel");
  const [planoSelecionado, setPlanoSelecionado] = useState<string | null>(null);

  const handleEscolherPlano = (planoId: string) => {
    setPlanoSelecionado(planoId);
    const plano = planos.find(p => p.id === planoId);
    alert(`Voce escolheu o plano ${plano?.nome}!\n\nEntraremos em contato pelo WhatsApp para enviar o QR Code PIX e ativar seu plano.`);
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-4xl flex flex-col gap-6">

        {/* cabecalho */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Meu Painel</h1>
            <p className="text-sm mt-0.5" style={{ color: "#c9a8e0" }}>Gerencie seu anuncio</p>
          </div>
          <span className="rounded-full px-3 py-1 text-xs font-bold uppercase"
            style={{ backgroundColor: "#14532d", color: "#4ade80", border: "1px solid #22c55e" }}>
            ATIVO
          </span>
        </div>

        {/* abas */}
        <div className="flex gap-2">
          {[
            { id: "painel", label: "Meu Anuncio" },
            { id: "planos", label: "Planos" },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setAbaSelecionada(id as any)}
              className="rounded-lg px-5 py-2 text-sm font-bold transition-colors"
              style={abaSelecionada === id
                ? { backgroundColor: "#C0306A", color: "#fff" }
                : { backgroundColor: "#250C30", color: "#c9a8e0", border: "1px solid #4A1A5C" }}>
              {label}
            </button>
          ))}
        </div>

        {abaSelecionada === "painel" && (
          <>
            {/* toggle disponivel */}
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
                    <p className="font-semibold text-white">Disponivel Agora</p>
                    <p className="text-xs" style={{ color: "#c9a8e0" }}>
                      {disponivel ? "Voce esta aparecendo como disponivel" : "Voce esta oculta no momento"}
                    </p>
                  </div>
                </div>
                <button onClick={() => setDisponivel(v => !v)}
                  className="relative h-6 w-11 rounded-full transition-colors"
                  style={{ backgroundColor: disponivel ? "#C0306A" : "#4A1A5C" }}>
                  <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                    style={{ transform: disponivel ? "translateX(20px)" : "translateX(2px)" }} />
                </button>
              </div>
            </Card>

            {/* metricas */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Visualizacoes", valor: 0, icone: Eye, cor: "#a78bfa" },
                { label: "Cliques WhatsApp", valor: 0, icone: MessageCircle, cor: "#25D366" },
                { label: "Cliques Ligar", valor: 0, icone: Phone, cor: "#60a5fa" },
              ].map(({ label, valor, icone: Icone, cor }) => (
                <Card key={label}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${cor}20` }}>
                      <Icone size={22} style={{ color: cor }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{valor}</p>
                      <p className="text-xs" style={{ color: "#c9a8e0" }}>{label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* acoes */}
            <div className="flex flex-wrap gap-3">
              <a href="/anunciar"
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
                style={{ backgroundColor: "#C0306A" }}>
                <Edit size={16} /> Editar Anuncio
              </a>
              <button onClick={() => setAbaSelecionada("planos")}
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white hover:opacity-70"
                style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
                <Star size={16} /> Upgrade de Plano
              </button>
            </div>

            {/* contato suporte */}
            <Card>
              <h2 className="font-bold text-white mb-3">Precisa de ajuda?</h2>
              <p className="text-sm mb-4" style={{ color: "#c9a8e0" }}>
                Entre em contato com nosso suporte para ativar seu plano ou tirar duvidas.
              </p>
              <a href="https://wa.me/5585991879866" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg py-3 font-bold text-white"
                style={{ backgroundColor: "#25D366" }}>
                <MessageCircle size={18} /> Falar com Suporte
              </a>
            </Card>
          </>
        )}

        {abaSelecionada === "planos" && (
          <div className="flex flex-col gap-4">
            <p className="text-sm" style={{ color: "#c9a8e0" }}>
              Escolha o plano ideal para voce. Apos a escolha, entraremos em contato pelo WhatsApp para enviar o QR Code PIX.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {planos.map((plano) => (
                <div key={plano.id} className="rounded-xl p-5 flex flex-col gap-3"
                  style={{ backgroundColor: "#250C30", border: `2px solid ${planoSelecionado === plano.id ? plano.cor : "#4A1A5C"}` }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{plano.nome}</h3>