import * as z from 'zod';

export const addAnimadoresAoGrupoSchema = z.object({
  animadoresIds: z.array(z.string()).min(1, "Selecione pelo menos um animador"),
});

export type AddAnimadoresAoGrupoSchemaType = z.infer<typeof addAnimadoresAoGrupoSchema>;
