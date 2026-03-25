export default function Privacidade() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Política de Privacidade</h1>
        <p className="text-gray-400 mb-10">Última atualização: março de 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">1. Dados que Coletamos</h2>
          <p className="text-gray-300 leading-relaxed mb-2">Coletamos os seguintes dados ao usar a ANW:</p>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Nome, e-mail e telefone fornecidos no cadastro</li>
            <li>Conteúdo dos anúncios publicados</li>
            <li>Endereço IP e dados de navegação</li>
            <li>Dados de pagamento (processados por gateway seguro — não armazenamos cartões)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">2. Como Usamos seus Dados</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Operar e melhorar a plataforma</li>
            <li>Enviar notificações sobre sua conta e anúncios</li>
            <li>Prevenir fraudes e garantir a segurança</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">3. Compartilhamento de Dados</h2>
          <p className="text-gray-300 leading-relaxed">
            Não vendemos seus dados pessoais. Podemos compartilhá-los apenas com prestadores de
            serviço essenciais (como processadores de pagamento) ou quando exigido por lei.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">4. Cookies</h2>
          <p className="text-gray-300 leading-relaxed">
            Utilizamos cookies para manter sua sessão ativa e analisar o uso da plataforma.
            Você pode desativar cookies no seu navegador, mas isso pode afetar o funcionamento
            de algumas funcionalidades.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">5. Seus Direitos (LGPD)</h2>
          <p className="text-gray-300 leading-relaxed mb-2">
            Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
            <li>Portabilidade dos dados</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">6. Retenção de Dados</h2>
          <p className="text-gray-300 leading-relaxed">
            Mantemos seus dados pelo tempo necessário para a prestação dos serviços ou conforme
            exigido por lei. Após o encerramento da conta, os dados são excluídos em até 90 dias.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">7. Segurança</h2>
          <p className="text-gray-300 leading-relaxed">
            Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo
            criptografia em trânsito (HTTPS), senhas armazenadas com hash bcrypt e acesso
            restrito ao banco de dados.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-400 mb-3">8. Contato do DPO</h2>
          <p className="text-gray-300 leading-relaxed">
            Para exercer seus direitos ou tirar dúvidas sobre privacidade:{' '}
            <a href="mailto:privacidade@anw.com.br" className="text-pink-400 hover:underline">
              privacidade@anw.com.br
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
