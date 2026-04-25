import { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: { cidade: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cidadeFormatada = params.cidade
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return {
    title: `Acompanhantes em ${cidadeFormatada} | AcompanhantesNaWeb`,
    description: `Encontre acompanhantes em ${cidadeFormatada}. As mais belas e sofisticadas acompanhantes disponíveis agora.`,
    openGraph: {
      title: `Acompanhantes em ${cidadeFormatada}`,
      description: `Encontre acompanhantes em ${cidadeFormatada} no AcompanhantesNaWeb.`,
      images: [{ url: '/og-image.jpg' }],
    },
  }
}

async function getAnunciosPorCidade(cidade: string) {
  try {
    const res = await fetch(
      `https://www.acompanhantesnaweb.com.br/api/anuncios?cidade=${decodeURIComponent(cidade)}&limit=50`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    return data.success ? data.data : []
  } catch {
    return []
  }
}

export default async function PaginaCidade({ params }: Props) {
  const cidadeFormatada = params.cidade
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const anuncios = await getAnunciosPorCidade(cidadeFormatada)

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <nav className="text-sm mb-3" style={{ color: "#c9a8e0" }}>
            <a href="/" className="hover:underline">Inicio</a>
            <span className="mx-2">/</span>
            <span className="text-white">{cidadeFormatada}</span>
          </nav>
          <h1 className="text-3xl font-bold text-white mb-2">
            Acompanhantes em <span style={{ color: "#C0306A" }}>{cidadeFormatada}</span>
          </h1>
          <p className="text-sm" style={{ color: "#c9a8e0" }}>
            {anuncios.length} {anuncios.length === 1 ? 'anunciante disponível' : 'anunciantes disponíveis'}
          </p>
        </div>

        {anuncios.length === 0 ? (
          <div className="text-center py-20 rounded-xl" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
            <p className="text-white font-semibold mb-2">Nenhum anuncio encontrado em {cidadeFormatada}</p>
            <p className="text-sm mb-6" style={{ color: "#c9a8e0" }}>Seja a primeira a anunciar nessa cidade!</p>
            <a href="/anunciar" className="rounded-lg px-6 py-3 font-bold text-white hover:opacity-90"
              style={{ backgroundColor: "#C0306A" }}>
              Anunciar agora
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {anuncios.map((ad: any) => (
              <Link key={ad.id}
                href={`/acompanhantes/${params.cidade}/${ad.slug}`}
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
                  <h2 className="text-sm font-bold text-white leading-tight line-clamp-1">{ad.titulo}</h2>
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
        )}

        <div className="mt-12 text-center">
          <a href="/" className="text-sm hover:underline" style={{ color: "#c9a8e0" }}>
            ← Ver acompanhantes de outras cidades
          </a>
        </div>

      </div>
    </main>
  )
}
