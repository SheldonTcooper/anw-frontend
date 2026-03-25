"use client";

import { useState } from "react";
import { Heart, MapPin } from "lucide-react";

const favoritas = [
  { id: 1, nome: "Valentina Silva",  cidade: "São Paulo",       bairro: "Moema",       idade: 24, preco: 350, verificada: true },
  { id: 2, nome: "Camila Rocha",     cidade: "Belo Horizonte",  bairro: "Savassi",     idade: 28, preco: 450, verificada: true },
  { id: 3, nome: "Larissa Nunes",    cidade: "Fortaleza",       bairro: "Meireles",    idade: 21, preco: 250, verificada: false },
  { id: 4, nome: "Juliana Ferreira", cidade: "Porto Alegre",    bairro: "Petrópolis",  idade: 31, preco: 300, verificada: true },
  { id: 5, nome: "Isabela Moreira",  cidade: "Rio de Janeiro",  bairro: "Copacabana",  idade: 22, preco: 200, verificada: false },
  { id: 6, nome: "Fernanda Lima",    cidade: "Curitiba",        bairro: "Batel",       idade: 19, preco: 150, verificada: true },
];

function CardFavorita({ p, onRemover }: { p: typeof favoritas[0]; onRemover: (id: number) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-xl transition-transform duration-200 cursor-pointer"
      style={{
        backgroundColor: "#250C30",
        border: `1px solid ${hovered ? "#C0306A" : "#4A1A5C"}`,
        transform: hovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      {/* foto */}
      <div className="relative w-full" style={{ paddingBottom: "75%", backgroundColor: "#3a3a3a" }}>
        {p.verificada && (
          <span
            className="absolute left-2 top-2 rounded px-2 py-0.5 text-xs font-bold uppercase"
            style={{ backgroundColor: "#B8960C", color: "#fff" }}
          >
            Verificada
          </span>
        )}
        <button
          onClick={() => onRemover(p.id)}
          className="absolute right-2 top-2 rounded-full p-1.5 transition-opacity hover:opacity-70"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          title="Remover dos favoritos"
        >
          <Heart size={16} fill="#C0306A" stroke="#C0306A" />
        </button>
      </div>

      {/* info */}
      <div className="flex flex-col gap-1.5 p-3">
        <span className="truncate font-semibold text-white">{p.nome}</span>
        <span className="flex items-center gap-1 text-xs" style={{ color: "#c9a8e0" }}>
          <MapPin size={11} /> {p.cidade} · {p.bairro}
        </span>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "#c9a8e0" }}>{p.idade} anos</span>
          <span className="font-bold text-sm" style={{ color: "#C0306A" }}>R$ {p.preco}/h</span>
        </div>
        <a
          href="#"
          className="mt-1 block rounded-lg py-2 text-center text-xs font-bold uppercase text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#C0306A" }}
        >
          Ver Perfil
        </a>
      </div>
    </div>
  );
}

export default function PainelCliente() {
  const [lista, setLista] = useState(favoritas);

  const remover = (id: number) => setLista((prev) => prev.filter((p) => p.id !== id));

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-5xl">

        {/* cabeçalho */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">Meus Favoritos</h1>
            <p className="text-sm mt-0.5" style={{ color: "#c9a8e0" }}>
              {lista.length} {lista.length === 1 ? "anunciante salva" : "anunciantes salvas"}
            </p>
          </div>
          <a
            href="/"
            className="rounded-lg px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#C0306A" }}
          >
            Explorar mais
          </a>
        </div>

        {lista.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-xl py-20 text-center"
            style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}
          >
            <Heart size={48} style={{ color: "#4A1A5C" }} className="mb-4" />
            <p className="font-semibold text-white">Nenhuma favorita ainda</p>
            <p className="mt-1 text-sm" style={{ color: "#c9a8e0" }}>
              Explore os anúncios e salve suas favoritas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((p) => (
              <CardFavorita key={p.id} p={p} onRemover={remover} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
