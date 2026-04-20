export default function TermosDeUso() {
  return (
    <div className="min-h-screen text-gray-200 py-16 px-4" style={{ backgroundColor: "#1A0A1E" }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Termos de Uso</h1>
        <p className="mb-10" style={{ color: "#c9a8e0" }}>Ultima atualizacao: abril de 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3" style={{ color: "#C0306A" }}>1. Aceitacao dos Termos</h2>
          <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>
            Ao acessar e utilizar a plataforma AcompanhantesNaWeb (ANW), voce concorda com estes Termos de Uso. Se nao concordar com qualquer parte destes termos, nao utilize nossa plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3" style={{ color: "#C0306A" }}>2. Elegibilidade</h2>
          <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>
            O uso desta plataforma e restrito a maiores de 18 anos. Ao se cadastrar, voce declara ter idade legal para acessar conteudo adulto conforme a legislacao vigente em seu pais.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3" style={{ color: "#C0306A" }}>3. Uso da Plataforma</h2>
          <p className="leading-relaxed mb-2" style={{ color: "#c9a8e0" }}>E expressamente proibido:</p>
          <ul className="list-disc list-inside space-y-1" style={{ color: "#c9a8e0" }}>
            <li>Publicar conteudo envolvendo menores de idade</li>
            <li>Utilizar identidade falsa ou se passar por outra pessoa</li>
            <li>Praticar qualquer forma de assedio ou discriminacao</li>
            <li>Usar a plataforma para fins ilegais</li>
            <li>Realizar scraping ou extracao automatizada de dados</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3" style={{ color: "#C0306A" }}>4. Conteudo dos Anuncios</h2>
          <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>
            Os anunciantes sao inteiramente responsaveis pelo conteudo publicado. A ANW se reserva o direito de remover qualquer anuncio que viole estes termos ou a legislacao vigente, sem aviso previo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3" style={{ color: "#C0306A" }}>5. Pagamentos</h2>
          <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>
            Os planos pagos sao cobrados via PIX conforme descrito na pagina de precos. O anuncio so sera ativado apos confirmacao do pagamento pelo administrador. Nao realizamos reembolsos apos a ativacao do plano, exceto nos casos previstos pelo Codigo de Defesa do Consumidor.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3" style={{ color: "#C0306A" }}>6. Responsabilidade</h2>
          <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>
            A ANW atua exclusivamente como plataforma de classificados e nao se responsabiliza por negociacoes, encontros, servicos prestados ou qualquer interacao realizada entre usuarios fora da plataforma. Todo contato entre anunciante e cliente e feito diretamente pelo WhatsApp ou Telegram do anunciante.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3" style={{ color: "#C0306A" }}>7. Alteracoes nos Termos</h2>
          <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>
            Reservamo-nos o direito de atualizar estes termos a qualquer momento. O uso continuado da plataforma apos alteracoes constitui aceitacao dos novos termos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3" style={{ color: "#C0306A" }}>8. Contato</h2>
          <p className="leading-relaxed" style={{ color: "#c9a8e0" }}>
            Duvidas sobre estes termos? Entre em contato:{' '}
            <a href="mailto:contato@acompanhantesnaweb.com.br" style={{ color: "#C0306A" }}>
              contato@acompanhantesnaweb.com.br
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}