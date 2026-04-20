export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const { prisma } = await import('../../../../lib/prisma')
    const body = await request.json()
    const { titulo, descricao, cidade, estado, bairro, whatsapp, cache, dataNascimento } = body

    const slug = titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim() + '-' + Date.now()

    const email = `${whatsapp}@anw.temp.br`
    let usuario = await prisma.usuarios.findUnique({ where: { email } })

    if (!usuario) {
      usuario = await prisma.usuarios.create({
        data: {
          id: `usr_${Date.now()}`,
          email,
          senhaHash: 'temp',
          nome: titulo,
          tipo: 'ANUNCIANTE',
          atualizadoEm: new Date(),
        }
      })
    }

    const anuncio = await prisma.anuncios.create({
      data: {
        id: `anuncio_${Date.now()}`,
        usuarioId: usuario.id,
        titulo,
        slug,
        descricao,
        cidade,
        estado: estado || 'BR',
        bairro,
        whatsapp: whatsapp?.replace(/\D/g, ''),
        cache: cache ? parseFloat(cache) : null,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        plano: 'ORGANICO',
        status: 'EM_ANALISE',
        atualizadoEm: new Date(),
      }
    })

    return Response.json({ success: true, slug: anuncio.slug, id: anuncio.id })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}