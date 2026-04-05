"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";

const cidades = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba",
  "Porto Alegre", "Salvador", "Fortaleza", "Brasília", "Manaus", "Recife",
];

const estadosPorCidade: Record<string, string> = {
  "São Paulo": "SP", "Rio de Janeiro": "RJ", "Belo Horizonte": "MG",
  "Curitiba": "PR", "Porto Alegre": "RS", "Salvador": "BA",
  "Fortaleza": "CE", "Brasília": "DF", "Manaus": "AM", "Recife": "PE",
};

const bairrosPorCidade: Record<string, string[]> = {
  "São Paulo":      ["Moema", "Itaim Bibi", "Vila Olímpia", "Brooklin", "Pinheiros", "Jardins"],
  "Rio de Janeiro": ["Copacabana", "Ipanema", "Barra da Tijuca", "Botafogo", "Leblon", "Lapa"],
  "Belo Horizonte": ["Savassi", "Funcionários", "Lourdes", "Santo Agostinho", "Centro"],
  "Curitiba":       ["Batel", "Água Verde", "Centro", "Bigorrilho", "Cabral"],
  "Porto Alegre":   ["Moinhos de Vento", "Bela Vista", "Centro Histórico", "Petrópolis"],
  "Salvador":       ["Barra", "Pituba", "Ondina", "Rio Vermelho", "Itaigara"],
  "Fortaleza":      ["Meireles", "Aldeota", "Iracema", "Cocó", "Varjota"],
  "Brasília":       ["Asa Sul", "Asa Norte", "Lago Sul", "Lago Norte", "Sudoeste"],
  "Manaus":         ["Adrianópolis", "Vieiralves", "Centro", "Chapada"],
  "Recife":         ["Boa Viagem", "Casa Forte", "Espinheiro", "Graças", "Derby"],
};

const servicosOpcoes = [
  "Beijo na boca", "Oral sem camisinha", "Anal", "Dupla penetração",
  "Completa", "Garganta profunda", "Gozo na boca", "Pernoite",
  "24h", "Com local", "Aceita cartão", "Liberal", "Mostra rosto", "Tem vídeos",
];

const biotiposOpcoes = [
  "Baixinha", "Gordinha", "Modelo", "Cavala", "Ninfeta", "Peitosa",
];

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

