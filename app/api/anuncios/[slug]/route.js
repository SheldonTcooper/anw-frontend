export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const { PrismaPg } = await import('@prisma/adapter-pg')

    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    const prisma = new PrismaClient({ adapter })

    const anuncio = await prisma.anuncios.findUnique({
      where: { slug: params.slug },
      include: {
        midias: { orderBy: { ordem: 'asc' } }
      }
    })

    await prisma.$disconnect()

    if (!anuncio) {
      return Response.json({ success: false, error: 'Anúncio não encontrado' }, { status: 404 })
    }

    return Response.json({ success: true, data: anuncio })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}