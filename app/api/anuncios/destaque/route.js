export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { prisma } = await import('../../../../lib/prisma')

    const anuncio = await prisma.anuncios.findFirst({
      where: {
        status: 'ATIVO',
        plano: { in: ['ULTRATOP', 'SUPERTOP'] }
      },
      include: { midias: { where: { isCapa: true }, take: 1 } },
      orderBy: { criadoEm: 'desc' }
    })

    return Response.json({ success: true, data: anuncio })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}