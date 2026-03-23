const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://seudominio.com' 
  : 'http://localhost:3000'

// Buscar categorias
export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Erro ao buscar categorias')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro:', error)
    return []
  }
}

// Buscar anúncios
export async function getAds(params = {}) {
  try {
    const searchParams = new URLSearchParams()
    
    if (params.category) searchParams.set('category', params.category)
    if (params.location) searchParams.set('location', params.location)
    if (params.page) searchParams.set('page', params.page.toString())
    if (params.limit) searchParams.set('limit', params.limit.toString())
    
    const response = await fetch(
      `${API_BASE_URL}/api/ads?${searchParams.toString()}`,
      { cache: 'no-store' }
    )
    
    if (!response.ok) {
      throw new Error('Erro ao buscar anúncios')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro:', error)
    return { ads: [], pagination: { page: 1, total: 0, pages: 0 } }
  }
}

// Criar anúncio
export async function createAd(adData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adData),
    })
    
    if (!response.ok) {
      throw new Error('Erro ao criar anúncio')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro:', error)
    throw error
  }
}