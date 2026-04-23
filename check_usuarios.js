const { PrismaClient } = require('./node_modules/.prisma/client')
const prisma = new PrismaClient()
async function main() {
  const usuarios = await prisma.usuarios.findMany({
    select: { id: true, email: true, nome: true, tipo: true }
  })
  console.log(JSON.stringify(usuarios, null, 2))
}
main().then(() => prisma.$disconnect()).catch(console.error)
