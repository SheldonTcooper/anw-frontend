const { PrismaClient } = require('./node_modules/.prisma/client')
const prisma = new PrismaClient()
async function main() {
  const result = await prisma.anuncios.updateMany({
    where: { status: 'EM_ANALISE' },
    data:  { status: 'ATIVO' }
  })
  console.log('Atualizados:', result.count)
}
main().then(() => prisma.$disconnect()).catch(console.error)
