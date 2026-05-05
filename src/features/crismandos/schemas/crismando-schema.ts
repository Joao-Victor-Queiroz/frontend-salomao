import * as z from "zod";

export const crismandoSchema = z.object({
  nomeCrismando: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().min(11, "CPF deve conter 11 dígitos"),
  idade: z.number().int().positive(),
  dataNascimento: z.string(), // Pode-se usar .date() se estiver no formato ISO
  cidadeNascimento: z.string().min(1, "Cidade é obrigatória"),
  estadoNascimento: z.string().length(2, "Use a sigla do estado (Ex: SP)"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  numEndereco: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cep: z.string().min(8, "CEP deve conter 8 dígitos"),
  telefoneCrismando: z.string().min(10, "Telefone inválido"),
  nomePai: z.string().min(3, "Nome do pai é obrigatório"),
  nomeMae: z.string().min(3, "Nome da mãe é obrigatório"),
  telefonePai: z.string().optional(),
  telefoneMae: z.string().optional(),
  batizado: z.enum(['Sim', 'Não']),
  primeiraEucaristia: z.enum(['Sim', 'Não']),
  justificativa: z.string().max(500, "A justificativa é muito longa"),
});


export type CrismandoSchemaType = z.infer<typeof crismandoSchema>;