function CheckGrid({ opcoes, selecionados, onChange }: {
  opcoes: string[];
  selecionados: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (op: string) =>
    onChange(selecionados.includes(op) ? selecionados.filter((s) => s !== op) : [...selecionados, op]);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {opcoes.map((op) => {
        const ativo = selecionados.includes(op);
        return (
          <label key={op} className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
            style={{ backgroundColor: ativo ? "#3a1550" : "#1A0A1E", border: `1px solid ${ativo ? "#C0306A" : "#4A1A5C"}`, color: ativo ? "#fff" : "#c9a8e0" }}>
            <input type="checkbox" className="hidden" checked={ativo} onChange={() => toggle(op)} />
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
              style={{ backgroundColor: ativo ? "#C0306A" : "transparent", border: `1.5px solid ${ativo ? "#C0306A" : "#4A1A5C"}` }}>
              {ativo && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
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
  const [bairro, setBairro] = useState("");
  const [servicos, setServicos] = useState<string[]>([]);
  const [biotipos, setBiotipos] = useState<string[]>([]);
  const [fotos, setFotos] = useState<File[]>([]);
  const [telefone, setTelefone] = useState("");
  const [telefoneConf, setTelefoneConf] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cache, setCache] = useState("");
  const [loading, setLoading] = useState(false);
  const inputFotoRef = useRef<HTMLInputElement>(null);

  const bairros = cidade ? (bairrosPorCidade[cidade] ?? []) : [];

  const handleFotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const novas = Array.from(e.target.files);
    setFotos((prev) => [...prev, ...novas].slice(0, 10));
  };

  const removerFoto = (idx: number) => setFotos((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (telefone !== telefoneConf) {
      alert("Os telefones não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/anuncios/criar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          descricao,
          cidade,
          estado: estadosPorCidade[cidade] || 'BR',
          bairro,
          whatsapp: telefone.replace(/\D/g, ''),
          cache: cache ? parseFloat(cache) : null,
          dataNascimento: dataNascimento || null,
          servicos,
          biotipos,
        })
      });

      const data = await res.json();

      if (data.success) {
        alert('✅ Anúncio enviado para revisão! Você será notificado quando for aprovado.');
        window.location.href = '/';
      } else {
        alert('Erro ao publicar: ' + data.error);
      }
    } catch (err) {
      alert('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-white">
          Publicar <span style={{ color: "#C0306A" }}>Anúncio</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <Secao titulo="Informações básicas">
            <div className="flex flex-col gap-4">
              <Campo label="Título do anúncio">
                <input
                  type="text"
                  placeholder="Ex: Valentina – Itaim Bibi, SP"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className={inputCls}
                  style={inputStyle}
                  required
                />
              </Campo>

              <Campo label="Data de nascimento">
                <input
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  className={inputCls}
                  style={inputStyle}
                  required
                />
              </Campo>

              <Campo label="Valor por hora (R$)">
                <input
                  type="number"
                  placeholder="Ex: 200"
                  value={cache}
                  onChange={(e) => setCache(e.target.value)}
                  className={inputCls}
                  style={inputStyle}
                  min="0"
                />
              </Campo>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Campo label="Cidade">
                  <select
                    value={cidade}
                    onChange={(e) => { setCidade(e.target.value); setBairro(""); }}
                    className={inputCls}
                    style={inputStyle}
                    required
                  >
                    <option value="" disabled>Selecione a cidade</option>
                    {cidades.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Campo>

                <Campo label="Bairro">
                  <select
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    className={inputCls}
                    style={inputStyle}
                    required
                    disabled={!cidade}
                  >
                    <option value="" disabled>
                      {cidade ? "Selecione o bairro" : "Selecione a cidade primeiro"}
                    </option>
                    {bairros.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Campo>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Campo label="Telefone / WhatsApp">
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(11) 99999-0000"
                    className={inputCls}
                    style={inputStyle}
                    required
                  />
                </Campo>

                <Campo label="Confirmar telefone">
                  <input
                    type="tel"
                    value={telefoneConf}
                    onChange={(e) => setTelefoneConf(e.target.value)}
                    placeholder="(11) 99999-0000"
                    className={inputCls}
                    style={{
                      ...inputStyle,
                      borderColor: telefoneConf && telefone !== telefoneConf ? "#ef4444"
                        : telefoneConf && telefone === telefoneConf ? "#22c55e" : "#4A1A5C",
                    }}
                    required
                  />
                  {telefoneConf && telefone !== telefoneConf && (
                    <span className="text-xs text-red-400">Telefones não coincidem</span>
                  )}
                </Campo>
              </div>

              <Campo label="Descrição">
                <textarea
                  placeholder="Fale um pouco sobre você, o que oferece, como é seu atendimento..."
                  rows={5}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className={inputCls}
                  style={{ ...inputStyle, resize: "vertical" }}
                  required
                />
              </Campo>
            </div>
          </Secao>

          <Secao titulo="Serviços">
            <CheckGrid opcoes={servicosOpcoes} selecionados={servicos} onChange={setServicos} />
          </Secao>

          <Secao titulo="Biotipo">
            <CheckGrid opcoes={biotiposOpcoes} selecionados={biotipos} onChange={setBiotipos} />
          </Secao>

          <Secao titulo="Fotos (máx. 10)">
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => inputFotoRef.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-xl py-8 transition-colors hover:border-[#C0306A]"
                style={{ border: "2px dashed #4A1A5C", backgroundColor: "#1A0A1E", color: "#c9a8e0" }}
              >
                <Upload size={28} />
                <span className="text-sm">Clique para selecionar fotos</span>
                <span className="text-xs opacity-60">JPG, PNG, WEBP · até 10 fotos</span>
              </button>
              <input ref={inputFotoRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFotos} />

              {fotos.length > 0 && (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {fotos.map((foto, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-lg" style={{ paddingBottom: "133%" }}>
                      <img src={URL.createObjectURL(foto)} alt={`foto-${idx + 1}`} className="absolute inset-0 h-full w-full object-cover" />
                      <button type="button" onClick={() => removerFoto(idx)} className="absolute right-1 top-1 rounded-full p-0.5" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                        <X size={14} stroke="#fff" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 rounded px-1.5 py-0.5 text-xs font-bold" style={{ backgroundColor: "#C0306A", color: "#fff" }}>Capa</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Secao>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-4 text-base font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#C0306A" }}
          >
            {loading ? "Enviando..." : "Publicar Anúncio"}
          </button>
        </form>
      </div>
    </main>
  );
}