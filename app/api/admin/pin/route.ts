export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { pin } = await request.json()
    const pinCorreto = process.env.ADMIN_PIN || "1234"
    if (pin === pinCorreto) {
      return Response.json({ success: true })
    }
    return Response.json({ success: false, error: "PIN incorreto" }, { status: 401 })
  } catch {
    return Response.json({ success: false, error: "Erro interno" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { pinAtual, pinNovo } = await request.json()
    const pinCorreto = process.env.ADMIN_PIN || "1234"
    if (pinAtual !== pinCorreto) {
      return Response.json({ success: false, error: "PIN atual incorreto" }, { status: 401 })
    }
    // Instrui o admin a atualizar no Vercel
    return Response.json({ 
      success: true, 
      message: "Para alterar o PIN, atualize a variavel ADMIN_PIN no Vercel e faça um redeploy.",
      novoPin: pinNovo
    })
  } catch {
    return Response.json({ success: false, error: "Erro interno" }, { status: 500 })
  }
}