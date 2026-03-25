import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Teste simples de conexão
    await prisma.$connect()
    
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
  } finally {
    await prisma.$disconnect()
  }
}
