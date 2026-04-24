const { PrismaClient } = require('./node_modules/.prisma/client')
const prisma = new PrismaClient()

const modelos = [
  { titulo: "Bruna - Loira Gostosa", cidade: "Sao Paulo", estado: "SP", bairro: "Moema", cache: 300, categoria: "loira", plano: "PAGO" },
  { titulo: "Camila - Morena Deliciosa", cidade: "Rio de Janeiro", estado: "RJ", bairro: "Ipanema", cache: 250, categoria: "morena", plano: "SUPER_DESTAQUE" },
  { titulo: "Leticia - Ruiva Safada", cidade: "Belo Horizonte", estado: "MG", bairro: "Savassi", cache: 200, categoria: "ruiva", plano: "PAGO" },
  { titulo: "Valentina - Acompanhante de Luxo", cidade: "Fortaleza", estado: "CE", bairro: "Meireles", cache: 500, categoria: "luxo", plano: "SUPERTOP" },
  { titulo: "Julia - Universitaria Gatinha", cidade: "Porto Alegre", estado: "RS", bairro: "Moinhos", cache: 180, categoria: "universitaria", plano: "ORGANICO" },
  { titulo: "Melissa - Loira Premium", cidade: "Brasilia", estado: "DF", bairro: "Asa Sul", cache: 400, categoria: "loira", plano: "SUPER_DESTAQUE" },
  { titulo: "Sabrina - Morena Fitness", cidade: "Curitiba", estado: "PR", bairro: "Batel", cache: 220, categoria: "morena", plano: "PAGO" },
  { titulo: "Rebeca - Ruiva Exotica", cidade: "Salvador", estado: "BA", bairro: "Barra", cache: 280, categoria: "ruiva", plano: "ORGANICO" },
  { titulo: "Isadora - Luxo Total", cidade: "Recife", estado: "PE", bairro: "Boa Viagem", cache: 600, categoria: "luxo", plano: "ULTRATOP" },
  { titulo: "Nathalia - Universitaria Linda", cidade: "Florianopolis", estado: "SC", bairro: "Centro", cache: 160, categoria: "universitaria", plano: "ORGANICO" },
]

function gerarId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

async function main() {
  // Busca ou cria usuario modelo
  let usuario = await prisma.usuarios.findUnique({ where: { email: 'modelos@anw.temp.br' } })
  if (!usuario) {
    usuario = await prisma.usuarios.create({
      data: {
        id: gerarId(),
        email: 'modelos@anw.temp.br',
        senhaHash: 'temp',
        nome: 'Modelos ANW',
        tipo: 'ANUNCIANTE',
        atualizadoEm: new Date()
      }
    })
  }

  // Busca ou cria tags
  const tags = {}
  const categorias = ['loira', 'morena', 'ruiva', 'luxo', 'universitaria']
  for (const cat of categorias) {
    let tag = await prisma.tags.findUnique({ where: { slug: cat } })
    if (!tag) {
      tag = await prisma.tags.create({
        data: { id: gerarId(), slug: cat, nome: cat.charAt(0).toUpperCase() + cat.slice(1) }
      })
    }
    tags[cat] = tag
  }

  let criados = 0
  for (const m of modelos) {
    const slug = m.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim() + '-' + Date.now()
    
    const anuncio = await prisma.anuncios.create({
      data: {
        id: gerarId(),
        usuarioId: usuario.id,
        titulo: m.titulo,
        slug,
        descricao: 'Anuncio modelo para testes. Em breve anuncios reais de acompanhantes verificadas.',
        cidade: m.cidade,
        estado: m.estado,
        bairro: m.bairro,
        whatsapp: '11999999999',
        cache: m.cache,
        plano: m.plano,
        status: 'ATIVO',
        atualizadoEm: new Date()
      }
    })

    // Vincula tag de categoria
    await prisma.anuncios_tags.create({
      data: { anuncioId: anuncio.id, tagId: tags[m.categoria].id }
    })

    criados++
    console.log('Criado:', m.titulo, '-', m.cidade)
  }

  console.log('Total criados:', criados)
}

main().then(() => prisma.$disconnect()).catch(console.error)
