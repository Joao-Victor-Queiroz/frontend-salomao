import * as z from 'zod';

export const caixinhaSchema = z.object({
    crismandoId: z.string().min(1, 'Selecione um crismando'),
    valorPago: z.number().min(0.01, 'Valor mínimo de R$ 0,01'),
    dataPagamento: z.string().min(1, 'Data do pagamento é obrigatória')
})

export type CaixinhaSchemaType = z.infer<typeof caixinhaSchema>