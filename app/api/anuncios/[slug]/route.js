export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  try {
    const { prisma } = await import('../../../../lib/prisma')
    const anuncio = await prisma.anuncios.findUnique({
      where: { slug: params.slug },
      include: { midias: { orderBy: { ordem: 'asc' } } }
    })
    if (!anuncio) {
      return Response.json({ success: false, error: 'Anuncio nao encontrado' }, { status: 404 })
    }
    return Response.json({ success: true, data: anuncio })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}