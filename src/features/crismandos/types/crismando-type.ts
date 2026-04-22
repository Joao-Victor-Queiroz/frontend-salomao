

export type Crismando = {
id: string;
  nomeCrismando: string;
  cpf: string;
  idade: number;
  dataNascimento: string; 
  cidadeNascimento: string;
  estadoNascimento: string;
  endereco: string;
  numEndereco: string;
  complemento?: string; // Opcional
  bairro: string;
  cep: string;
  telefoneCrismando: string;
  nomePai: string;
  nomeMae: string;
  telefonePai?: string; // Opcional
  telefoneMae?: string; // Opcional
  batizado: 'Sim' | 'Não';
  primeiraEucaristia: 'Sim' | 'Não';
  justificativa: string;
};
