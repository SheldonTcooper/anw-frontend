"use client";
import { useState } from "react";
import { Eye, EyeOff, User, Megaphone } from "lucide-react";
import { useRouter } from "next/navigation";

type Perfil = "cliente" | "anunciante";
type Modo = "login" | "registro";

const inputCls = "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#C0306A]";
const inputStyle = { backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" };

export default function LoginPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil>("cliente");
  const [modo, setModo] = useState<Modo>("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      if (modo === "login") {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erro ao fazer login");
        document.cookie = "token=" + data.token + "; path=/; max-age=" + (60 * 60 * 24 * 7);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        if (data.usuario.tipo === "ANUNCIANTE") router.push("/painel");
        else router.push("/");
      } else {
        const res = await fetch('/api/auth/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, senha, telefone, tipo: perfil.toUpperCase() })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erro ao criar conta");
        document.cookie = "token=" + data.token + "; path=/; max-age=" + (60 * 60 * 24 * 7);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        if (data.usuario.tipo === "ANUNCIANTE") router.push("/como-funciona");
        else router.push("/");
      }
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Acompanhantes<span style={{ color: "#C0306A" }}>NaWeb</span>
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#c9a8e0" }}>
            {modo === "login" ? "Entre na sua conta" : "Crie sua conta gratuita"}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>

          {/* Seletor de perfil */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button onClick={() => setPerfil("cliente")}
              className="flex flex-col items-center gap-2 rounded-xl p-4 transition-all"
              style={{ backgroundColor: perfil === "cliente" ? "#C0306A" : "#1A0A1E", border: "2px solid " + (perfil === "cliente" ? "#C0306A" : "#4A1A5C") }}>
              <User size={22} color="#fff" />
              <span className="text-sm font-bold text-white">Cliente</span>
              <span className="text-xs text-center" style={{ color: perfil === "cliente" ? "#ffcce0" : "#c9a8e0" }}>Encontrar acompanhantes</span>
            </button>
            <button onClick={() => setPerfil("anunciante")}
              className="flex flex-col items-center gap-2 rounded-xl p-4 transition-all"
              style={{ backgroundColor: perfil === "anunciante" ? "#C0306A" : "#1A0A1E", border: "2px solid " + (perfil === "anunciante" ? "#C0306A" : "#4A1A5C") }}>
              <Megaphone size={22} color="#fff" />
              <span className="text-sm font-bold text-white">Anunciante</span>
              <span className="text-xs text-center" style={{ color: perfil === "anunciante" ? "#ffcce0" : "#c9a8e0" }}>Publicar meu anuncio</span>
            </button>
          </div>

          {/* Toggle login/registro */}
          <div className="mb-6 flex overflow-hidden rounded-xl" style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}>
            <button onClick={() => { setModo("login"); setErro(""); }}
              className="flex-1 py-2.5 text-sm font-semibold transition-colors"
              style={modo === "login" ? { backgroundColor: "#C0306A", color: "#fff" } : { color: "#c9a8e0" }}>
              Entrar
            </button>
            <button onClick={() => { setModo("registro"); setErro(""); }}
              className="flex-1 py-2.5 text-sm font-semibold transition-colors"
              style={modo === "registro" ? { backgroundColor: "#C0306A", color: "#fff" } : { color: "#c9a8e0" }}>
              Criar conta
            </button>
          </div>

          {/* Erro */}
          {erro && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm text-red-300" style={{ backgroundColor: "#3a0a0a", border: "1px solid #ef4444" }}>
              {erro}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {modo === "registro" && (
              <>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>Nome completo</label>
                  <input type="text" value={nome} onChange={e => setNome(e.target.value)}
                    placeholder="Seu nome" required className={inputCls} style={inputStyle} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>Telefone / WhatsApp</label>
                  <input type="tel" value={telefone} onChange={e => setTelefone(e.target.value)}
                    placeholder="(11) 99999-0000" className={inputCls} style={inputStyle} />
                </div>
              </>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>E-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com" required className={inputCls} style={inputStyle} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>Senha</label>
              <div className="relative">
                <input type={senhaVisivel ? "text" : "password"} value={senha} onChange={e => setSenha(e.target.value)}
                  placeholder="Minimo 6 caracteres" required minLength={6}
                  className={inputCls + " pr-12"} style={inputStyle} />
                <button type="button" onClick={() => setSenhaVisivel(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#c9a8e0" }}>
                  {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={carregando}
              className="mt-2 w-full rounded-xl py-3.5 font-bold uppercase tracking-wide text-white hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#C0306A" }}>
              {carregando ? "Aguarde..." : modo === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          {/* Voltar ao site */}
          <div className="mt-6 text-center">
            <a href="/" className="text-sm hover:underline" style={{ color: "#c9a8e0" }}>
              ← Voltar ao site sem entrar
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}