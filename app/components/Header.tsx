"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const categorias = [
  "Mulheres",
  "Trans",
  "Homens",
  "Gays",
  "Casais",
  "Massagistas",
  "Chamadas de Vídeo",
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header style={{ backgroundColor: "#250C30" }} className="w-full px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="relative">
          <button
            onClick={() => setMenuAberto((v) => !v)}
            className="flex items-center gap-1 text-white hover:opacity-80"
          >
            Categorias
            <ChevronDown size={16} />
          </button>
          {menuAberto && (
            <ul
              className="absolute left-0 top-full z-40 mt-1 min-w-[180px] overflow-hidden rounded shadow-lg"
              style={{ backgroundColor: "#250C30", border: "1px solid #3a1550" }}
            >
              {categorias.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setMenuAberto(false)}
                    className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#3a1550]"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <a href="/" className="text-xl font-bold" style={{ color: "#C0306A" }}>
          AcompanhantesNaWeb
        </a>

        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm font-semibold hover:underline" style={{ color: "#F2E6F5" }}>
            Entrar
          </a>
          
            href="/anunciar"
            className="rounded px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90"
            style={{ backgroundColor: "#C0306A" }}
          >
            Publicar Anúncio
          </a>
        </div>
      </div>

      <div className="mt-3">
        <input
          type="text"
          placeholder="Buscar por nome, cidade ou serviço..."
          className="w-full rounded px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-[#C0306A]"
          style={{ backgroundColor: "#3a1550", border: "1px solid #4a1f60" }}
        />
      </div>

      <div className="mt-2 text-sm" style={{ color: "#F2E6F5" }}>
        Acompanhantes em Brasil
      </div>
    </header>
  );
}