import * as z from 'zod';

export const frequenciaSchema = z.object({
    dataFrequencia: z.string().nonempty('Data da frequência é obrigatória'),
    frequencias: z.array(
        z.object({
            crismandoId: z.string().nonempty('O crismando é obrigatório'),
            status: z.enum(['P', 'FNJ', 'FJ']),
            justificativa: z.string().optional()
        })
    )
})


export type FrequenciaSchemaType = z.infer<typeof frequenciaSchema>