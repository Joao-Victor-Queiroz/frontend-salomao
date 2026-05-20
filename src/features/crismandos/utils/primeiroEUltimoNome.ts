

export function primeiroEUltimoNome(nomeCompleto: string): string{
    const nomeDividido = nomeCompleto.split(' ')
    const primeiroNome = nomeDividido[0]
    const ultimoNome = nomeDividido[nomeDividido.length - 1]

    return `${primeiroNome} ${ultimoNome}`
}