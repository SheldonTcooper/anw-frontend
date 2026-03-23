import { getCategories, getAds } from '@/services/api'
'use client'

export default function Home() {
  // Dados estáticos (igual ao que estava funcionando)
  const categories = [
    { id: 1, name: "Loiras", icon: "👱‍♀️", color: "#FFD700", _count: { ads: 2 } },
    { id: 2, name: "Morenas", icon: "👩🏻", color: "#8B4513", _count: { ads: 1 } },
    { id: 3, name: "Ruivas", icon: "👩‍🦰", color: "#FF4500", _count: { ads: 1 } },
    { id: 4, name: "Asiáticas", icon: "👩", color: "#FF69B4", _count: { ads: 0 } },
    { id: 5, name: "Negras", icon: "👩🏿", color: "#654321", _count: { ads: 0 } },
    { id: 6, name: "Maduras", icon: "👩‍💼", color: "#800080", _count: { ads: 0 } },
    { id: 7, name: "Novinhas", icon: "👧", color: "#FF1493", _count: { ads: 0 } },
    { id: 8, name: "VIP", icon: "⭐", color: "#FFD700", _count: { ads: 0 } }
  ]

  const ads = [
    {
      id: 1,
      title: "Sophia - Loira Sensual 25 anos",
      description: "Atendimento personalizado, ambiente discreto e climatizado",
      age: 25,
      price: 200,
      location: "Centro, São Paulo",
      images: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"],
      category: { name: "Loiras" },
      isVip: true,
      views: 1245,
      createdAt: new Date()
    },
    {
      id: 2,
      title: "Isabella - Morena Gostosa",
      description: "Carinhosa e educada, atendo com todo prazer",
      age: 28,
      price: 150,
      location: "Bela Vista, SP",
      images: ["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400"],
      category: { name: "Morenas" },
      isVip: false,
      views: 892,
      createdAt: new Date()
    },
    {
      id: 3,
      title: "Amanda - Ruiva Safada",
      description: "Sem frescura, faço de tudo. Oral guloso incluso",
      age: 22,
      price: 180,
      location: "Vila Madalena, SP",
      images: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"],
      category: { name: "Ruivas" },
      isVip: false,
      views: 654,
      createdAt: new Date()
    },
    {
      id: 4,
      title: "Camila - Loira Experiente",
      description: "Massagem relaxante e final feliz garantido",
      age: 35,
      price: 220,
      location: "Jardins, SP",
      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"],
      category: { name: "Loiras" },
      isVip: true,
      views: 1567,
      createdAt: new Date()
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-200/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Acompanhantes da Web
                </h1>
                <p className="text-sm text-gray-600">Encontre a companhia perfeita</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg">
              Anunciar
            </button>
          </div>
        </div>
      </header>

      {/* Categorias */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categorias ({categories.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              style={{ borderTop: `4px solid ${category.color}` }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category._count?.ads || 0} anúncios
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anúncios */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Anúncios Recentes
            <span className="text-lg text-gray-500 font-normal ml-2">
              ({ads.length} anúncios)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Imagem */}
              <div className="relative h-48 bg-gradient-to-br from-pink-200 to-purple-200">
                <img 
                  src={ad.images[0]} 
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {ad.isVip && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ VIP
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                  {ad.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm font-medium">
                    {ad.category.name}
                  </span>
                  <span className="text-gray-600 text-sm">{ad.age} anos</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {ad.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">📍 {ad.location}</p>
                    <p className="text-pink-600 font-bold text-lg">
                      R$ {ad.price}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors">
                      📱
                    </button>
                    <button className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-colors">
                      💬
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                  <span>👀 {ad.views} visualizações</span>
                  <span>Hoje</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}