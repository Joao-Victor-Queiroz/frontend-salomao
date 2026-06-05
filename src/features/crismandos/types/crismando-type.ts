

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
  complemento?: string; 
  bairro: string;
  cep: string;
  telefoneCrismando: string;
  nomePai: string;
  nomeMae: string;
  telefonePai?: string;
  telefoneMae?: string; 
  batizado: 'Sim' | 'Não';
  primeiraEucaristia: 'Sim' | 'Não';
  justificativa: string;
};

export type CrismandoComFrequenciaECaixinha = Crismando & {
  frequencias: Frequencia[];
};

export enum StatusFrequencia {
  P = 'P',
  FNJ = 'FNJ',
  FJ = 'FJ',
}

export type Frequencia = {
  id: string;
  crismandoId: string;
  status: StatusFrequencia;
  justificativa?: string;
  dataFrequencia: string;
}

type FrequenciaSemId = Omit<Frequencia, 'id' | 'dataFrequencia'>

export type FrequenciaPost = { 
  dataFrequencia: string;
  frequencias: FrequenciaSemId[];
}