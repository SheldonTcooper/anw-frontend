export const dynamic = 'force-dynamic'

async function notificarTelegram(anuncio) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (!token || !chatId) return
    const mensagem = "Novo anuncio pendente!\n\nNome: " + anuncio.titulo + "\nCidade: " + anuncio.cidade + " - " + anuncio.estado + "\nWhatsApp: " + anuncio.whatsapp + "\nValor: R$ " + (anuncio.cache || "nao informado") + "/hora\n\nAcesse:\nhttps://www.acompanhantesnaweb.com.br/admin"
    await fetch("https://api.telegram.org/bot" + token + "/sendMessage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chatId, text: mensagem }) })
  } catch (err) { console.error("Erro Telegram:", err) }
}

export async function POST(request) {
  try {
    const { prisma } = await import('../../../../lib/prisma')
    const body = await request.json()
    const { titulo, descricao, cidade, estado, bairro, whatsapp, cache, dataNascimento, fotosUrls } = body
console.log("DEBUG fotosUrls:", JSON.stringify(fotosUrls))
    const slug = titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim() + '-' + Date.now()
    const email = whatsapp + "@anw.temp.br"
    let usuario = await prisma.usuarios.findUnique({ where: { email } })
    if (!usuario) {
      usuario = await prisma.usuarios.create({ data: { id: "usr_" + Date.now(), email, senhaHash: 'temp', nome: titulo, tipo: 'ANUNCIANTE', atualizadoEm: new Date() } })
    }
    const anuncio = await prisma.anuncios.create({
      data: { id: "anuncio_" + Date.now(), usuarioId: usuario.id, titulo, slug, descricao, cidade, estado: estado || 'BR', bairro, whatsapp: whatsapp?.replace(/\D/g, ''), cache: cache ? parseFloat(cache) : null, dataNascimento: dataNascimento ? new Date(dataNascimento) : null, plano: 'ORGANICO', status: 'EM_ANALISE', atualizadoEm: new Date() }
    })
    if (fotosUrls && fotosUrls.length > 0) {
      await prisma.midias.createMany({
        data: fotosUrls.map((url, i) => ({
          id: "midia_" + Date.now() + "_" + i,
          anuncioId: anuncio.id,
          tipo: "FOTO",
          url: url,
          ordem: i,
        }))
      })
    }
    await notificarTelegram(anuncio)
    return Response.json({ success: true, slug: anuncio.slug, id: anuncio.id })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}