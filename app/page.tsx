"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const categorias = ["Todas", "Mulheres", "Trans", "Homens", "Gays", "Casais", "Loiras", "Morenas", "Ruivas", "Luxo", "Universitarias"];

const CATEGORIA_TAG: Record<string, string> = {
  "Mulheres":      "mulher",
  "Trans":         "trans",
  "Homens":        "homem",
  "Gays":          "gay",
  "Casais":        "casal",
  "Loiras":        "loira",
  "Morenas":       "morena",
  "Ruivas":        "ruiva",
  "Luxo":          "luxo",
  "Universitarias":"universitaria",
}

const ESTADOS_BR = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
  "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC",
  "SP","SE","TO"
]

export default function Home() {
  const [anuncios, setAnuncios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState("")
  const [categoria, setCategoria] = useState("Todas")
  const [estado, setEstado] = useState("")
  const [cidade, setCidade] = useState("")

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (busca)  params.set("q", busca)
    if (estado) params.set("estado", estado)
    if (cidade) params.set("cidade", cidade)

    fetch("/api/anuncios?" + params.toString())
      .then(res => res.json())
      .then(data => { if (data.success) setAnuncios(data.data) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [busca, estado, cidade])

  const filtrados = anuncios.filter(ad => {
    if (categoria === "Todas") return true
    const tag = CATEGORIA_TAG[categoria]
    if (!tag) return true
    return ad.anuncios_tags?.some((t: any) =>
      t.tags?.slug?.includes(tag) || t.tags?.nome?.toLowerCase().includes(tag)
    ) || ad.titulo?.toLowerCase().includes(tag)
  })

  const limparFiltros = () => {
    setBusca("")
    setEstado("")
    setCidade("")
    setCategoria("Todas")
  }

  const temFiltro = busca || estado || cidade || categoria !== "Todas"

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

        {/* Busca + Filtros */}
        <div className="mx-auto max-w-2xl flex flex-col gap-3">
          <input type="text" placeholder="Buscar por nome, cidade ou servico..."
            value={busca} onChange={e => setBusca(e.target.value)}
            className="w-full rounded-xl px-5 py-3 text-sm text-white outline-none"
            style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }} />

          <div className="flex gap-3">
            <select value={estado} onChange={e => { setEstado(e.target.value); setCidade("") }}
              className="flex-1 rounded-xl px-4 py-3 text-sm text-white outline-none"
              style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
              <option value="">Todos os estados</option>
              {ESTADOS_BR.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>

            <input type="text" placeholder="Filtrar por cidade..."
              value={cidade} onChange={e => setCidade(e.target.value)}
              className="flex-1 rounded-xl px-4 py-3 text-sm text-white outline-none"
              style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }} />
          </div>

          {temFiltro && (
            <button onClick={limparFiltros}
              className="text-sm hover:underline"
              style={{ color: "#c9a8e0" }}>
              Limpar filtros
            </button>
          )}
        </div>
      </section>

      {/* Categorias */}
      <section className="px-4 py-4">
        <div className="mx-auto max-w-6xl flex flex-wrap gap-2 justify-center">
          {categorias.map(cat => (
            <button key={cat} onClick={() => setCategoria(cat)}
              className="rounded-full px-4 py-1.5 text-sm font-semibold transition-all"
              style={{
                backgroundColor: categoria === cat ? "#C0306A" : "#250C30",
                color:           categoria === cat ? "#fff" : "#c9a8e0",
                border: "1px solid " + (categoria === cat ? "#C0306A" : "#4A1A5C"),
              }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Anuncios */}
      <section className="px-4 py-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {estado || cidade ? "Resultados" : "Anuncios em Destaque"}
              <span className="ml-2 text-sm font-normal" style={{ color: "#c9a8e0" }}>
                ({filtrados.length} anuncios)
              </span>
            </h2>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full"
                style={{ border: "3px solid #4A1A5C", borderTopColor: "#C0306A" }} />
            </div>
          )}

          {!loading && filtrados.length === 0 && (
            <div className="py-20 text-center">
              <p style={{ color: "#c9a8e0" }}>Nenhum anuncio encontrado.</p>
              {temFiltro && (
                <button onClick={limparFiltros} className="mt-4 text-sm hover:underline" style={{ color: "#C0306A" }}>
                  Limpar filtros
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtrados.map(ad => (
              <Link key={ad.id}
                href={"/acompanhantes/" + ad.cidade?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-") + "/" + ad.slug}
                className="group flex flex-col rounded-xl overflow-hidden transition-transform hover:scale-105"
                style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>

                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "133%", backgroundColor: "#3a1550" }}>
                  {ad.midias?.[0]?.url ? (
                    <img src={ad.midias[0].url} alt={ad.titulo}
                      className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl opacity-30">👤</span>
                    </div>
                  )}
                  {(ad.plano === "ULTRATOP" || ad.plano === "SUPERTOP") && (
                    <span className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-bold uppercase"
                      style={{ backgroundColor: "#B8960C", color: "#fff" }}>
                      {ad.plano === "ULTRATOP" ? "Ultra Top" : "Super Top"}
                    </span>
                  )}
                  {ad.verificada && (
                    <span className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{ backgroundColor: "#14532d", color: "#4ade80" }}>✓</span>
                  )}
                  {ad.disponivelAgora && (
                    <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold"
                      style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#4ade80" }}>
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping inline-block" />
                      Disponivel
                    </span>
                  )}
                </div>

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
  )
}


