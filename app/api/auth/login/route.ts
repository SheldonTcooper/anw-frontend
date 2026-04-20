import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, senha } = await req.json();

    console.log("Tentando login:", email);
    console.log("DATABASE_URL existe:", !!process.env.DATABASE_URL);

    const usuario = await prisma.usuarios.findUnique({ where: { email } });
    console.log("Usuário encontrado:", !!usuario);

    if (!usuario) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 });

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    console.log("Senha válida:", senhaValida);

    if (!senhaValida) return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });

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
    console.error("Erro no login:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}