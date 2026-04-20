const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Usuario base
  const usuario = await prisma.usuarios.upsert({
    where: { email: 'admin@anw.temp.br' },
    update: {},
    create: {
      id: 'usr_base_001',
      email: 'admin@anw.temp.br',
      senhaHash: 'temp',
      nome: 'Admin Base',
      tipo: 'ANUNCIANTE',
      atualizadoEm: new Date(),
    }
  })

  const anuncios = [
    {
      id: 'anuncio_top_001',
      titulo: 'Valentina - Acompanhante de Luxo',
      slug: 'valentina-acompanhante-de-luxo',
      descricao: 'Ola! Sou a Valentina, discreta e sofisticada. Atendo com exclusividade.',
      cidade: 'Fortaleza', estado: 'CE', bairro: 'Meireles',
      cache: 350, whatsapp: '85999990001',
      plano: 'ULTRATOP', status: 'ATIVO', verificada: true,
    },
    {
      id: 'anuncio_top_002',
      titulo: 'Isabela - Super Destaque',
      slug: 'isabela-super-destaque',
      descricao: 'Isabela, loira, 25 anos, atendo com muito carinho e dedicacao.',
      cidade: 'Sao Paulo', estado: 'SP', bairro: 'Moema',
      cache: 400, whatsapp: '11999990002',
      plano: 'SUPERTOP', status: 'ATIVO', verificada: true,
    },
    {
      id: 'anuncio_003',
      titulo: 'Amanda - Universitaria',
      slug: 'amanda-universitaria',
      descricao: 'Amanda, universitaria, simpatica e carinhosa.',
      cidade: 'Sao Paulo', estado: 'SP', bairro: 'Pinheiros',
      cache: 200, whatsapp: '11999990003',
      plano: 'PAGO', status: 'ATIVO', verificada: false,
    },
    {
      id: 'anuncio_004',
      titulo: 'Carla - Morena Linda',
      slug: 'carla-morena-linda',
      descricao: 'Carla, morena, alegre e muito animada.',
      cidade: 'Rio de Janeiro', estado: 'RJ', bairro: 'Ipanema',
      cache: 250, whatsapp: '21999990004',
      plano: 'PAGO', status: 'ATIVO', verificada: true,
    },
    {
      id: 'anuncio_005',
      titulo: 'Fernanda - Ruiva Gatinha',
      slug: 'fernanda-ruiva-gatinha',
      descricao: 'Fernanda, ruiva natural, muito animada e divertida.',
      cidade: 'Belo Horizonte', estado: 'MG', bairro: 'Savassi',
      cache: 180, whatsapp: '31999990005',
      plano: 'PAGO', status: 'ATIVO', verificada: false,
    },
    {
      id: 'anuncio_006',
      titulo: 'Larissa - Loira Sofisticada',
      slug: 'larissa-loira-sofisticada',
      descricao: 'Larissa, loira, elegante e muito atenciosa.',
      cidade: 'Curitiba', estado: 'PR', bairro: 'Batel',
      cache: 220, whatsapp: '41999990006',
      plano: 'PAGO', status: 'ATIVO', verificada: true,
    },
  ]

  for (const anuncio of anuncios) {
    await prisma.anuncios.upsert({
      where: { slug: anuncio.slug },
      update: { status: anuncio.status, plano: anuncio.plano },
      create: { ...anuncio, usuarioId: usuario.id, atualizadoEm: new Date() }
    })
    console.log(`Criado: ${anuncio.titulo} [${anuncio.plano}]`)
  }

  console.log('Seed concluido!')
}

main().catch(console.error).finally(() => prisma.$disconnect())