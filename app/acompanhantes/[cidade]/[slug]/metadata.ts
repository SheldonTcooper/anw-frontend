import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { cidade: string; slug: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`https://www.acompanhantesnaweb.com.br/api/anuncios/${params.slug}`, { cache: 'no-store' })
    const data = await res.json()
    
    if (!data.success || !data.data) {
      return { title: 'Anuncio nao encontrado' }
    }

    const anuncio = data.data
    const foto = anuncio.midias?.find((m: any) => m.isCapa)?.url || '/og-image.jpg'
    const titulo = `${anuncio.titulo} - ${anuncio.cidade}/${anuncio.estado}`
    const descricao = anuncio.descricao || `Acompanhante em ${anuncio.cidade}, ${anuncio.estado}. R$ ${anuncio.cache}/hora.`

    return {
      title: titulo,
      description: descricao,
      openGraph: {
        title: titulo,
        description: descricao,
        images: [{ url: foto, width: 800, height: 600, alt: anuncio.titulo }],
        type: 'profile',
        locale: 'pt_BR',
        siteName: 'AcompanhantesNaWeb',
      },
      twitter: {
        card: 'summary_large_image',
        title: titulo,
        description: descricao,
        images: [foto],
      },
    }
  } catch {
    return { title: 'AcompanhantesNaWeb' }
  }
}
