export const dynamic = 'force-dynamic'

async function getPrisma() {
  const { PrismaClient } = await import('@prisma/client')
  const { PrismaPg } = await import('@prisma/adapter-pg')
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

export async function GET() {
  try {
    const prisma = await getPrisma()
    const anuncios = await prisma.anuncios.findMany({
      orderBy: { criadoEm: 'desc' },
    })
    await prisma.$disconnect()
    return Response.json({ success: true, data: anuncios })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json()
    const prisma = await getPrisma()
    const anuncio = await prisma.anuncios.update({
      where: { id },
      data: { status, atualizadoEm: new Date() }
    })
    await prisma.$disconnect()
    return Response.json({ success: true, data: anuncio })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}