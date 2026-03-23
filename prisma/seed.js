const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Limpar dados existentes
  await prisma.ad.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Criar categorias
  const categorias = [
    { name: 'Loiras', slug: 'loiras', color: '#FFD700', icon: '👱‍♀️' },
    { name: 'Morenas', slug: 'morenas', color: '#8B4513', icon: '👩🏽' },
    { name: 'Ruivas', slug: 'ruivas', color: '#FF6347', icon: '👩🏻‍🦰' },
    { name: 'Asiáticas', slug: 'asiaticas', color: '#FF69B4', icon: '👩🏻' },
    { name: 'Negras', slug: 'negras', color: '#4B0082', icon: '👩🏿' },
    { name: 'Maduras', slug: 'maduras', color: '#800080', icon: '👩🏼' },
    { name: 'Novinhas', slug: 'novinhas', color: '#FF1493', icon: '👧🏻' },
    { name: 'Trans', slug: 'trans', color: '#FF69B4', icon: '🏳️‍⚧️' }
  ]

  console.log('📂 Criando categorias...')
  for (const cat of categorias) {
    await prisma.category.create({
      data: cat
    })
  }

  // Criar usuário admin
  console.log('👤 Criando usuário admin...')
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@acompanhantesdaweb.com.br',
      name: 'Administrador',
      role: 'ADMIN',
      phone: '11999999999',
      whatsapp: '11999999999'
    }
  })

  // Buscar categorias criadas
  const loirasCategory = await prisma.category.findFirst({
    where: { slug: 'loiras' }
  })

  const morenasCategory = await prisma.category.findFirst({
    where: { slug: 'morenas' }
  })

  const ruivasCategory = await prisma.category.findFirst({
    where: { slug: 'ruivas' }
  })

  console.log('📝 Criando anúncios de exemplo...')
  
  // Anúncios de exemplo
  const anuncios = [
    {
      title: 'Sophia - Loira Sensual 25 anos',
      description: 'Atendimento personalizado com muito carinho e discrição. Apartamento próprio com ar condicionado.',
      age: 25,
      price: 200.0,
      location: 'São Paulo - Jardins',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=300&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face'
      ]),
      phone: '11987654321',
      whatsapp: '11987654321',
      userId: adminUser.id,
      categoryId: loirasCategory.id,
      isVip: true,
      views: 156
    },
    {
      title: 'Amanda - Loira Universitária 22 anos',
      description: 'Estudante universitária, carinhosa e educada. Primeiro atendimento com desconto especial.',
      age: 22,
      price: 150.0,
      location: 'São Paulo - Vila Madalena',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face'
      ]),
      phone: '11987654322',
      whatsapp: '11987654322',
      userId: adminUser.id,
      categoryId: loirasCategory.id,
      isVip: false,
      views: 89
    },
    {
      title: 'Gabriela - Morena Fatal 28 anos',
      description: 'Atendimento completo, massagem relaxante incluída. Local discreto e higiênico.',
      age: 28,
      price: 180.0,
      location: 'Rio de Janeiro - Copacabana',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop&crop=face'
      ]),
      phone: '21987654321',
      whatsapp: '21987654321',
      userId: adminUser.id,
      categoryId: morenasCategory.id,
      isVip: true,
      views: 203
    },
    {
      title: 'Isabela - Ruiva Sedutora 26 anos',
      description: 'Ruiva natural, pele sedosa e muito carinhosa. Atendimento diferenciado.',
      age: 26,
      price: 220.0,
      location: 'Belo Horizonte - Savassi',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face'
      ]),
      phone: '31987654321',
      whatsapp: '31987654321',
      userId: adminUser.id,
      categoryId: ruivasCategory.id,
      isVip: false,
      views: 67
    }
  ]

  for (const anuncio of anuncios) {
    await prisma.ad.create({ data: anuncio })
  }

  console.log('✅ Seed completed!')
  console.log(`📊 Criadas ${categorias.length} categorias`)
  console.log(`👤 Criado 1 usuário admin`)
  console.log(`📝 Criados ${anuncios.length} anúncios de exemplo`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro no seed:', e)
    await prisma.$disconnect()
    process.exit(1)