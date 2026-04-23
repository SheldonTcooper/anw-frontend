const requests = new Map()

export function rateLimit({ ip, limite = 5, janela = 60000 }) {
  const agora = Date.now()
  const chave = ip

  if (!requests.has(chave)) {
    requests.set(chave, { count: 1, inicio: agora })
    return { ok: true }
  }

  const dados = requests.get(chave)

  if (agora - dados.inicio > janela) {
    requests.set(chave, { count: 1, inicio: agora })
    return { ok: true }
  }

  if (dados.count >= limite) {
    const espera = Math.ceil((janela - (agora - dados.inicio)) / 1000)
    return { ok: false, espera }
  }

  dados.count++
  return { ok: true }
}
