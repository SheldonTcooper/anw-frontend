"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, LogIn, PlusCircle } from "lucide-react";

const categorias = ["Mulheres","Trans","Homens","Gays","Casais","Massagistas","Chamadas de Video"];

export default function Header() {
  const [menuCat, setMenuCat] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem("usuario");
      if (u) setUsuario(JSON.parse(u));
    } catch {}
  }, []);

  const sair = () => {
    localStorage.removeItem("usuario");
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = "/";
  };

  return (
    <header style={{ backgroundColor: "#250C30", borderBottom: "1px solid #4A1A5C" }} className="w-full sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-2">

          {/* Categorias — desktop */}
          <div className="relative hidden sm:block">
            <button onClick={() => setMenuCat(v => !v)}
              className="flex items-center gap-1 text-sm font-semibold text-white hover:opacity-80">
              Categorias <ChevronDown size={14} />
            </button>
            {menuCat && (
              <ul className="absolute left-0 top-full z-40 mt-1 min-w-[160px] overflow-hidden rounded-xl shadow-lg"
                style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
                {categorias.map(cat => (
                  <li key={cat}>
                    <button onClick={() => setMenuCat(false)}
                      className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-[#3a1550]">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Logo */}
          <a href="/" className="text-lg font-bold sm:text-xl" style={{ color: "#C0306A" }}>
            AcompanhantesNaWeb
          </a>

          {/* Desktop — botões */}
          <div className="hidden sm:flex items-center gap-3">
            {usuario ? (
              <>
                <span className="text-sm" style={{ color: "#c9a8e0" }}>Ola, {usuario.nome?.split(" ")[0]}</span>
                {usuario.tipo === "ANUNCIANTE" && (
                  <a href="/painel" className="text-sm font-semibold hover:underline" style={{ color: "#c9a8e0" }}>Painel</a>
                )}
                <button onClick={sair} className="text-sm font-semibold hover:underline" style={{ color: "#c9a8e0" }}>Sair</button>
              </>
            ) : (
              <>
                <a href="/login" className="text-sm font-semibold hover:underline" style={{ color: "#c9a8e0" }}>Entrar</a>
                <a href="/anunciar" className="rounded-lg px-3 py-2 text-xs font-bold uppercase text-white hover:opacity-90"
                  style={{ backgroundColor: "#C0306A" }}>
                  Publicar
                </a>
              </>
            )}
          </div>

          {/* Mobile — hamburger */}
          <button onClick={() => setMenuMobile(v => !v)} className="flex sm:hidden items-center justify-center rounded-lg p-2"
            style={{ backgroundColor: "#1A0A1E" }}>
            {menuMobile ? <X size={20} color="#fff" /> : <Menu size={20} color="#fff" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuMobile && (
          <div className="mt-3 flex flex-col gap-2 sm:hidden pb-2">
            <div className="flex gap-2">
              {usuario ? (
                <>
                  {usuario.tipo === "ANUNCIANTE" && (
                    <a href="/painel" className="flex-1 rounded-lg py-2.5 text-center text-sm font-bold text-white"
                      style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
                      Meu Painel
                    </a>
                  )}
                  <button onClick={sair} className="flex-1 rounded-lg py-2.5 text-center text-sm font-bold"
                    style={{ backgroundColor: "#450a0a", color: "#f87171" }}>
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white"
                    style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
                    <LogIn size={16} /> Entrar
                  </a>
                  <a href="/anunciar" className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white"
                    style={{ backgroundColor: "#C0306A" }}>
                    <PlusCircle size={16} /> Publicar
                  </a>
                </>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setMenuCat(v => !v)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}>
                Categorias <ChevronDown size={14} />
              </button>
              {menuCat && (
                <ul className="mt-1 overflow-hidden rounded-xl" style={{ backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" }}>
                  {categorias.map(cat => (
                    <li key={cat}>
                      <button onClick={() => { setMenuCat(false); setMenuMobile(false); }}
                        className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-[#3a1550]">
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}