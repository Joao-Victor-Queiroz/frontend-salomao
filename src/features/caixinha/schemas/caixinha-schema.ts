import * as z from 'zod';

export const caixinhaSchema = z.object({
    crismandoId: z.string().min(1, 'Selecione um crismando'),
    valorPago: z.coerce.number().min(0.01, 'Valor mínimo de R$ 0,01'),
    dataPagamento: z.coerce.date(),
})

export type CaixinhaSchema = z.infer<typeof caixinhaSchema>