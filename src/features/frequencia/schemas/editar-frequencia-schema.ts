import * as z from 'zod';

export const editarFrequenciaSchema = z.object({
  status: z.enum(['P', 'FNJ', 'FJ']),
  justificativa: z.string().optional().nullable(),
});

export type EditarFrequenciaSchemaType = z.infer<typeof editarFrequenciaSchema>;
