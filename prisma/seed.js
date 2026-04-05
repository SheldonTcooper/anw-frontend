const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

require('dotenv/config')

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Criar usuário de teste
  const usuario = await prisma.usuarios.upsert({
    where: { email: 'teste@anw.com.br' },
    update: {},
    create: {
      id: 'usr_teste_001',
      email: 'teste@anw.com.br',
      senhaHash: '123456',
      nome: 'Usuária Teste',
      tipo: 'ANUNCIANTE',
      atualizadoEm: new Date(),
    }
  })

  // Criar anúncios de teste
  const anuncios = [
    {
      id: 'anuncio_001',
      usuarioId: usuario.id,
      titulo: 'Valentina - Acompanhante de Luxo',
      slug: 'valentina-acompanhante-de-luxo',
      descricao: 'Olá! Sou a Valentina, discreta e sofisticada.',
      cidade: 'Fortaleza',
      estado: 'CE',
      cache: 350,
      whatsapp: '85999990001',
      plano: 'SUPER_DESTAQUE',
      status: 'ATIVO',
      verificada: true,
      atualizadoEm: new Date(),
    },
    {
      id: 'anuncio_002',
      usuarioId: usuario.id,
      titulo: 'Amanda - Universitária',
      slug: 'amanda-universitaria',
      descricao: 'Amanda, universitária, simpática e carinhosa.',
      cidade: 'São Paulo',
      estado: 'SP',
      cache: 200,
      whatsapp: '11999990002',
      plano: 'PAGO',
      status: 'ATIVO',
      verificada: false,
      atualizadoEm: new Date(),
    },
    {
      id: 'anuncio_003',
      usuarioId: usuario.id,
      titulo: 'Carla - Morena Linda',
      slug: 'carla-morena-linda',
      descricao: 'Carla, morena, alegre e muito animada.',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cache: 250,
      whatsapp: '21999990003',
      plano: 'PAGO',
      status: 'ATIVO',
      verificada: true,
      atualizadoEm: new Date(),
    },
  ]

  for (const anuncio of anuncios) {
    await prisma.anuncios.upsert({
      where: { slug: anuncio.slug },
      update: {},
      create: anuncio,
    })
    console.log(`✅ Criado: ${anuncio.titulo}`)
  }

  console.log('🎉 Seed concluído!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())