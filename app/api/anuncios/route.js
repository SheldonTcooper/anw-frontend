export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { prisma } = await import('../../../lib/prisma')
    const { searchParams } = new URL(request.url)

    const page  = Math.max(1, parseInt(searchParams.get('page')  ?? '1'))
    const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '20'))
    const skip  = (page - 1) * limit

    const cidade = searchParams.get('cidade') ?? undefined
    const estado = searchParams.get('estado') ?? undefined
    const busca  = searchParams.get('q')      ?? undefined

    const where = {
      status: 'ATIVO',
      OR: [
        { expiracaoEm: null },
        { expiracaoEm: { gt: new Date() } },
      ],
      ...(cidade && { cidade: { equals: cidade, mode: 'insensitive' } }),
      ...(estado && { estado }),
      ...(busca && {
        OR: [
          { titulo:    { contains: busca, mode: 'insensitive' } },
          { descricao: { contains: busca, mode: 'insensitive' } },
          { cidade:    { contains: busca, mode: 'insensitive' } },
        ],
      }),
    }

    const [anuncios, total] = await Promise.all([
      prisma.anuncios.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { plano:    'desc' },
          { criadoEm: 'desc' },
        ],
        select: {
          id:              true,
          titulo:          true,
          slug:            true,
          cidade:          true,
          estado:          true,
          bairro:          true,
          cache:           true,
          plano:           true,
          verificada:      true,
          disponivelAgora: true,
          criadoEm:        true,
          midias: {
            where:  { isCapa: true, aprovada: true },
            select: { url: true },
            take:   1,
          },
          anuncios_tags: {
            select: {
              tags: { select: { nome: true, slug: true } },
            },
            take: 5,
          },
        },
      }),
      prisma.anuncios.count({ where }),
    ])

    return Response.json({
      success: true,
      data: anuncios,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext:    page * limit < total,
      },
    })

  } catch (error) {
    console.error('[GET /api/anuncios]', error)
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
