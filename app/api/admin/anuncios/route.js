export const dynamic = 'force-dynamic'

function verificarPin(request) {
  const pin = request.headers.get('x-admin-pin')
  const pinCorreto = process.env.ADMIN_PIN || '1234'
  return pin === pinCorreto
}

export async function GET(request) {
  if (!verificarPin(request)) {
    return Response.json({ success: false, error: 'Nao autorizado' }, { status: 401 })
  }
  try {
    const { prisma } = await import('../../../../lib/prisma')
    const anuncios = await prisma.anuncios.findMany({
      orderBy: { criadoEm: 'desc' },
      select: {
        id:          true,
        titulo:      true,
        slug:        true,
        status:      true,
        plano:       true,
        cidade:      true,
        estado:      true,
        verificada:  true,
        criadoEm:    true,
        atualizadoEm:true,
        usuarios: {
          select: { nome: true, email: true }
        },
        midias: {
          where:  { isCapa: true },
          select: { url: true },
          take:   1,
        },
      },
    })
    return Response.json({ success: true, data: anuncios })
  } catch (error) {
    console.error('[GET /api/admin/anuncios]', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  if (!verificarPin(request)) {
    return Response.json({ success: false, error: 'Nao autorizado' }, { status: 401 })
  }
  try {
    const { prisma } = await import('../../../../lib/prisma')
    const { id, status } = await request.json()

    const statusValidos = ['ATIVO', 'EM_ANALISE', 'PAUSADO', 'EXPIRADO', 'REMOVIDO']
    if (!id || !statusValidos.includes(status)) {
      return Response.json({ success: false, error: 'Dados invalidos' }, { status: 400 })
    }

    const anuncio = await prisma.anuncios.update({
      where: { id },
      data:  { status, atualizadoEm: new Date() },
      select: { id: true, titulo: true, status: true },
    })
    return Response.json({ success: true, data: anuncio })
  } catch (error) {
    console.error('[PATCH /api/admin/anuncios]', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
