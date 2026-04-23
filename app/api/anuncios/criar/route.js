import { z } from 'zod'
import { rateLimit } from '../../../lib/rateLimit'

export const dynamic = 'force-dynamic'

const schema = z.object({
  titulo:        z.string().min(2).max(100),
  cidade:        z.string().min(2).max(100),
  estado:        z.string().length(2),
  bairro:        z.string().max(100).optional(),
  descricao:     z.string().max(2000).optional(),
  whatsapp:      z.string().min(10).max(20),
  cache:         z.number().min(0).max(99999).optional().nullable(),
  dataNascimento:z.string().optional().nullable(),
  fotosUrls:     z.array(z.string().url()).max(20).optional(),
})

async function notificarTelegram(anuncio) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (!token || !chatId) return
    const mensagem = "Novo anuncio pendente!\n\nNome: " + anuncio.titulo + "\nCidade: " + anuncio.cidade + " - " + anuncio.estado + "\nWhatsApp: " + anuncio.whatsapp + "\nValor: R$ " + (anuncio.cache || "nao informado") + "/hora\n\nAcesse:\nhttps://www.acompanhantesnaweb.com.br/admin"
    await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: mensagem })
    })
  } catch (err) { console.error("Erro Telegram:", err) }
}

function gerarId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown"
  const limit = rateLimit({ ip: "criar:" + ip, limite: 5, janela: 3600000 })

  if (!limit.ok) {
    return Response.json(
      { success: false, error: "Muitas tentativas. Aguarde " + limit.espera + " segundos." },
      { status: 429 }
    )
  }

  try {
    const { prisma } = await import('../../../../lib/prisma')
    const body = await request.json()

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      const erros = parsed.error.errors.map(e => e.path.join('.') + ': ' + e.message).join(', ')
      return Response.json({ success: false, error: "Dados invalidos: " + erros }, { status: 400 })
    }

    const { titulo, descricao, cidade, estado, bairro, whatsapp, cache, dataNascimento, fotosUrls } = parsed.data

    const slug = titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim() + '-' + Date.now()

    const whatsappLimpo = whatsapp.replace(/\D/g, '')
    const email = whatsappLimpo + "@anw.temp.br"

    let usuario = await prisma.usuarios.findUnique({ where: { email } })
    if (!usuario) {
      usuario = await prisma.usuarios.create({
        data: {
          id: gerarId(),
          email,
          senhaHash: 'temp',
          nome: titulo,
          tipo: 'ANUNCIANTE',
          atualizadoEm: new Date()
        }
      })
    }

    const anuncio = await prisma.anuncios.create({
      data: {
        id: gerarId(),
        usuarioId: usuario.id,
        titulo,
        slug,
        descricao,
        cidade,
        estado,
        bairro,
        whatsapp: whatsappLimpo,
        cache: cache ? parseFloat(String(cache)) : null,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        plano: 'ORGANICO',
        status: 'EM_ANALISE',
        atualizadoEm: new Date()
      }
    })

    if (fotosUrls && fotosUrls.length > 0) {
      for (let i = 0; i < fotosUrls.length; i++) {
        await prisma.midias.create({
          data: {
            id: gerarId(),
            anuncioId: anuncio.id,
            tipo: "FOTO",
            url: fotosUrls[i],
            ordem: i,
            aprovada: true,
            isCapa: i === 0,
          }
        })
      }
    }

    await notificarTelegram(anuncio)
    return Response.json({ success: true, slug: anuncio.slug, id: anuncio.id })

  } catch (error) {
    console.error("ERRO criar anuncio:", error.message)
    return Response.json({ success: false, error: "Erro interno" }, { status: 500 })
  }
}

