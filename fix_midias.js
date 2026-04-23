const { PrismaClient } = require('./node_modules/.prisma/client')
const prisma = new PrismaClient()
async function main() {
  // Aprova todas as midias
  const aprovadas = await prisma.midias.updateMany({
    data: { aprovada: true }
  })
  console.log('Midias aprovadas:', aprovadas.count)

  // Define a primeira midia de cada anuncio como capa
  const midias = await prisma.midias.findMany({
    orderBy: { ordem: 'asc' }
  })
  
  const porAnuncio = {}
  for (const m of midias) {
    if (!porAnuncio[m.anuncioId]) {
      porAnuncio[m.anuncioId] = m.id
    }
  }

  for (const [anuncioId, midiaId] of Object.entries(porAnuncio)) {
    await prisma.midias.update({
      where: { id: midiaId },
      data: { isCapa: true }
    })
  }
  console.log('Capas definidas:', Object.keys(porAnuncio).length)
}
main().then(() => prisma.$disconnect()).catch(console.error)
