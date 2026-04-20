export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { prisma } = await import('../../../lib/prisma')
    const anuncios = await prisma.anuncios.findMany({
      where: { status: 'ATIVO' },
      include: { midias: { where: { isCapa: true }, take: 1 } },
      orderBy: { criadoEm: 'desc' },
      take: 12
    })
    return Response.json({ success: true, data: anuncios })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}