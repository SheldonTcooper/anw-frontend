"use client";
import { useState, useRef } from "react";
import { X } from "lucide-react";
import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "../api/uploadthing/route";

const UploadButton = generateUploadButton<OurFileRouter>();

async function aplicarMarcaDagua(file: File): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const fadinha = new window.Image();
      fadinha.onload = () => {
        const h = Math.min(img.height * 0.25, 180);
        const w = fadinha.width * (h / fadinha.height);
        ctx.globalAlpha = 0.35;
        ctx.drawImage(fadinha, img.width - w - 15, img.height - h - 15, w, h);
        ctx.globalAlpha = 1;
        ctx.font = `bold ${Math.max(14, img.width * 0.04)}px Arial`;
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText("AcompanhantesNaWeb", 12, img.height - 12);
        canvas.toBlob((blob) => {
          resolve(new File([blob!], file.name, { type: "image/jpeg" }));
        }, "image/jpeg", 0.92);
      };
      fadinha.src = "/fadinha.png";
    };
    img.src = URL.createObjectURL(file);
  });
}

const estados = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
const servicosOpcoes = ["Beijo na boca","Oral sem camisinha","Oral com camisinha","Anal","Dupla penetracao","Completa","Garganta profunda","Gozo na boca","Gozo no corpo","Sexo com camisinha","Sexo sem camisinha","Pernoite","24h","Com local","Sem local","Aceita cartao","Liberal","Mostra rosto","Tem videos","Chamada de video","Faz programa","Nao faz programa","Fetiche","Beijo grego","Massagem","Acompanhante social","Viagem"];
const biotiposOpcoes = ["Baixinha","Gordinha","Modelo","Cavala","Ninfeta","Peitosa"];
const identidadesOpcoes = ["Mulher","Trans Mulher","Trans Homem","Homem","Gay","Lesbica","Bissexual","Casal Hetero","Casal Gay","Casal Lesbico","Casal Bi","Travesti","Drag Queen","Nao Binario","Massagista"];

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl p-6" style={{ backgroundColor: "#250C30", border: "1px solid #4A1A5C" }}>
      <h2 className="mb-5 text-base font-bold uppercase tracking-wide text-white">{titulo}</h2>
      {children}
    </section>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium" style={{ color: "#c9a8e0" }}>{label}</label>
      {children}
    </div>
  );
}

const inputCls = "rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#C0306A] w-full";
const inputStyle = { backgroundColor: "#1A0A1E", border: "1px solid #4A1A5C" };

function CheckGrid({ opcoes, selecionados, onChange }: { opcoes: string[]; selecionados: string[]; onChange: (v: string[]) => void }) {
  const toggle = (op: string) => onChange(selecionados.includes(op) ? selecionados.filter((s) => s !== op) : [...selecionados, op]);
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {opcoes.map((op) => {
        const ativo = selecionados.includes(op);
        return (
          <label key={op} className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
            style={{ backgroundColor: ativo ? "#3a1550" : "#1A0A1E", border: "1px solid " + (ativo ? "#C0306A" : "#4A1A5C"), color: ativo ? "#fff" : "#c9a8e0" }}>
            <input type="checkbox" className="hidden" checked={ativo} onChange={() => toggle(op)} />
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
              style={{ backgroundColor: ativo ? "#C0306A" : "transparent", border: "1.5px solid " + (ativo ? "#C0306A" : "#4A1A5C") }}>
              {ativo && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            {op}
          </label>
        );
      })}
    </div>
  );
}

