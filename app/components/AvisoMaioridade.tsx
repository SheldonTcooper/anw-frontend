"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AvisoMaioridade() {
  const [visible, setVisible] = useState(true);
  const [checado, setChecado] = useState(false);

  useEffect(() => {
    const confirmado = Cookies.get("maioridade_confirmada");
    if (confirmado) setVisible(false);
    setChecado(true);
  }, []);

  if (!checado || !visible) return null;

  const handleConfirmar = () => {
    Cookies.set("maioridade_confirmada", "true", { expires: 30 });
    setVisible(false);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 px-6 text-center"
      style={{ backgroundColor: "#1A0A1E" }}
    >
      <div className="flex flex-col items-center gap-4 max-w-md">
        <span className="text-6xl">🔞</span>
        <h1 className="text-3xl font-bold text-white">Conteudo Adulto</h1>
        <p className="text-base leading-relaxed" style={{ color: "#c9a8e0" }}>
          Este site contem conteudo adulto destinado exclusivamente a maiores de 18 anos.
          Ao continuar, voce confirma que tem 18 anos ou mais e concorda com os nossos Termos de Uso.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={handleConfirmar}
          className="rounded-lg px-10 py-4 text-lg font-bold uppercase tracking-wide text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#C0306A" }}
        >
          Sou maior de 18
        </button>
        <button
          onClick={() => window.location.href = "https://www.google.com"}
          className="rounded-lg border px-10 py-4 text-lg font-bold uppercase tracking-wide text-white hover:opacity-70 transition-opacity"
          style={{ borderColor: "#4A1A5C", backgroundColor: "transparent" }}
        >
          Sair
        </button>
      </div>
      <p className="text-xs" style={{ color: "#4A1A5C" }}>
        Ao entrar voce concorda com nossos Termos de Uso e Politica de Privacidade.
      </p>
    </div>
  );
}