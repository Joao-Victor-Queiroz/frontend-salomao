import * as z from "zod";
import { Cargo } from "@/features/auth";

export const animadorSchema = z.object({
  nomeAnimador: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cargo: z.enum(Cargo, { error: "Selecione um ministério/cargo" }),
  dataNascimento: z.string().min(1, "A data de nascimento é obrigatória"),
  associarUsuario: z.boolean().optional(),
  usuarioId: z.string().optional(),
}).refine((data) => {
  if (data.associarUsuario && (!data.usuarioId || data.usuarioId.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Por favor, selecione um usuário para associar",
  path: ["usuarioId"],
});

export type AnimadorSchemaType = z.infer<typeof animadorSchema>;

export const updateAnimadorSchema = z.object({
  nomeAnimador: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
  cargo: z.nativeEnum(Cargo).optional(),
  dataNascimento: z.string().optional(),
  grupoAnimadorId: z.string().nullable().optional(),
  grupoCrismandoId: z.string().nullable().optional(),
});

export type UpdateAnimadorSchemaType = z.infer<typeof updateAnimadorSchema>;
