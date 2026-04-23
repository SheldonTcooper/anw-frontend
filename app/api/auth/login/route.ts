import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { rateLimit } from "@/lib/rateLimit";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown"
  const limit = rateLimit({ ip: "login:" + ip, limite: 5, janela: 60000 })

  if (!limit.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde " + limit.espera + " segundos." },
      { status: 429 }
    )
  }

  try {
    const { email, senha } = await req.json()

    if (!email || !senha) {
      return NextResponse.json({ error: "Email e senha obrigatorios" }, { status: 400 })
    }

    const usuario = await prisma.usuarios.findUnique({ where: { email } })
    if (!usuario) {
      return NextResponse.json({ error: "Credenciais invalidas" }, { status: 401 })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash)
    if (!senhaValida) {
      return NextResponse.json({ error: "Credenciais invalidas" }, { status: 401 })
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    return NextResponse.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo }
    })
  } catch (err: any) {
    console.error("Erro no login:", err.message)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
