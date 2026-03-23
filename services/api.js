// services/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://acompanhantesdaweb.com.br' // Troque para seu domínio real de produção
  : 'http://localhost:3000'

// Buscar categorias
export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      cache: 'no-store' // Para garantir que os dados são sempre frescos
    })
    
    if (!response.ok) {
      // Tenta ler o erro do servidor, se disponível
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Erro ao buscar categorias: ${response.status}`);
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro na API de categorias:', error)
    return [] // Retorna um array vazio em caso de erro
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
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Erro ao buscar anúncios: ${response.status}`);
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro na API de anúncios:', error)
    return { ads: [], pagination: { page: 1, total: 0, pages: 0 } } // Retorna estrutura padrão em caso de erro
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
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Erro ao criar anúncio: ${response.status}`);
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro ao criar anúncio:', error)
    throw error // Lança o erro para ser tratado onde a função for chamada
  }
}