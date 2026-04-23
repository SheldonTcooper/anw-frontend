"use client";
import { useState, useEffect } from "react";
import { Eye, MessageCircle, Phone, Edit, Star, Heart, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const planos = [
  { id: "PAGO",           nome: "Basico",      preco: "R$ 49/mes",  cor: "#60a5fa", beneficios: ["Aparece na listagem", "Fotos ilimitadas", "Botao WhatsApp"] },
  { id: "SUPER_DESTAQUE", nome: "Destaque",    preco: "R$ 99/mes",  cor: "#a78bfa", beneficios: ["Tudo do Basico", "Aparece no topo", "Badge Destaque"] },
  { id: "SUPERTOP",       nome: "Super Top",   preco: "R$ 149/mes", cor: "#C0306A", beneficios: ["Tudo do Destaque", "Primeiro da lista", "Badge Super Top"] },
  { id: "ULTRATOP",       nome: "Ultra Top",   preco: "R$ 199/mes", cor: "#B8960C", beneficios: ["Tudo do Super Top", "Popup de destaque", "Badge Gold"] },
];

const STATUS_COR: Record<string, { bg: string; text: string; border: string }> = {
  ATIVO:      { bg: "#14532d", text: "#4ade80", border: "#22c55e" },
  EM_ANALISE: { bg: "#713f12", text: "#fbbf24", border: "#f59e0b" },
  PAUSADO:    { bg: "#1e3a5f", text: "#60a5fa", border: "#3b82f6" },
  EXPIRADO:   { bg: "#3a0a0a", text: "#f87171", border: "#ef4444" },
  REMOVIDO:   { bg: "#1f1f1f", text: "#9ca3af", border: "#6b7280" },
};

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"rounded-xl p-5 " + className} style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
      {children}
    </div>
  );
}

