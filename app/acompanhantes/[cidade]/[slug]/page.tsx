"use client";
import { useState, useEffect } from "react";
import { Heart, MapPin, Phone, MessageCircle, ChevronLeft, Star, Clock, Calculator } from "lucide-react";

function calcularIdade(nascimento: string | null) {
  if (!nascimento) return null;
  const hoje = new Date();
  const nasc = new Date(nascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

const opcoesTempo = [
  { label: "30 min", horas: 0.5 },
  { label: "1 hora", horas: 1 },
  { label: "1h30", horas: 1.5 },
  { label: "2 horas", horas: 2 },
  { label: "3 horas", horas: 3 },
  { label: "4 horas", horas: 4 },
  { label: "6 horas", horas: 6 },
  { label: "Pernoite", horas: 12 },
];

export default function PaginaAnuncio({ params }: { params: { cidade: string; slug: string } }) {
  const [anuncio, setAnuncio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [curtido, setCurtido] = useState(false);
  const [fotoAtiva, setFotoAtiva] = useState(0);
  const [horasSelecionadas, setHorasSelecionadas] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/anuncios/" + params.slug)
      .then(res => res.json())
      .then(data => { if (data.success) setAnuncio(data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.slug]);

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#1A0A1E" }}>
      <p className="text-white">Carregando...</p>
    </main>
  );

  if (!anuncio) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="text-center">
        <p className="text-white text-2xl font-bold mb-2">Anuncio nao encontrado</p>
        <a href="/" className="text-pink-400 hover:underline">Voltar ao inicio</a>
      </div>
    </main>
  );

  const idade = calcularIdade(anuncio.dataNascimento);
  const fotos = anuncio.midias || [];
  const valorHora = anuncio.cache ? Number(anuncio.cache) : null;
  const valorTotal = valorHora && horasSelecionadas ? valorHora * horasSelecionadas : null;

  const mensagemWhatsApp = () => {
    if (!horasSelecionadas || !valorTotal) return "https://wa.me/55" + anuncio.whatsapp;
    const opcao = opcoesTempo.find(o => o.horas === horasSelecionadas);
    const msg = "Ola! Vi seu anuncio no AcompanhantesNaWeb e tenho interesse em " + (opcao?.label || horasSelecionadas + "h") + " pelo valor de R$ " + valorTotal.toFixed(0) + ". Podemos conversar?";
    return "https://wa.me/55" + anuncio.whatsapp + "?text=" + encodeURIComponent(msg);
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <nav className="mb-4 flex items-center gap-2 text-sm" style={{ color: "#c9a8e0" }}>
        <ChevronLeft size={14} />
        <a href="/" className="hover:underline">Inicio</a>
        <span>/</span>
        <span>{anuncio.cidade}</span>
        <span>/</span>
        <span className="text-white">{anuncio.titulo}</span>
      </nav>

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Fotos */}
          <div className="flex flex-col gap-3 lg:w-1/2">
            <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: "133.33%", backgroundColor: "#3a3a3a" }}>
                <button type="button" onClick={() => setFotoAtiva(i => i > 0 ? i - 1 : fotos.length - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
                <button type="button" onClick={() => setFotoAtiva(i => i < fotos.length - 1 ? i + 1 : 0)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>
              <div className="absolute inset-0 flex items-center justify-center">
                {fotos[fotoAtiva]?.url
                  ? <img src={fotos[fotoAtiva].url} alt={anuncio.titulo} className="w-full h-full object-cover" />
                  : <span className="text-5xl text-gray-600">­ƒôÀ</span>
                }
              </div>
              <button onClick={() => setCurtido(v => !v)} className="absolute right-3 top-3 rounded-full p-2" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <Heart size={22} fill={curtido ? "#C0306A" : "none"} stroke={curtido ? "#C0306A" : "#fff"} />
              </button>
            </div>
            {fotos.length > 1 && (
              <div className="flex gap-2">
                {fotos.map((foto: any, i: number) => (
                  <button key={i} onClick={() => setFotoAtiva(i)} className="relative flex-1 overflow-hidden rounded-lg"
                    style={{ paddingBottom: "18%", backgroundColor: "#3a3a3a", border: fotoAtiva === i ? "2px solid #C0306A" : "2px solid transparent", opacity: fotoAtiva === i ? 1 : 0.55 }}>
                    {foto.url && <img src={foto.url} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informa├º├Áes */}
          <div className="flex flex-col gap-5 lg:w-1/2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{anuncio.titulo}</h1>
              {anuncio.verificada && (
                <span className="flex items-center gap-1 rounded px-3 py-1 text-sm font-bold uppercase" style={{ backgroundColor: "#B8960C", color: "#fff" }}>
                  <Star size={13} fill="#fff" /> Verificada
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm" style={{ color: "#c9a8e0" }}>
              <MapPin size={15} />
              <span>{anuncio.cidade}</span>
              {anuncio.bairro && <><span>┬À</span><span>{anuncio.bairro}</span></>}
              <span>- {anuncio.estado}</span>
            </div>

            {/* Valor e idade */}
            <div className="flex items-center gap-6">
              {idade && (
                <div>
                  <span className="text-xs uppercase tracking-wide" style={{ color: "#c9a8e0" }}>Idade</span>
                  <p className="text-xl font-semibold text-white">{idade} anos</p>
                </div>
              )}
              {valorHora && (
                <div>
                  <span className="text-xs uppercase tracking-wide" style={{ color: "#c9a8e0" }}>Valor/hora</span>
                  <p className="text-2xl font-bold" style={{ color: "#C0306A" }}>R$ {valorHora.toFixed(0)}</p>
                </div>
              )}
            </div>

            {/* CALCULADORA DE HORAS */}
            {valorHora && (
              <div className="rounded-xl p-4" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Calculator size={16} style={{ color: "#C0306A" }} />
                  <span className="text-sm font-bold text-white uppercase tracking-wide">Calcular programa</span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {opcoesTempo.map((op) => (
                    <button key={op.horas} onClick={() => setHorasSelecionadas(op.horas === horasSelecionadas ? null : op.horas)}
                      className="rounded-lg py-2 text-xs font-bold transition-all"
                      style={{
                        backgroundColor: horasSelecionadas === op.horas ? "#C0306A" : "#1A0A1E",
                        border: "1px solid " + (horasSelecionadas === op.horas ? "#C0306A" : "#4A1A5C"),
                        color: horasSelecionadas === op.horas ? "#fff" : "#c9a8e0",
                      }}>
                      {op.label}
                    </button>
                  ))}
                </div>
                {horasSelecionadas && valorTotal && (
                  <div className="rounded-lg p-3 flex items-center justify-between" style={{ backgroundColor: "#1A0A1E", border: "1px solid #C0306A" }}>
                    <div className="flex items-center gap-2" style={{ color: "#c9a8e0" }}>
                      <Clock size={14} />
                      <span className="text-sm">{opcoesTempo.find(o => o.horas === horasSelecionadas)?.label}</span>
                    </div>
                    <span className="text-xl font-bold" style={{ color: "#C0306A" }}>
                      R$ {valorTotal.toFixed(0)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Bot├Áes de contato */}
            <div className="flex flex-col gap-3">
              {anuncio.whatsapp && (
                <a href={mensagemWhatsApp()} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg py-3 text-base font-bold text-white hover:opacity-90"
                  style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle size={20} />
                  {horasSelecionadas ? "CHAMAR NO WHATSAPP - R$ " + valorTotal?.toFixed(0) : "WHATSAPP"}
                </a>
              )}
              {anuncio.telefonePublico && (
                <a href={"tel:+55" + anuncio.telefonePublico}
                  className="flex items-center justify-center gap-2 rounded-lg py-3 text-base font-bold text-white hover:opacity-80"
                  style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
                  <Phone size={20} /> LIGAR
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Descri├º├úo */}
        {anuncio.descricao && (
          <section className="mt-8 rounded-xl p-6" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
            <h2 className="mb-3 text-lg font-bold text-white">Sobre mim</h2>
            <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>{anuncio.descricao}</p>
          </section>
        )}

        {anuncio.anuncios_tags && anuncio.anuncios_tags.filter((at: any) => at.tags.cluster === "servico").length > 0 && (
          <section className="mt-4 rounded-xl p-6" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
            <h2 className="mb-4 text-lg font-bold text-white">O que eu faco</h2>
            <div className="flex flex-wrap gap-2">
              {anuncio.anuncios_tags.filter((at: any) => at.tags.cluster === "servico").map((at: any) => (
                <span key={at.tags.slug} className="rounded-full px-3 py-1.5 text-sm font-medium"
                  style={{ backgroundColor: "#3a1550", border: "1px solid #C0306A", color: "#fff" }}>
                  {at.tags.nome}
                </span>
              ))}
            </div>
          </section>
        )}
        {anuncio.anuncios_tags && anuncio.anuncios_tags.filter((at: any) => at.tags.cluster === "biotipo").length > 0 && (
          <section className="mt-4 rounded-xl p-6" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
            <h2 className="mb-4 text-lg font-bold text-white">Biotipo</h2>
            <div className="flex flex-wrap gap-2">
              {anuncio.anuncios_tags.filter((at: any) => at.tags.cluster === "biotipo").map((at: any) => (
                <span key={at.tags.slug} className="rounded-full px-3 py-1.5 text-sm font-medium"
                  style={{ backgroundColor: "#1e3a5f", border: "1px solid #60a5fa", color: "#60a5fa" }}>
                  {at.tags.nome}
                </span>
              ))}
            </div>
          </section>
        )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
