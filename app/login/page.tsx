"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const categorias = ["Todas","Loiras","Morenas","Ruivas","Acompanhantes de Luxo","Universitarias"];

export default function Home() {
  const [anuncios, setAnuncios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  useEffect(() => {
    fetch("/api/anuncios")
      .then(res => res.json())
      .then(data => { if (data.success) setAnuncios(data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtrados = anuncios.filter(ad => {
    if (!busca) return true;
    const t = busca.toLowerCase();
    return ad.titulo?.toLowerCase().includes(t) || ad.cidade?.toLowerCase().includes(t);
  });

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#1A0A1E" }}>

      {/* Hero — compacto no mobile */}
      <section className="px-4 py-8 text-center sm:py-12" style={{ background: "linear-gradient(180deg, #250C30 0%, #1A0A1E 100%)" }}>
        <h1 className="text-2xl font-bold text-white sm:text-4xl">
          Acompanhantes<span style={{ color: "#C0306A" }}>NaWeb</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base" style={{ color: "#c9a8e0" }}>
          As mais belas acompanhantes do Brasil
        </p>
        <div className="mx-auto mt-4 max-w-lg">
          <input type="text" placeholder="Buscar por nome ou cidade..."
            value={busca} onChange={e => setBusca(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C0306A]"
            style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }} />
        </div>
      </section>

      {/* Categorias */}
      <section className="px-4 py-4">
        <div className="mx-auto max-w-6xl overflow-x-auto">
          <div className="flex gap-2 pb-1" style={{ minWidth: "max-content" }}>
            {categorias.map(cat => (
              <button key={cat} onClick={() => setCategoria(cat)}
                className="rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition-all"
                style={{
                  backgroundColor: categoria === cat ? "#C0306A" : "#250C30",
                  color: categoria === cat ? "#fff" : "#c9a8e0",
                  border: "1px solid " + (categoria === cat ? "#C0306A" : "#4A1A5C"),
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de anúncios */}
      <section className="px-4 pb-16 pt-2">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-semibold text-white">
            Anuncios em Destaque
            <span className="ml-2 font-normal" style={{ color: "#c9a8e0" }}>({filtrados.length})</span>
          </p>

          {loading && (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full" style={{ border: "3px solid #4A1A5C", borderTopColor: "#C0306A" }} />
            </div>
          )}

          {!loading && filtrados.length === 0 && (
            <p className="py-20 text-center text-sm" style={{ color: "#c9a8e0" }}>Nenhum anuncio encontrado.</p>
          )}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtrados.map(ad => (
              <Link key={ad.id}
                href={"/acompanhantes/" + (ad.cidade?.toLowerCase().replace(/\s+/g, '-') || 'brasil') + "/" + ad.slug}
                className="group flex flex-col overflow-hidden rounded-xl transition-transform active:scale-95"
                style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>

                {/* Foto */}
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "125%", backgroundColor: "#3a1550" }}>
                  {ad.midias?.[0]?.url ? (
                    <img src={ad.midias[0].url} alt={ad.titulo}
                      className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl opacity-20">👤</span>
                    </div>
                  )}
                  {(ad.plano === "ULTRATOP" || ad.plano === "SUPERTOP") && (
                    <span className="absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{ backgroundColor: "#B8960C", color: "#fff" }}>
                      {ad.plano === "ULTRATOP" ? "TOP" : "VIP"}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-2.5 flex flex-col gap-0.5">
                  <p className="text-xs font-bold text-white leading-tight line-clamp-1">{ad.titulo}</p>
                  <p className="text-xs" style={{ color: "#c9a8e0" }}>{ad.cidade} - {ad.estado}</p>
                  {ad.cache && (
                    <p className="text-xs font-bold mt-0.5" style={{ color: "#C0306A" }}>
                      R$ {Number(ad.cache).toFixed(0)}/h
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}