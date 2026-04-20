"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

type Aba = "anunciante" | "cliente" | "admin";
type Modo = "login" | "registro";

const abas: { id: Aba; label: string }[] = [
  { id: "anunciante", label: "Anunciante" },
  { id: "cliente",    label: "Cliente" },
  { id: "admin",      label: "Admin" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const ADMIN_PIN = "115566";

function FormAdmin() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    await new Promise(r => setTimeout(r, 500));
    if (pin === ADMIN_PIN) {
      document.cookie = `token=admin-pin-token; path=/; max-age=${60 * 60 * 24 * 7}`;
      localStorage.setItem("usuario", JSON.stringify({
        id: "admin_001",
        nome: "Admin ANW",
        email: "contato@acompanhantesnaweb.com.br",
        tipo: "ADMIN"
      }));
      router.push("/admin");
    } else {
      setErro("PIN incorreto");
    }
    setCarregando(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {erro && (
        <div className="rounded-lg px-4 py-3 text-sm text-red-300" style={{ backgroundColor: "#3a0a0a", border: "1px solid #ef4444" }}>
          {erro}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>PIN de acesso</label>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••••"
          required
          maxLength={6}
          className="rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#C0306A] tracking-widest text-center text-xl"
          style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}
        />
      </div>
      <button
        type="submit"
        disabled={carregando}
        className="rounded-lg py-3 font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#C0306A" }}
      >
        {carregando ? "Verificando..." : "Entrar"}
      </button>
    </form>
  );
}

function FormLogin({ temCriarConta, tipo }: { temCriarConta: boolean; tipo: Aba }) {
  const router = useRouter();
  const [modo, setModo] = useState<Modo>("login");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      if (modo === "login") {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erro ao fazer login");

        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        if (data.usuario.tipo === "ADMIN") router.push("/admin");
        else if (data.usuario.tipo === "ANUNCIANTE") router.push("/painel");
        else router.push("/cliente");

      } else {
        const res = await fetch(`${API_URL}/api/auth/registro`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha, telefone, tipo: tipo.toUpperCase() }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erro ao criar conta");

        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        if (data.usuario.tipo === "ANUNCIANTE") router.push("/painel");
        else router.push("/cliente");
      }
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {erro && (
        <div className="rounded-lg px-4 py-3 text-sm text-red-300" style={{ backgroundColor: "#3a0a0a", border: "1px solid #ef4444" }}>
          {erro}
        </div>
      )}

      {modo === "registro" && (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
              className="rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#C0306A]"
              style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>Telefone / WhatsApp</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(11) 99999-0000"
              className="rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#C0306A]"
              style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}
            />
          </div>
        </>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className="rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#C0306A]"
          style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>Senha</label>
        <div className="relative">
          <input
            type={senhaVisivel ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#C0306A]"
            style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}
          />
          <button
            type="button"
            onClick={() => setSenhaVisivel((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
            style={{ color: "#c9a8e0" }}
          >
            {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {modo === "login" && (
        <div className="text-right">
          <a href="#" className="text-sm hover:underline" style={{ color: "#C0306A" }}>
            Esqueci minha senha
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={carregando}
        className="rounded-lg py-3 font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#C0306A" }}
      >
        {carregando ? "Aguarde..." : modo === "login" ? "Entrar" : "Criar conta"}
      </button>

      {temCriarConta && (
        <p className="text-center text-sm" style={{ color: "#c9a8e0" }}>
          {modo === "login" ? "Não tem uma conta? " : "Já tem uma conta? "}
          <button
            type="button"
            onClick={() => { setModo(modo === "login" ? "registro" : "login"); setErro(""); }}
            className="font-semibold hover:underline"
            style={{ color: "#C0306A" }}
          >
            {modo === "login" ? "Criar conta" : "Fazer login"}
          </button>
        </p>
      )}
    </form>
  );
}

export default function LoginPage() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>("anunciante");

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="w-full max-w-md rounded-2xl p-8" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Entrar no <span style={{ color: "#C0306A" }}>ANW</span>
        </h1>

        <div className="mb-8 flex overflow-hidden rounded-lg" style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}>
          {abas.map((aba) => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id)}
              className="flex-1 py-2.5 text-sm font-semibold transition-colors"
              style={abaAtiva === aba.id ? { backgroundColor: "#C0306A", color: "#fff" } : { color: "#c9a8e0" }}
            >
              {aba.label}
            </button>
          ))}
        </div>

        {abaAtiva === "admin" ? (
          <FormAdmin />
        ) : (
          <FormLogin temCriarConta={true} tipo={abaAtiva as "anunciante" | "cliente"} />
        )}
      </div>
    </main>
  );
}