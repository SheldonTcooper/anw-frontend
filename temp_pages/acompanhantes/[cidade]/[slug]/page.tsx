"use client";

import { useState } from "react";
import { Heart, MapPin, Phone, MessageCircle, ChevronLeft, Star } from "lucide-react";

/* ─── dados fictícios ─────────────────────────────── */
const perfil = {
  nome: "Valentina Silva",
  cidade: "São Paulo",
  bairro: "Moema",
  nascimento: new Date(2000, 3, 12),
  preco: 350,
  verificada: true,
  whatsapp: "11999990000",
  telefone: "11999990000",
  descricao:
    "Olá! Sou a Valentina, uma jovem discreta e sofisticada que valoriza momentos especiais. Atendo com exclusividade, pontualidade e muita simpatia. Meu espaço é confortável, limpo e reservado. Entre em contato e vamos conversar!",
  servicos: ["Massagem", "Acompanhante", "Jantar", "Viagens", "Final de semana", "Hotel"],
  fotos: Array.from({ length: 5 }, (_, i) => i),
};

const sugestoes = [
  { id: 1, nome: "Isabela Moreira", cidade: "São Paulo", idade: 22, preco: 200, verificada: true },
  { id: 2, nome: "Camila Rocha", cidade: "São Paulo", idade: 28, preco: 450, verificada: false },
  { id: 3, nome: "Fernanda Lima", cidade: "São Paulo", idade: 19, preco: 150, verificada: true },
  { id: 4, nome: "Larissa Nunes", cidade: "São Paulo", idade: 25, preco: 300, verificada: false },
];

/* ─── utilitários ─────────────────────────────────── */
function calcularIdade(nascimento: Date) {
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
}

/* ─── card sugestão ───────────────────────────────── */
function CardSugestao({ p }: { p: typeof sugestoes[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col overflow-hidden rounded-lg transition-transform duration-200 cursor-pointer"
      style={{
        backgroundColor: "#250C30",
        border: `1px solid ${hovered ? "#C0306A" : "#4A1A5C"}`,
        transform: hovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      <div className="relative w-full" style={{ paddingBottom: "75%" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "#3a3a3a" }} />
        {p.verificada && (
          <span
            className="absolute left-2 top-2 rounded px-2 py-0.5 text-xs font-bold uppercase"
            style={{ backgroundColor: "#B8960C", color: "#fff" }}
          >
            Verificada
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <span className="truncate font-semibold text-white">{p.nome}</span>
        <span className="text-xs" style={{ color: "#c9a8e0" }}>
          {p.cidade} · {p.idade} anos
        </span>
        <span className="mt-1 font-bold" style={{ color: "#C0306A" }}>
          R$ {p.preco}/h
        </span>
      </div>
    </div>
  );
}

/* ─── página principal ────────────────────────────── */
export default function PaginaAnuncio() {
  const [fotoAtiva, setFotoAtiva] = useState(0);
  const [curtido, setCurtido] = useState(false);
  const idade = calcularIdade(perfil.nascimento);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      {/* breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm" style={{ color: "#c9a8e0" }}>
        <ChevronLeft size={14} />
        <a href="/" className="hover:underline">Início</a>
        <span>/</span>
        <a href="#" className="hover:underline">{perfil.cidade}</a>
        <span>/</span>
        <span className="text-white">{perfil.nome}</span>
      </nav>

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* ── coluna esquerda: galeria ── */}
          <div className="flex flex-col gap-3 lg:w-1/2">
            {/* foto principal */}
            <div
              className="relative w-full overflow-hidden rounded-xl"
              style={{ paddingBottom: "133.33%", backgroundColor: "#3a3a3a" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl text-gray-600">📷 {fotoAtiva + 1}</span>
              </div>
              {/* coração */}
              <button
                onClick={() => setCurtido((v) => !v)}
                className="absolute right-3 top-3 rounded-full p-2 transition-colors"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <Heart
                  size={22}
                  fill={curtido ? "#C0306A" : "none"}
                  stroke={curtido ? "#C0306A" : "#fff"}
                />
              </button>
            </div>

            {/* miniaturas */}
            <div className="flex gap-2">
              {perfil.fotos.map((i) => (
                <button
                  key={i}
                  onClick={() => setFotoAtiva(i)}
                  className="relative flex-1 overflow-hidden rounded-lg transition-all"
                  style={{
                    paddingBottom: "18%",
                    backgroundColor: "#3a3a3a",
                    border: fotoAtiva === i ? "2px solid #C0306A" : "2px solid transparent",
                    opacity: fotoAtiva === i ? 1 : 0.55,
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── coluna direita: info ── */}
          <div className="flex flex-col gap-5 lg:w-1/2">
            {/* nome + badge */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{perfil.nome}</h1>
              {perfil.verificada && (
                <span
                  className="flex items-center gap-1 rounded px-3 py-1 text-sm font-bold uppercase"
                  style={{ backgroundColor: "#B8960C", color: "#fff" }}
                >
                  <Star size={13} fill="#fff" /> Verificada
                </span>
              )}
            </div>

            {/* localização */}
            <div className="flex items-center gap-1 text-sm" style={{ color: "#c9a8e0" }}>
              <MapPin size={15} />
              <a href="#" className="hover:underline">{perfil.cidade}</a>
              <span>·</span>
              <a href="#" className="hover:underline">{perfil.bairro}</a>
            </div>

            {/* idade + preço */}
            <div className="flex items-center gap-6">
              <div>
                <span className="text-xs uppercase tracking-wide" style={{ color: "#c9a8e0" }}>Idade</span>
                <p className="text-xl font-semibold text-white">{idade} anos</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide" style={{ color: "#c9a8e0" }}>Valor/hora</span>
                <p className="text-2xl font-bold" style={{ color: "#C0306A" }}>
                  R$ {perfil.preco}
                </p>
              </div>
            </div>

            {/* serviços */}
            <div>
              <span className="mb-2 block text-xs uppercase tracking-wide" style={{ color: "#c9a8e0" }}>
                Serviços
              </span>
              <div className="flex flex-wrap gap-2">
                {perfil.servicos.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1 text-sm font-medium"
                    style={{ backgroundColor: "#3a1550", color: "#e0b8f5", border: "1px solid #4A1A5C" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* botões de contato */}
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/55${perfil.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle size={20} />
                WHATSAPP
              </a>
              <a
                href={`tel:+55${perfil.telefone}`}
                className="flex items-center justify-center gap-2 rounded-lg py-3 text-base font-bold text-white transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}
              >
                <Phone size={20} />
                LIGAR
              </a>
            </div>
          </div>
        </div>

        {/* ── descrição ── */}
        <section
          className="mt-8 rounded-xl p-6"
          style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}
        >
          <h2 className="mb-3 text-lg font-bold text-white">Sobre mim</h2>
          <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>
            {perfil.descricao}
          </p>
        </section>

        {/* ── você também pode gostar ── */}
        <section className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-white">Você também pode gostar</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {sugestoes.map((s) => (
              <CardSugestao key={s.id} p={s} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