export default function PainelAnunciante() {
  const router = useRouter();
  const [aba, setAba] = useState("painel");
  const [planoSelecionado, setPlanoSelecionado] = useState("");
  const [anuncios, setAnuncios] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("usuario");
    if (u) setUsuario(JSON.parse(u));

    fetch("/api/anuncios/meus")
      .then(r => r.json())
      .then(data => {
        if (data.success) setAnuncios(data.data);
        else if (data.error === "Nao autorizado") router.push("/login");
      })
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, []);

  const anuncio = anuncios[0];

  const toggleDisponivel = async () => {
    if (!anuncio || salvando) return;
    setSalvando(true);
    const novoValor = !anuncio.disponivelAgora;
    try {
      const res = await fetch("/api/anuncios/meus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anuncioId: anuncio.id, disponivelAgora: novoValor }),
      });
      const data = await res.json();
      if (data.success) {
        setAnuncios(prev => prev.map(a => a.id === anuncio.id ? { ...a, disponivelAgora: novoValor } : a));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSalvando(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    localStorage.removeItem("usuario");
    router.push("/");
  };

  const handleEscolherPlano = (planoId: string) => {
    setPlanoSelecionado(planoId);
    const plano = planos.find(p => p.id === planoId);
    alert("Voce escolheu o plano " + plano?.nome + "! Entraremos em contato pelo WhatsApp para enviar o QR Code PIX.");
  };

  const statusInfo = anuncio ? STATUS_COR[anuncio.status] || STATUS_COR.PAUSADO : null;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-4xl flex flex-col gap-6">

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Meu Painel</h1>
            <p className="text-sm mt-0.5" style={{ color: "#c9a8e0" }}>
              {usuario ? "Ola, " + usuario.nome : "Carregando..."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {statusInfo && anuncio && (
              <span className="rounded-full px-3 py-1 text-xs font-bold uppercase"
                style={{ backgroundColor: statusInfo.bg, color: statusInfo.text, border: "1px solid " + statusInfo.border }}>
                {anuncio.status.replace("_", " ")}
              </span>
            )}
            <button onClick={handleLogout} className="flex items-center gap-1 text-xs rounded-lg px-3 py-2"
              style={{ color: "#c9a8e0", border: "1px solid #4A1A5C", backgroundColor: "#250C30" }}>
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setAba("painel")}
            className="rounded-lg px-5 py-2 text-sm font-bold transition-colors"
            style={aba === "painel" ? { backgroundColor: "#C0306A", color: "#fff" } : { backgroundColor: "#250C30", color: "#c9a8e0", border: "1px solid #4A1A5C" }}>
            Meu Anuncio
          </button>
          <button onClick={() => setAba("planos")}
            className="rounded-lg px-5 py-2 text-sm font-bold transition-colors"
            style={aba === "planos" ? { backgroundColor: "#C0306A", color: "#fff" } : { backgroundColor: "#250C30", color: "#c9a8e0", border: "1px solid #4A1A5C" }}>
            Planos
          </button>
        </div>

        {carregando && (
          <Card>
            <p className="text-center text-sm" style={{ color: "#c9a8e0" }}>Carregando seus dados...</p>
          </Card>
        )}

        {!carregando && !anuncio && aba === "painel" && (
          <Card>
            <p className="text-center font-semibold text-white mb-3">Voce ainda nao tem anuncio</p>
            <p className="text-center text-sm mb-4" style={{ color: "#c9a8e0" }}>Crie seu anuncio e comece a receber clientes.</p>
            <a href="/anunciar" className="block text-center rounded-lg py-3 font-bold text-white hover:opacity-90"
              style={{ backgroundColor: "#C0306A" }}>
              Criar meu anuncio
            </a>
          </Card>
        )}

        {!carregando && anuncio && aba === "painel" && (
          <div className="flex flex-col gap-4">
            <Card>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {anuncio.disponivelAgora && (
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "#22c55e" }} />
                      <span className="relative inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                    </span>
                  )}
                  <div>
                    <p className="font-semibold text-white">Disponivel Agora</p>
                    <p className="text-xs" style={{ color: "#c9a8e0" }}>
                      {anuncio.disponivelAgora ? "Voce esta aparecendo como disponivel" : "Voce esta oculta no momento"}
                    </p>
                  </div>
                </div>
                <button onClick={toggleDisponivel} disabled={salvando}
                  className="relative h-6 w-11 rounded-full transition-colors disabled:opacity-50"
                  style={{ backgroundColor: anuncio.disponivelAgora ? "#C0306A" : "#4A1A5C" }}>
                  <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                    style={{ transform: anuncio.disponivelAgora ? "translateX(20px)" : "translateX(2px)" }} />
                </button>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Visualizacoes",   valor: anuncio.metricas.visualizacoes,   icone: Eye,           cor: "#a78bfa" },
                { label: "Cliques WhatsApp", valor: anuncio.metricas.cliquesWhatsapp, icone: MessageCircle, cor: "#25D366" },
                { label: "Cliques Ligar",   valor: anuncio.metricas.cliquesLigar,    icone: Phone,         cor: "#60a5fa" },
                { label: "Favoritos",        valor: anuncio.metricas.favoritos,       icone: Heart,         cor: "#C0306A" },
              ].map(({ label, valor, icone: Icone, cor }) => (
                <Card key={label}>
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: cor + "20" }}>
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

            <div className="flex flex-wrap gap-3">
              <a href="/anunciar"
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
                style={{ backgroundColor: "#C0306A" }}>
                <Edit size={16} /> Editar Anuncio
              </a>
              <button onClick={() => setAba("planos")}
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white hover:opacity-70"
                style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
                <Star size={16} /> Upgrade de Plano
              </button>
            </div>

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
          </div>
        )}

        {aba === "planos" && (
          <div className="flex flex-col gap-4">
            <p className="text-sm" style={{ color: "#c9a8e0" }}>
              Escolha o plano ideal. Apos a escolha, entraremos em contato pelo WhatsApp para enviar o QR Code PIX.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {planos.map((plano) => (
                <div key={plano.id} className="rounded-xl p-5 flex flex-col gap-3"
                  style={{ backgroundColor: "#250C30", border: "2px solid " + (planoSelecionado === plano.id ? plano.cor : "#4A1A5C") }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{plano.nome}</h3>
                    <span className="text-xl font-bold" style={{ color: plano.cor }}>{plano.preco}</span>
                  </div>
                  <ul className="flex flex-col gap-1">
                    {plano.beneficios.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm" style={{ color: "#c9a8e0" }}>
                        <span style={{ color: plano.cor }}>✓</span> {b}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleEscolherPlano(plano.id)}
                    className="w-full rounded-lg py-2.5 text-sm font-bold text-white hover:opacity-90"
                    style={{ backgroundColor: plano.cor }}>
                    Escolher Plano
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
