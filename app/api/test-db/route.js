export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    
    await prisma.$connect()
    
    const result = await Response.json({
      success: true,
      message: "Conexão com banco OK!",
      timestamp: new Date().toISOString()
    })
    
    await prisma.$disconnect()
    return result
    
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}