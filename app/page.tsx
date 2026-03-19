"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

const anuncios = [
  { id: 1, nome: "Valentina Silva", cidade: "São Paulo", idade: 24, preco: 350, verificada: true },
  { id: 2, nome: "Isabela Moreira", cidade: "Rio de Janeiro", idade: 22, preco: 200, verificada: false },
  { id: 3, nome: "Camila Rocha", cidade: "Belo Horizonte", idade: 28, preco: 450, verificada: true },
  { id: 4, nome: "Fernanda Lima", cidade: "Curitiba", idade: 19, preco: 150, verificada: false },
  { id: 5, nome: "Juliana Ferreira", cidade: "Porto Alegre", idade: 31, preco: 300, verificada: true },
  { id: 6, nome: "Mariana Costa", cidade: "Salvador", idade: 25, preco: 500, verificada: false },
  { id: 7, nome: "Larissa Nunes", cidade: "Fortaleza", idade: 21, preco: 250, verificada: true },
  { id: 8, nome: "Patrícia Alves", cidade: "Brasília", idade: 35, preco: 400, verificada: false },
];

function CardAnuncio({ anuncio }: { anuncio: typeof anuncios[0] }) {
  const [curtido, setCurtido] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-lg transition-transform duration-200"
      style={{
        backgroundColor: "#250C30",
        border: `1px solid ${hovered ? "#C0306A" : "#4A1A5C"}`,
        transform: hovered ? "scale(1.02)" : "scale(1)",
        cursor: "pointer",
      }}
    >
      {/* Foto placeholder 3:4 */}
      <div className="relative w-full" style={{ paddingBottom: "75%" }}>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#3a3a3a" }}
        />
        {/* Badge verificada */}
        {anuncio.verificada && (
          <span
            className="absolute left-2 top-2 rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide"
            style={{ backgroundColor: "#B8960C", color: "#fff" }}
          >
            Verificada
          </span>
        )}
        {/* Ícone coração */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurtido((v) => !v);
          }}
          className="absolute right-2 top-2 rounded-full p-1 transition-colors"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          aria-label="Favoritar"
        >
          <Heart
            size={18}
            fill={curtido ? "#C0306A" : "none"}
            stroke={curtido ? "#C0306A" : "#fff"}
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 p-3">
        <span className="truncate font-semibold text-white">{anuncio.nome}</span>
        <span className="text-xs" style={{ color: "#c9a8e0" }}>
          {anuncio.cidade} · {anuncio.idade} anos
        </span>
        <span className="mt-1 font-bold" style={{ color: "#C0306A" }}>
          R$ {anuncio.preco}/h
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main
      className="min-h-screen px-4 py-8 sm:px-8"
      style={{ backgroundColor: "#1A0A1E" }}
    >
      <section>
        <h2 className="mb-6 text-xl font-bold text-white">
          Destaques em Brasil
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {anuncios.map((anuncio) => (
            <CardAnuncio key={anuncio.id} anuncio={anuncio} />
          ))}
        </div>
      </section>
    </main>
  );
}
