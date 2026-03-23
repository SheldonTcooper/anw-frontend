"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Aba = "anunciante" | "cliente" | "admin";

const abas: { id: Aba; label: string }[] = [
  { id: "anunciante", label: "Anunciante" },
  { id: "cliente",    label: "Cliente" },
  { id: "admin",      label: "Admin" },
];

function FormLogin({ temCriarConta }: { temCriarConta: boolean }) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-5"
    >
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>
          E-mail
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#C0306A]"
          style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}
        />
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>
          Senha
        </label>
        <div className="relative">
          <input
            type={senhaVisivel ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg px-4 py-3 pr-12 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#C0306A]"
            style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}
          />
          <button
            type="button"
            onClick={() => setSenhaVisivel((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
            style={{ color: "#c9a8e0" }}
            aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
          >
            {senhaVisivel ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Link esqueci senha */}
      <div className="text-right">
        <a href="#" className="text-sm hover:underline" style={{ color: "#C0306A" }}>
          Esqueci minha senha
        </a>
      </div>

      {/* Botão entrar */}
      <button
        type="submit"
        className="rounded-lg py-3 font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#C0306A" }}
      >
        Entrar
      </button>

      {/* Link criar conta */}
      {temCriarConta && (
        <p className="text-center text-sm" style={{ color: "#c9a8e0" }}>
          Não tem uma conta?{" "}
          <a href="#" className="font-semibold hover:underline" style={{ color: "#C0306A" }}>
            Criar conta
          </a>
        </p>
      )}
    </form>
  );
}

export default function LoginPage() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>("anunciante");

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#1A0A1E" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}
      >
        {/* Título */}
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Entrar no{" "}
          <span style={{ color: "#C0306A" }}>ANW</span>
        </h1>

        {/* Abas */}
        <div
          className="mb-8 flex overflow-hidden rounded-lg"
          style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}
        >
          {abas.map((aba) => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id)}
              className="flex-1 py-2.5 text-sm font-semibold transition-colors"
              style={
                abaAtiva === aba.id
                  ? { backgroundColor: "#C0306A", color: "#fff" }
                  : { color: "#c9a8e0" }
              }
            >
              {aba.label}
            </button>
          ))}
        </div>

        {/* Formulário */}
        <FormLogin temCriarConta={abaAtiva !== "admin"} />
      </div>
    </main>
  );
}
