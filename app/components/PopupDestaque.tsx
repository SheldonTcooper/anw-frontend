"use client";
import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

interface Anuncio {
  id: string;
  titulo: string;
  cidade: string;
  estado: string;
  cache: number | null;
  whatsapp: string | null;
  slug: string;
  midias: { url: string }[];
}

export default function PopupDestaque() {
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch('/api/anuncios/destaque')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAnuncio(data.data);
          setTimeout(() => setVisible(true), 2000);
        }
      })
      .catch(() => {});
  }, []);

  if (!visible || !anuncio) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={() => setVisible(false)}>
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "#250C30", border: "2px solid #C0306A" }}
        onClick={e => e.stopPropagation()}>

        {/* Badge destaque */}
        <div className="absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs font-bold uppercase"
          style={{ backgroundColor: "#B8960C", color: "#fff" }}>
          ⭐ Destaque
        </div>

        {/* Fechar */}
        <button onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <X size={16} stroke="#fff" />
        </button>

        {/* Foto */}
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

        {/* Info */}
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
              <a href={`https://wa.me/55${anuncio.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 font-bold text-white"
                style={{ backgroundColor: "#25D366" }}>
                <MessageCircle size={18} /> WhatsApp
              </a>
            )}
            <a href={`/acompanhantes/${anuncio.cidade.toLowerCase().replace(/\s+/g, '-')}/${anuncio.slug}`}
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