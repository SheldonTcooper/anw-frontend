"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AvisoMaioridade() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const confirmado = Cookies.get("maioridade_confirmada");
    if (!confirmado) setVisible(true);
  }, []);

  if (!visible) return null;

  const handleConfirmar = () => {
    Cookies.set("maioridade_confirmada", "true", { expires: 30 });
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 px-6 text-center"
      style={{ backgroundColor: "#1A0A1E" }}>
      <div className="flex flex-col items-center gap-4">
        <span className="text-5xl">🔞</span>
        <h1 className="text-2xl font-bold text-white">Conteudo Adulto</h1>
        <p className="max-w-md text-base" style={{ color: "#c9a8e0" }}>
          Este site contem conteudo adulto destinado a maiores de 18 anos.
          Ao continuar, voce confirma que tem 18 anos ou mais e concorda com
          os nossos Termos de Uso.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button onClick={handleConfirmar}
          className="rounded-lg px-8 py-3 font-bold uppercase tracking-wide text-white hover:opacity-90"
          style={{ backgroundColor: "#C0306A" }}>
          Sou maior de 18
        </button>
        <button onClick={() => window.location.href = "https://www.google.com"}
          className="rounded-lg border px-8 py-3 font-bold uppercase tracking-wide text-white hover:opacity-70"
          style={{ borderColor: "#4A1A5C" }}>
          Sair
        </button>
      </div>
    </div>
  );
}