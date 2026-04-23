const { PrismaClient } = require('./node_modules/.prisma/client')
const prisma = new PrismaClient()
async function main() {
  const result = await prisma.usuarios.update({
    where: { email: 'romulo@tauritecnologia.com.br' },
    data: { tipo: 'ADMIN' }
  })
  console.log('Atualizado:', result.email, result.tipo)
}
main().then(() => prisma.$disconnect()).catch(console.error)
