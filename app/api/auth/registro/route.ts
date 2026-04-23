import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { rateLimit } from "@/lib/rateLimit";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown"
  const limit = rateLimit({ ip: "registro:" + ip, limite: 10, janela: 3600000 })

  if (!limit.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde " + limit.espera + " segundos." },
      { status: 429 }
    )
  }

  try {
    const { prisma } = await import('../../../../lib/prisma')
    const { nome, email, senha, telefone, tipo } = await req.json()

    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "Nome, email e senha sao obrigatorios" }, { status: 400 })
    }

    if (senha.length < 6) {
      return NextResponse.json({ error: "Senha deve ter no minimo 6 caracteres" }, { status: 400 })
    }

    const existe = await prisma.usuarios.findUnique({ where: { email } })
    if (existe) {
      return NextResponse.json({ error: "E-mail ja cadastrado" }, { status: 400 })
    }

    const senhaHash = await bcrypt.hash(senha, 10)
    const tipoUsuario = tipo === "CLIENTE" ? "CLIENTE" : "ANUNCIANTE"

    const usuario = await prisma.usuarios.create({
      data: {
        id: randomUUID(),
        nome,
        email,
        senhaHash,
        telefone: telefone || null,
        tipo: tipoUsuario,
        atualizadoEm: new Date(),
      }
    })

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
    console.error("Erro registro:", err.message)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
