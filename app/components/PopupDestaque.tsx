"use client";
import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

export default function PopupDestaque() {
  const [anuncio, setAnuncio] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [modo, setModo] = useState<"destaque" | "promocional">("promocional");

  useEffect(() => {
    fetch('/api/anuncios/destaque')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAnuncio(data.data);
          setModo("destaque");
        } else {
          setModo("promocional");
        }
        setTimeout(() => {
          const confirmado = document.cookie.includes("maioridade_confirmada");
          if (confirmado) setVisible(true);
        }, 3000);
      })
      .catch(() => {
        setTimeout(() => {
          const confirmado = document.cookie.includes("maioridade_confirmada");
          if (confirmado) { setModo("promocional"); setVisible(true); }
        }, 3000);
      });
  }, []);

  if (!visible) return null;

  if (modo === "promocional") {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center px-4"
        style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
        onClick={() => setVisible(false)}>
        <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: "#250C30", border: "2px solid #C0306A" }}
          onClick={e => e.stopPropagation()}>
          <div className="absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs font-bold uppercase"
            style={{ backgroundColor: "#C0306A", color: "#fff" }}>
            Anuncie Aqui
          </div>
          <button onClick={() => setVisible(false)}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
            <X size={16} stroke="#fff" />
          </button>
          <div className="relative w-full" style={{ paddingBottom: "120%" }}>
            <img src="/preview.webp" alt="Anuncie aqui"
              className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1A0A1E 0%, transparent 50%)" }} />
          </div>
          <div className="p-5">
            <h2 className="text-xl font-bold text-white mb-1">Seu anuncio aqui!</h2>
            <p className="text-sm mb-3" style={{ color: "#c9a8e0" }}>
              Apareca em destaque para milhares de clientes. Planos a partir de R$ 49/mes.
            </p>
            <div className="flex gap-2">
              <a href="https://wa.me/5585991879866" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-bold text-white"
                style={{ backgroundColor: "#25D366" }}>
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a href="/anunciar"
                className="flex-1 flex items-center justify-center rounded-lg py-3 font-bold text-white"
                style={{ backgroundColor: "#C0306A" }}>
                Anunciar
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cidadeSlug = anuncio.cidade.toLowerCase().replace(/\s+/g, '-');
  const whatsappUrl = "https://wa.me/55" + anuncio.whatsapp;
  const perfilUrl = "/acompanhantes/" + cidadeSlug + "/" + anuncio.slug;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={() => setVisible(false)}>
      <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#250C30", border: "2px solid #C0306A" }}
        onClick={e => e.stopPropagation()}>
        <div className="absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs font-bold uppercase"
          style={{ backgroundColor: "#B8960C", color: "#fff" }}>
          Destaque
        </div>
        <button onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <X size={16} stroke="#fff" />
        </button>
        <div className="relative w-full" style={{ paddingBottom: "120%", backgroundColor: "#3a3a3a" }}>
          {anuncio.midias?.[0]?.url ? (
            <img src={anuncio.midias[0].url} alt={anuncio.titulo}
              className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">👤</span>
            </div>
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1A0A1E 0%, transparent 50%)" }} />
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold text-white mb-1">{anuncio.titulo}</h2>
          <p className="text-sm mb-1" style={{ color: "#c9a8e0" }}>{anuncio.cidade} - {anuncio.estado}</p>
          {anuncio.cache && (
            <p className="text-2xl font-bold mb-4" style={{ color: "#C0306A" }}>
              R$ {Number(anuncio.cache).toFixed(0)}/hora
            </p>
          )}
          <div className="flex gap-2">
            {anuncio.whatsapp && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-bold text-white"
                style={{ backgroundColor: "#25D366" }}>
                <MessageCircle size={18} /> WhatsApp
              </a>
            )}
            <a href={perfilUrl}
              className="flex-1 flex items-center justify-center rounded-lg py-3 font-bold text-white"
              style={{ backgroundColor: "#C0306A" }}>
              Ver Perfil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
