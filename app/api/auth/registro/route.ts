import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { prisma } = await import('../../../../lib/prisma')
    const { nome, email, senha, telefone, tipo } = await req.json();

    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "Nome, email e senha sao obrigatorios" }, { status: 400 });
    }

    const existe = await prisma.usuarios.findUnique({ where: { email } });
    if (existe) return NextResponse.json({ error: "E-mail ja cadastrado" }, { status: 400 });

    const senhaHash = await bcrypt.hash(senha, 10);
    const tipoUsuario = tipo === "CLIENTE" ? "CLIENTE" : "ANUNCIANTE";

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
    });

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo }
    });
  } catch (err: any) {
    console.error("Erro registro:", err.message);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}