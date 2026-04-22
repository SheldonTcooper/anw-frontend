"use client";
import { useState, useEffect } from "react";
import { Check, X, Eye, Clock, CheckCircle, XCircle, Lock, Settings, LogOut, Key } from "lucide-react";

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

function PinScreen({ onLogin }: { onLogin: () => void }) {
  const [pin, setPin] = useState("");
  const [erro, setErro] = useState(false);
  const [shake, setShake] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const verificarPin = async (pinDigitado: string) => {
    setCarregando(true);
    try {
      const res = await fetch('/api/admin/pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinDigitado })
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("anw_admin_logado", "1");
        onLogin();
      } else {
        setErro(true);
        setShake(true);
        setPin("");
        setTimeout(() => { setErro(false); setShake(false); }, 1000);
      }
    } catch {
      setErro(true);
      setPin("");
    } finally {
      setCarregando(false);
    }
  };

  const adicionarDigito = (d: string) => {
    if (pin.length >= 6 || carregando) return;
    const novo = pin + d;
    setPin(novo);
    if (novo.length >= 4) {
      setTimeout(() => verificarPin(novo), 200);
    }
  };

  const removerDigito = () => setPin(p => p.slice(0, -1));

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "#250C30", border: "2px solid #C0306A" }}>
            <Lock size={28} style={{ color: "#C0306A" }} />
          </div>
          <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
          <p className="text-sm" style={{ color: "#c9a8e0" }}>Digite o PIN de acesso</p>
        </div>

        <div className={`flex gap-3 ${shake ? "animate-bounce" : ""}`}>
          {[0,1,2,3].map((i) => (
            <div key={i} className="h-4 w-4 rounded-full transition-all"
              style={{ backgroundColor: i < pin.length ? (erro ? "#ef4444" : "#C0306A") : "#4A1A5C" }} />
          ))}
        </div>

        {erro && <p className="text-sm text-red-400">PIN incorreto!</p>}
        {carregando && <p className="text-sm" style={{ color: "#c9a8e0" }}>Verificando...</p>}

        <div className="grid grid-cols-3 gap-3 w-full">
          {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((d, i) => (
            <button key={i} onClick={() => d === "⌫" ? removerDigito() : d ? adicionarDigito(d) : null}
              disabled={(!d && d !== "0") || carregando}
              className="h-14 rounded-xl text-xl font-bold transition-all hover:opacity-80 active:scale-95 disabled:invisible"
              style={{ backgroundColor: d === "⌫" ? "#450a0a" : "#250C30", color: d === "⌫" ? "#f87171" : "#fff", border: "1px solid #4A1A5C" }}>
              {d}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

function TrocarPin({ onVoltar }: { onVoltar: () => void }) {
  const [pinAtual, setPinAtual] = useState("");
  const [pinNovo, setPinNovo] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [msg, setMsg] = useState<{ text: string; tipo: "ok" | "erro" } | null>(null);

  const salvar = async () => {
    if (pinNovo.length < 4) { setMsg({ text: "Novo PIN deve ter ao menos 4 digitos!", tipo: "erro" }); return; }
    if (pinNovo !== pinConfirm) { setMsg({ text: "PINs nao coincidem!", tipo: "erro" }); return; }
    const res = await fetch('/api/admin/pin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinAtual, pinNovo })
    });
    const data = await res.json();
    if (data.success) {
      setMsg({ text: "Novo PIN: " + pinNovo + " — Atualize ADMIN_PIN no Vercel para salvar permanentemente!", tipo: "ok" });
      setPinAtual(""); setPinNovo(""); setPinConfirm("");
    } else {
      setMsg({ text: data.error || "Erro ao trocar PIN", tipo: "erro" });
    }
  };

  const inputCls = "rounded-lg px-4 py-3 text-white text-sm outline-none w-full";
  const inputStyle = { backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" };

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex items-center gap-2 mb-2">
        <Key size={18} style={{ color: "#C0306A" }} />
        <h2 className="text-lg font-bold text-white">Trocar PIN</h2>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm" style={{ color: "#c9a8e0" }}>PIN atual</label>
        <input type="password" maxLength={8} value={pinAtual} onChange={e => setPinAtual(e.target.value)}
          placeholder="Digite o PIN atual" className={inputCls} style={inputStyle} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm" style={{ color: "#c9a8e0" }}>Novo PIN</label>
        <input type="password" maxLength={8} value={pinNovo} onChange={e => setPinNovo(e.target.value)}
          placeholder="Digite o novo PIN" className={inputCls} style={inputStyle} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm" style={{ color: "#c9a8e0" }}>Confirmar novo PIN</label>
        <input type="password" maxLength={8} value={pinConfirm} onChange={e => setPinConfirm(e.target.value)}
          placeholder="Confirme o novo PIN" className={inputCls} style={inputStyle} />
      </div>
      {msg && (
        <p className="text-sm" style={{ color: msg.tipo === "ok" ? "#4ade80" : "#f87171" }}>{msg.text}</p>
      )}
      <div className="flex gap-3">
        <button onClick={onVoltar} className="flex-1 rounded-lg py-3 text-sm font-bold"
          style={{ backgroundColor: "transparent", border: "1px solid #4A1A5C", color: "#c9a8e0" }}>
          Cancelar
        </button>
        <button onClick={salvar} className="flex-1 rounded-lg py-3 text-sm font-bold text-white hover:opacity-90"
          style={{ backgroundColor: "#C0306A" }}>
          Salvar PIN
        </button>
      </div>
    </div>
  );
}

export default function PainelAdmin() {
  const [logado, setLogado] = useState(false);
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"todos" | Status>("todos");
  const [aba, setAba] = useState<"anuncios" | "configuracoes">("anuncios");

  useEffect(() => {
    const sessao = sessionStorage.getItem("anw_admin_logado");
    if (sessao === "1") setLogado(true);
  }, []);

  useEffect(() => {
    if (logado) carregarAnuncios();
  }, [logado]);

  const carregarAnuncios = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/anuncios');
      const data = await res.json();
      if (data.success) setAnuncios(data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const sair = () => {
    sessionStorage.removeItem("anw_admin_logado");
    setLogado(false);
  };

  const atualizarStatus = async (id: string, status: Status) => {
    try {
      const res = await fetch('/api/admin/anuncios', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (data.success) setAnuncios(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch { alert('Erro ao atualizar status'); }
  };

  if (!logado) return <PinScreen onLogin={() => setLogado(true)} />;

  const stats = {
    total: anuncios.length,
    pendentes: anuncios.filter(a => a.status === 'EM_ANALISE').length,
    aprovados: anuncios.filter(a => a.status === 'ATIVO').length,
    rejeitados: anuncios.filter(a => a.status === 'REMOVIDO').length,
  };

  const visiveis = filtro === 'todos' ? anuncios : anuncios.filter(a => a.status === filtro);

  const metricaCards = [
    { label: "Total",      valor: stats.total,      icone: Eye,         cor: "#a78bfa" },
    { label: "Pendentes",  valor: stats.pendentes,   icone: Clock,       cor: "#fb923c" },
    { label: "Aprovados",  valor: stats.aprovados,   icone: CheckCircle, cor: "#4ade80" },
    { label: "Rejeitados", valor: stats.rejeitados,  icone: XCircle,     cor: "#f87171" },
  ];

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-5xl flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
            <p className="text-sm mt-0.5" style={{ color: "#c9a8e0" }}>Moderacao de anuncios</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setAba(aba === "configuracoes" ? "anuncios" : "configuracoes")}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-opacity hover:opacity-80"
              style={{ backgroundColor: aba === "configuracoes" ? "#C0306A" : "#250C30", color: "#fff", border: "1px solid #4A1A5C" }}>
              <Settings size={15} /> Config
            </button>
            <button onClick={sair}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#450a0a", color: "#f87171", border: "1px solid #4A1A5C" }}>
              <LogOut size={15} /> Sair
            </button>
          </div>
        </div>

        {aba === "configuracoes" ? (
          <Card>
            <TrocarPin onVoltar={() => setAba("anuncios")} />
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {metricaCards.map(({ label, valor, icone: Icone, cor }) => (
                <Card key={label}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: cor + "20" }}>
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
                    : { backgroundColor: "#250C30", color: "#c9a8e0", border: "1px solid #4A1A5C" }}>
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
                        {["#","Titulo","Cidade","WhatsApp","Valor/h","Cadastro","Status","Acoes"].map(h => (
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
                              {a.cache ? "R$ " + Number(a.cache).toFixed(0) : '-'}
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
                                <a href={"/acompanhantes/" + a.cidade?.toLowerCase().replace(/\s+/g, '-') + "/" + a.slug} target="_blank"
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
                  <p className="py-10 text-center text-sm" style={{ color: "#c9a8e0" }}>Nenhum anuncio neste filtro.</p>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}