export default function AnunciarPage() {
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [bairro, setBairro] = useState("");
  const [servicos, setServicos] = useState<string[]>([]);
  const [biotipos, setBiotipos] = useState<string[]>([]);
  const [identidades, setIdentidades] = useState<string[]>([]);
  const [fotosUrls, setFotosUrls] = useState<string[]>([]);
  const [capaIdx, setCapaIdx] = useState(0);
  const fotosRef = useRef<string[]>([]);
  const [telefone, setTelefone] = useState("");
  const [telefoneConf, setTelefoneConf] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cache, setCache] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (telefone !== telefoneConf) { alert("Os telefones nao coincidem."); return; }
    setLoading(true);
    try {
      const fotosOrdenadas = [...fotosRef.current];
      if (capaIdx > 0) {
        const capa = fotosOrdenadas.splice(capaIdx, 1)[0];
        fotosOrdenadas.unshift(capa);
      }
      const res = await fetch("/api/anuncios/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo, descricao, cidade, estado, bairro,
          whatsapp: telefone.replace(/\D/g, ""),
          cache: cache ? parseFloat(cache) : null,
          dataNascimento: dataNascimento || null,
          servicos, biotipos, identidades,
          fotosUrls: fotosOrdenadas,
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Anuncio enviado para revisao! Entraremos em contato pelo WhatsApp para ativar seu plano.");
        window.location.href = "/";
      } else {
        alert("Erro ao publicar: " + data.error);
      }
    } catch (err) {
      alert("Erro de conexao. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-white">Publicar <span style={{ color: "#C0306A" }}>Anuncio</span></h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <Secao titulo="Informacoes basicas">
            <div className="flex flex-col gap-4">
              <Campo label="Titulo do anuncio">
                <input type="text" placeholder="Ex: Valentina - Fortaleza, CE" value={titulo} onChange={(e) => setTitulo(e.target.value)} className={inputCls} style={inputStyle} required />
              </Campo>
              <Campo label="Data de nascimento">
                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className={inputCls} style={inputStyle} required />
              </Campo>
              <Campo label="Valor por hora (R$)">
                <input type="number" placeholder="Ex: 200" value={cache} onChange={(e) => setCache(e.target.value)} className={inputCls} style={inputStyle} min="0" />
              </Campo>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Campo label="Cidade">
                  <input type="text" placeholder="Ex: Fortaleza" value={cidade} onChange={(e) => setCidade(e.target.value)} className={inputCls} style={inputStyle} required />
                </Campo>
                <Campo label="Estado">
                  <select value={estado} onChange={(e) => setEstado(e.target.value)} className={inputCls} style={inputStyle} required>
                    <option value="" disabled>UF</option>
                    {estados.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </Campo>
                <Campo label="Bairro">
                  <input type="text" placeholder="Ex: Meireles" value={bairro} onChange={(e) => setBairro(e.target.value)} className={inputCls} style={inputStyle} />
                </Campo>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Campo label="Telefone / WhatsApp">
                  <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(11) 99999-0000" className={inputCls} style={inputStyle} required />
                </Campo>
                <Campo label="Confirmar telefone">
                  <input type="tel" value={telefoneConf} onChange={(e) => setTelefoneConf(e.target.value)} placeholder="(11) 99999-0000" className={inputCls}
                    style={{ ...inputStyle, borderColor: telefoneConf && telefone !== telefoneConf ? "#ef4444" : telefoneConf && telefone === telefoneConf ? "#22c55e" : "#4A1A5C" }} required />
                  {telefoneConf && telefone !== telefoneConf && <span className="text-xs text-red-400">Telefones nao coincidem</span>}
                </Campo>
              </div>
              <Campo label="Descricao">
                <textarea placeholder="Fale um pouco sobre voce, o que oferece, como e seu atendimento..." rows={5} value={descricao} onChange={(e) => setDescricao(e.target.value)} className={inputCls} style={{ ...inputStyle, resize: "vertical" }} required />
              </Campo>
            </div>
          </Secao>

          <Secao titulo="Como voce se identifica">
            <CheckGrid opcoes={identidadesOpcoes} selecionados={identidades} onChange={setIdentidades} />
          </Secao>

          <Secao titulo="Servicos">
            <CheckGrid opcoes={servicosOpcoes} selecionados={servicos} onChange={setServicos} />
          </Secao>

          <Secao titulo="Biotipo">
            <CheckGrid opcoes={biotiposOpcoes} selecionados={biotipos} onChange={setBiotipos} />
          </Secao>

          <Secao titulo="Fotos (max. 10)">
            <div className="flex flex-col gap-4">
              <p className="text-sm" style={{ color: "#c9a8e0" }}>
                Clique em uma foto para defini-la como <strong style={{ color: "#C0306A" }}>CAPA</strong>. Suas fotos terao a marca dagua automaticamente.
              </p>
              <UploadButton
                endpoint="imageUploader"
                onBeforeUploadBegin={async (files) => {
                  const processadas = await Promise.all(files.map(aplicarMarcaDagua));
                  return processadas;
                }}
                onClientUploadComplete={(res) => {
                  if (res) {
                    const urls = res.map((r) => (r as any).ufsUrl || r.url);
                    const novas = [...fotosRef.current, ...urls].slice(0, 10);
                    fotosRef.current = novas;
                    setFotosUrls(novas);
                    alert("Fotos enviadas! Total: " + novas.length);
                  }
                }}
                onUploadError={(error) => { alert("Erro no upload: " + error.message); }}
                appearance={{ button: { backgroundColor: "#C0306A", color: "white", fontWeight: "bold" } }}
              />
              {fotosUrls.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs" style={{ color: "#c9a8e0" }}>Clique na foto para definir como capa:</p>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                    {fotosUrls.map((url, idx) => (
                      <div key={idx} className="relative overflow-hidden rounded-lg cursor-pointer"
                        style={{ paddingBottom: "133%", border: idx === capaIdx ? "3px solid #C0306A" : "3px solid transparent" }}
                        onClick={() => setCapaIdx(idx)}>
                        <img src={url} alt={"foto-" + (idx + 1)} className="absolute inset-0 h-full w-full object-cover" />
                        {idx === capaIdx && (
                          <span className="absolute bottom-1 left-1 rounded px-1.5 py-0.5 text-xs font-bold" style={{ backgroundColor: "#C0306A", color: "#fff" }}>CAPA</span>
                        )}
                        <button type="button" onClick={(e) => {
                          e.stopPropagation();
                          const novas = fotosRef.current.filter((_, i) => i !== idx);
                          fotosRef.current = novas;
                          setFotosUrls(novas);
                          if (capaIdx >= novas.length) setCapaIdx(0);
                        }} className="absolute right-1 top-1 rounded-full p-0.5" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                          <X size={14} stroke="#fff" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Secao>

          <button type="submit" disabled={loading}
            className="w-full rounded-xl py-4 text-base font-bold uppercase tracking-wide text-white hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#C0306A" }}>
            {loading ? "Enviando..." : "Publicar Anuncio"}
          </button>
        </form>
      </div>
    </main>
  );
}
