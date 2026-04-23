"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AvisoMaioridade() {
  const router = useRouter();
  const pathname = usePathname();
  const [etapa, setEtapa] = useState<"maioridade" | "pronto" | null>(null);

  // Páginas que não precisam do fluxo
  const paginasLivres = ["/admin", "/login", "/termos-de-uso", "/privacidade"];
  const isPaginaLivre = paginasLivres.some(p => pathname?.startsWith(p));

  useEffect(() => {
    if (isPaginaLivre) { setEtapa("pronto"); return; }
    // Sempre mostra na maioridade a cada carregamento de página
    setEtapa("maioridade");
  }, []);

  const confirmarMaioridade = () => {
    // Verifica se está logado
    try {
      const usuario = localStorage.getItem("usuario");
      if (usuario) {
        // Já logado — vai direto
        setEtapa("pronto");
      } else {
        // Não logado — redireciona para login
        router.push("/login");
        setEtapa("pronto");
      }
    } catch {
      router.push("/login");
      setEtapa("pronto");
    }
  };

  const sair = () => {
    window.location.href = "https://www.google.com.br";
  };

  if (etapa !== "maioridade") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-sm rounded-2xl p-8 text-center"
        style={{ backgroundColor: "#250C30", border: "2px solid #C0306A" }}>

        {/* Ícone */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: "#1A0A1E", border: "2px solid #C0306A" }}>
          <span className="text-4xl">🔞</span>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-white">Conteudo Adulto</h1>
        <p className="mb-1 text-sm font-semibold" style={{ color: "#C0306A" }}>
          Acesso restrito a maiores de 18 anos
        </p>
        <p className="mb-8 text-xs leading-relaxed" style={{ color: "#c9a8e0" }}>
          Este site contém conteúdo adulto. Ao entrar, você declara ter 18 anos ou mais e concorda com os nossos{" "}
          <a href="/termos-de-uso" className="underline" style={{ color: "#C0306A" }}>Termos de Uso</a>.
        </p>

        <div className="flex flex-col gap-3">
          <button onClick={confirmarMaioridade}
            className="w-full rounded-xl py-4 font-bold uppercase tracking-wide text-white hover:opacity-90"
            style={{ backgroundColor: "#C0306A" }}>
            Sou maior de 18 anos — Entrar
          </button>
          <button onClick={sair}
            className="w-full rounded-xl py-3 text-sm font-semibold"
            style={{ backgroundColor: "transparent", border: "1px solid #4A1A5C", color: "#c9a8e0" }}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}