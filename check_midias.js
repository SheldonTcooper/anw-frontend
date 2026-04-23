const { PrismaClient } = require('./node_modules/.prisma/client')
const prisma = new PrismaClient()
async function main() {
  const midias = await prisma.midias.findMany({
    select: { id: true, url: true, isCapa: true, aprovada: true, anuncioId: true }
  })
  console.log(JSON.stringify(midias, null, 2))
}
main().then(() => prisma.$disconnect()).catch(console.error)
