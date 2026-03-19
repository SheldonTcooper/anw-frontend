"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AvisoMaioridade() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const confirmado = Cookies.get("maioridade_confirmada");
    if (!confirmado) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleConfirmar = () => {
    Cookies.set("maioridade_confirmada", "true", { expires: 30 });
    setVisible(false);
  };

  const handleSair = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 px-6 text-center"
      style={{ backgroundColor: "#1A0A1E" }}
    >
      <p className="max-w-md text-lg font-medium text-white">
        Este site contém conteúdo adulto. Você confirma que tem 18 anos ou mais?
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={handleConfirmar}
          className="rounded px-8 py-3 font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#C0306A" }}
        >
          Sou maior de 18
        </button>
        <button
          onClick={handleSair}
          className="rounded border border-white px-8 py-3 font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-70"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
