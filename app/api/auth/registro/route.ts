import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { nome, email, senha, telefone } = await req.json();

    const existe = await prisma.usuarios.findUnique({ where: { email } });
    if (existe) return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 });

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuarios.create({
      data: {
        id: randomUUID(),
        nome,
        email,
        senhaHash,
        telefone,
        tipo: "ANUNCIANTE",
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
  } catch (err) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}