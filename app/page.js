'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  // Dados mockados para demonstração
  const mockCategories = [
    'Todas',
    'Loiras',
    'Morenas',
    'Ruivas',
    'Acompanhantes de Luxo',
    'Universitárias'
  ]

  const mockAds = [
    {
      id: 1,
      title: 'Bella - Acompanhante de Luxo',
      category: 'Acompanhantes de Luxo',
      location: 'Fortaleza - CE',
      price: 'R$ 200/hora',
      image: '/placeholder-woman.jpg'
    },
    {
      id: 2,
      title: 'Amanda - Universitária',
      category: 'Universitárias',
      location: 'Fortaleza - CE',
      price: 'R$ 150/hora',
      image: '/placeholder-woman.jpg'
    },
    {
      id: 3,
      title: 'Carla - Morena Linda',
      category: 'Morenas',
      location: 'Fortaleza - CE',
      price: 'R$ 180/hora',
      image: '/placeholder-woman.jpg'
    }
  ]

  const [filteredAds, setFilteredAds] = useState(mockAds)

  const handleSearch = (e) => {
    e.preventDefault()
    const filtered = mockAds.filter(ad =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredAds(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      {/* Hero Section */}
      <div className="relative bg-black/50">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            AcompanhantesNaWeb
          </h1>
          <p className="text-xl text-pink-200 mb-8">
            As mais belas e sofisticadas acompanhantes do Brasil
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar por nome, categoria ou cidade..."
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

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Categorias
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {mockCategories.map((category) => (
            <button
              key={category}
              className="bg-pink-600/20 text-white px-6 py-3 rounded-full hover:bg-pink-600/40 transition-colors border border-pink-400/30"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Ads Grid */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Anúncios em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-pink-400/20"
            >
              <div className="h-64 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center">
                <span className="text-white text-6xl opacity-50">👤</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{ad.title}</h3>
                <p className="text-pink-200 mb-2">{ad.category}</p>
                <p className="text-gray-300 mb-2">{ad.location}</p>
                <p className="text-2xl font-bold text-pink-400 mb-4">{ad.price}</p>
                <Link
                  href={`/anuncio/${ad.id}`}
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
