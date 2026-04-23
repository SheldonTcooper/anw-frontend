export const dynamic = "force-dynamic"

function getUserFromToken(request) {
  const cookie = request.headers.get("cookie") || ""
  const token = cookie.split(";").find(c => c.trim().startsWith("token="))?.split("=")[1]
  if (!token) return null
  try {
    const jwt = require("jsonwebtoken")
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

export async function GET(request) {
  const user = getUserFromToken(request)
  if (!user) {
    return Response.json({ success: false, error: "Nao autorizado" }, { status: 401 })
  }
  try {
    const { prisma } = await import("../../../../lib/prisma")

    const anuncios = await prisma.anuncios.findMany({
      where: { usuarioId: user.id },
      include: {
        midias: { where: { isCapa: true, aprovada: true }, take: 1 },
        metricas: true,
      },
      orderBy: { criadoEm: "desc" },
    })

    const resultado = anuncios.map(a => ({
      id:              a.id,
      titulo:          a.titulo,
      slug:            a.slug,
      status:          a.status,
      plano:           a.plano,
      cidade:          a.cidade,
      estado:          a.estado,
      disponivelAgora: a.disponivelAgora,
      expiracaoEm:     a.expiracaoEm,
      criadoEm:        a.criadoEm,
      capa:            a.midias[0]?.url || null,
      metricas: {
        visualizacoes:   a.metricas.filter(m => m.tipo === "VISUALIZACAO").length,
        cliquesWhatsapp: a.metricas.filter(m => m.tipo === "CLIQUE_WHATS").length,
        cliquesLigar:    a.metricas.filter(m => m.tipo === "CLIQUE_LIGAR").length,
        favoritos:       a.metricas.filter(m => m.tipo === "FAVORITO").length,
      },
    }))

    return Response.json({ success: true, data: resultado })
  } catch (error) {
    console.error("[GET /api/anuncios/meus]", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  const user = getUserFromToken(request)
  if (!user) {
    return Response.json({ success: false, error: "Nao autorizado" }, { status: 401 })
  }
  try {
    const { prisma } = await import("../../../../lib/prisma")
    const { anuncioId, disponivelAgora } = await request.json()

    const anuncio = await prisma.anuncios.findFirst({
      where: { id: anuncioId, usuarioId: user.id },
    })
    if (!anuncio) {
      return Response.json({ success: false, error: "Anuncio nao encontrado" }, { status: 404 })
    }

    const atualizado = await prisma.anuncios.update({
      where: { id: anuncioId },
      data:  { disponivelAgora, atualizadoEm: new Date() },
      select: { id: true, disponivelAgora: true },
    })

    return Response.json({ success: true, data: atualizado })
  } catch (error) {
    console.error("[PATCH /api/anuncios/meus]", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
