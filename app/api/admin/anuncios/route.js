export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { prisma } = await import('../../../../lib/prisma')
    const anuncios = await prisma.anuncios.findMany({ orderBy: { criadoEm: 'desc' } })
    return Response.json({ success: true, data: anuncios })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const { prisma } = await import('../../../../lib/prisma')
    const { id, status } = await request.json()
    const anuncio = await prisma.anuncios.update({
      where: { id },
      data: { status, atualizadoEm: new Date() }
    })
    return Response.json({ success: true, data: anuncio })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}