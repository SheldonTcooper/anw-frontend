export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Termos de Uso</h1>
        <p className="text-gray-400 mb-10">Última atualização: março de 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">1. Aceitação dos Termos</h2>
          <p className="text-gray-300 leading-relaxed">
            Ao acessar e utilizar a plataforma AcompanhantesNaWeb (ANW), você concorda com estes
            Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize nossa plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">2. Elegibilidade</h2>
          <p className="text-gray-300 leading-relaxed">
            O uso desta plataforma é restrito a maiores de 18 anos. Ao se cadastrar, você declara
            ter idade legal para acessar conteúdo adulto conforme a legislação vigente em seu país.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">3. Uso da Plataforma</h2>
          <p className="text-gray-300 leading-relaxed mb-2">É expressamente proibido:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Publicar conteúdo envolvendo menores de idade</li>
            <li>Utilizar identidade falsa ou se passar por outra pessoa</li>
            <li>Praticar qualquer forma de assédio ou discriminação</li>
            <li>Usar a plataforma para fins ilegais</li>
            <li>Realizar scraping ou extração automatizada de dados</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">4. Conteúdo dos Anúncios</h2>
          <p className="text-gray-300 leading-relaxed">
            Os anunciantes são inteiramente responsáveis pelo conteúdo publicado. A ANW se reserva o
            direito de remover qualquer anúncio que viole estes termos ou a legislação vigente, sem
            aviso prévio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">5. Pagamentos</h2>
          <p className="text-gray-300 leading-relaxed">
            Os planos pagos são cobrados conforme descrito na página de preços. Não realizamos
            reembolsos após a ativação do plano, exceto nos casos previstos pelo Código de Defesa
            do Consumidor.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">6. Limitação de Responsabilidade</h2>
          <p className="text-gray-300 leading-relaxed">
            A ANW atua como plataforma intermediária e não se responsabiliza por negociações,
            encontros ou qualquer interação realizada entre usuários fora da plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">7. Alterações nos Termos</h2>
          <p className="text-gray-300 leading-relaxed">
            Reservamo-nos o direito de atualizar estes termos a qualquer momento. O uso continuado
            da plataforma após alterações constitui aceitação dos novos termos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">8. Contato</h2>
          <p className="text-gray-300 leading-relaxed">
            Dúvidas sobre estes termos? Entre em contato:{' '}
            <a href="mailto:contato@anw.com.br" className="text-pink-400 hover:underline">
              contato@anw.com.br
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
