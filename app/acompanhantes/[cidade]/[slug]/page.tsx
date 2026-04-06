"use client";
import { useState, useEffect } from "react";
import { Heart, MapPin, Phone, MessageCircle, ChevronLeft, Star } from "lucide-react";

function calcularIdade(nascimento: string | null) {
  if (!nascimento) return null;
  const hoje = new Date();
  const nasc = new Date(nascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

export default function PaginaAnuncio({ params }: { params: { cidade: string; slug: string } }) {
  const [anuncio, setAnuncio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [curtido, setCurtido] = useState(false);
  const [fotoAtiva, setFotoAtiva] = useState(0);

  useEffect(() => {
    fetch(`/api/anuncios/${params.slug}`)
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
        <p className="text-white text-2xl font-bold mb-2">Anúncio não encontrado</p>
        <a href="/" className="text-pink-400 hover:underline">Voltar ao início</a>
      </div>
    </main>
  );

  const idade = calcularIdade(anuncio.dataNascimento);
  const fotos = anuncio.midias || [];

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <nav className="mb-4 flex items-center gap-2 text-sm" style={{ color: "#c9a8e0" }}>
        <ChevronLeft size={14} />
        <a href="/" className="hover:underline">Início</a>
        <span>/</span>
        <span>{anuncio.cidade}</span>
        <span>/</span>
        <span className="text-white">{anuncio.titulo}</span>
      </nav>

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 lg:flex-row">

          <div className="flex flex-col gap-3 lg:w-1/2">
            <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: "133.33%", backgroundColor: "#3a3a3a" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                {fotos[fotoAtiva]?.url
                  ? <img src={fotos[fotoAtiva].url} alt={anuncio.titulo} className="w-full h-full object-cover" />
                  : <span className="text-5xl text-gray-600">📷</span>
                }
              </div>
              <button onClick={() => setCurtido(v => !v)} className="absolute right-3 top-3 rounded-full p-2" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <Heart size={22} fill={curtido ? "#C0306A" : "none"} stroke={curtido ? "#C0306A" : "#fff"} />
              </button>
            </div>
            {fotos.length > 0 && (
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
              {anuncio.bairro && <><span>·</span><span>{anuncio.bairro}</span></>}
              <span>- {anuncio.estado}</span>
            </div>

            <div className="flex items-center gap-6">
              {idade && (
                <div>
                  <span className="text-xs uppercase tracking-wide" style={{ color: "#c9a8e0" }}>Idade</span>
                  <p className="text-xl font-semibold text-white">{idade} anos</p>
                </div>
              )}
              {anuncio.cache && (
                <div>
                  <span className="text-xs uppercase tracking-wide" style={{ color: "#c9a8e0" }}>Valor/hora</span>
                  <p className="text-2xl font-bold" style={{ color: "#C0306A" }}>R$ {Number(anuncio.cache).toFixed(0)}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {anuncio.whatsapp && (
                <a href={`https://wa.me/55${anuncio.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg py-3 text-base font-bold text-white hover:opacity-90"
                  style={{ backgroundColor: "#25D366" }}>
                  <MessageCircle size={20} /> WHATSAPP
                </a>
              )}
              {anuncio.telefonePublico && (
                <a href={`tel:+55${anuncio.telefonePublico}`}
                  className="flex items-center justify-center gap-2 rounded-lg py-3 text-base font-bold text-white hover:opacity-80"
                  style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
                  <Phone size={20} /> LIGAR
                </a>
              )}
            </div>
          </div>
        </div>

        {anuncio.descricao && (
          <section className="mt-8 rounded-xl p-6" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
            <h2 className="mb-3 text-lg font-bold text-white">Sobre mim</h2>
            <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>{anuncio.descricao}</p>
          </section>
        )}
      </div>
    </main>
  );
}