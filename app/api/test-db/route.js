export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { prisma } = await import('../../../lib/prisma')
    await prisma.$connect()
    await prisma.$disconnect()
    return Response.json({ success: true, message: "Conexao com banco OK!", timestamp: new Date().toISOString() })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}