'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const categorias = ['Todas', 'Loiras', 'Morenas', 'Ruivas', 'Acompanhantes de Luxo', 'Universitárias']

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [anuncios, setAnuncios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/anuncios')
      .then(res => res.json())
      .then(data => {
        if (data.success) setAnuncios(data.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtrados = anuncios.filter(ad =>
    ad.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.cidade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      <div className="relative bg-black/50">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            AcompanhantesNaWeb
          </h1>
          <p className="text-xl text-pink-200 mb-8">
            As mais belas e sofisticadas acompanhantes do Brasil
          </p>
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar por nome, cidade ou serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-3 rounded-r-lg hover:bg-pink-700 transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Categorias</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categorias.map((cat) => (
            <button
              key={cat}
              className="bg-pink-600/20 text-white px-6 py-3 rounded-full hover:bg-pink-600/40 transition-colors border border-pink-400/30"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Anúncios em Destaque
        </h2>

        {loading && (
          <p className="text-center text-pink-200">Carregando anúncios...</p>
        )}

        {!loading && filtrados.length === 0 && (
          <p className="text-center text-pink-200">Nenhum anúncio encontrado.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtrados.map((ad) => (
            <div
              key={ad.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-pink-400/20"
            >
              <div className="h-64 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center overflow-hidden">
                {ad.midias?.[0]?.url ? (
                  <img
                    src={ad.midias[0].url}
                    alt={ad.titulo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-6xl opacity-50">👤</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{ad.titulo}</h3>
                <p className="text-pink-200 mb-2">{ad.cidade} - {ad.estado}</p>
                {ad.cache && (
                  <p className="text-2xl font-bold text-pink-400 mb-4">
                    R$ {Number(ad.cache).toFixed(0)}/hora
                  </p>
                )}
                <Link
                  href={`/acompanhantes/${ad.cidade?.toLowerCase().replace(/\s+/g, '-')}/${ad.slug}`}
                  className="block w-full bg-pink-600 text-white text-center py-2 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}