export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const { PrismaPg } = await import('@prisma/adapter-pg')

    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    const prisma = new PrismaClient({ adapter })

    await prisma.$connect()
    await prisma.$disconnect()

    return Response.json({
      success: true,
      message: "Conexão com banco OK!",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}