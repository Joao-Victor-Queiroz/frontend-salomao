import * as z from "zod";

export const frequenciaAnimadorItemSchema = z.object({
  animadorId: z.string(),
  tipo: z.enum(["FORMACAO", "ENCONTRO"]),
  status: z.enum(["P", "FNJ", "FJ"]),
  justificativa: z.string().nullable().optional(),
});

export const registrarFrequenciaAnimadoresSchema = z.object({
  dataFrequencia: z.string().min(1, "A data da frequência é obrigatória"),
  tipoGeral: z.enum(["FORMACAO", "ENCONTRO"], {
    error: "Selecione o tipo da frequência (Formação ou Encontro)",
  }),
  frequencias: z.array(frequenciaAnimadorItemSchema),
});

export type RegistrarFrequenciaAnimadoresSchemaType = z.infer<
  typeof registrarFrequenciaAnimadoresSchema
>;
