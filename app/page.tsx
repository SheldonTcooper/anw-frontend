"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const categorias = ["Todas", "Loiras", "Morenas", "Ruivas", "Acompanhantes de Luxo", "Universitarias"];

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
    const termoBusca = busca.toLowerCase();
    const matchBusca = !busca ||
      ad.titulo?.toLowerCase().includes(termoBusca) ||
      ad.cidade?.toLowerCase().includes(termoBusca) ||
      ad.estado?.toLowerCase().includes(termoBusca);
    return matchBusca;
  });

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#1A0A1E" }}>

      {/* Hero */}
      <section className="px-4 py-12 text-center" style={{ background: "linear-gradient(180deg, #250C30 0%, #1A0A1E 100%)" }}>
        <h1 className="text-4xl font-bold text-white mb-3 sm:text-5xl">
          Acompanhantes<span style={{ color: "#C0306A" }}>NaWeb</span>
        </h1>
        <p className="mb-8 text-lg" style={{ color: "#c9a8e0" }}>
          As mais belas e sofisticadas acompanhantes do Brasil
        </p>
        <div className="mx-auto max-w-lg">
          <input type="text" placeholder="Buscar por nome, cidade ou servico..."
            value={busca} onChange={e => setBusca(e.target.value)}
            className="w-full rounded-xl px-5 py-3 text-sm text-white outline-none"
            style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }} />
        </div>
      </section>

      {/* Categorias */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-6xl flex flex-wrap gap-2 justify-center">
          {categorias.map(cat => (
            <button key={cat} onClick={() => setCategoria(cat)}
              className="rounded-full px-4 py-1.5 text-sm font-semibold transition-all"
              style={{
                backgroundColor: categoria === cat ? "#C0306A" : "#250C30",
                color: categoria === cat ? "#fff" : "#c9a8e0",
                border: "1px solid " + (categoria === cat ? "#C0306A" : "#4A1A5C"),
              }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Anúncios */}
      <section className="px-4 py-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-white mb-6">
            Anuncios em Destaque
            <span className="ml-2 text-sm font-normal" style={{ color: "#c9a8e0" }}>
              ({filtrados.length} anuncios)
            </span>
          </h2>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full" style={{ border: "3px solid #4A1A5C", borderTopColor: "#C0306A" }} />
            </div>
          )}

          {!loading && filtrados.length === 0 && (
            <p className="py-20 text-center" style={{ color: "#c9a8e0" }}>Nenhum anuncio encontrado.</p>
          )}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtrados.map(ad => (
              <Link key={ad.id} href={"/acompanhantes/" + ad.cidade?.toLowerCase().replace(/\s+/g, '-') + "/" + ad.slug}
                className="group flex flex-col rounded-xl overflow-hidden transition-transform hover:scale-105"
                style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>

                {/* Foto */}
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "133%", backgroundColor: "#3a1550" }}>
                  {ad.midias?.[0]?.url ? (
                    <img src={ad.midias[0].url} alt={ad.titulo}
                      className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl opacity-30">👤</span>
                    </div>
                  )}
                  {/* Badge plano */}
                  {(ad.plano === "ULTRATOP" || ad.plano === "SUPERTOP") && (
                    <span className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-bold uppercase"
                      style={{ backgroundColor: "#B8960C", color: "#fff" }}>
                      {ad.plano === "ULTRATOP" ? "Ultra Top" : "Super Top"}
                    </span>
                  )}
                  {ad.verificada && (
                    <span className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{ backgroundColor: "#14532d", color: "#4ade80" }}>
                      ✓
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">{ad.titulo}</h3>
                  <p className="text-xs" style={{ color: "#c9a8e0" }}>{ad.cidade} - {ad.estado}</p>
                  {ad.cache && (
                    <p className="text-sm font-bold mt-1" style={{ color: "#C0306A" }}>
                      R$ {Number(ad.cache).toFixed(0)}/hora
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