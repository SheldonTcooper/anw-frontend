"use client";
import { Heart } from "lucide-react";

export default function PainelCliente() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Meus Favoritos</h1>
          <p className="text-sm mt-0.5" style={{ color: "#c9a8e0" }}>Anunciantes que voce salvou</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl py-20 text-center"
          style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
          <Heart size={48} style={{ color: "#4A1A5C" }} className="mb-4" />
          <p className="font-semibold text-white">Nenhuma favorita ainda</p>
          <p className="mt-1 text-sm" style={{ color: "#c9a8e0" }}>Explore os anuncios e salve suas favoritas</p>
          <a href="/" className="mt-6 rounded-lg px-6 py-2 text-sm font-bold text-white hover:opacity-90"
            style={{ backgroundColor: "#C0306A" }}>
            Explorar anuncios
          </a>
        </div>
      </div>
    </main>
  );
}