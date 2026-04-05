export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const { PrismaPg } = await import('@prisma/adapter-pg')

    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    const prisma = new PrismaClient({ adapter })

    const anuncios = await prisma.anuncios.findMany({
      where: { status: 'ATIVO' },
      include: {
        midias: {
          where: { isCapa: true },
          take: 1
        }
      },
      orderBy: { criadoEm: 'desc' },
      take: 12
    })

    await prisma.$disconnect()

    return Response.json({ success: true, data: anuncios })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}