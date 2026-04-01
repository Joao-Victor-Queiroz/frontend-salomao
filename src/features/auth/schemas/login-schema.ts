import * as z from "zod";

export const LoginSchemaForm = z.object({
  email: z.email("E-mail inválido!"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres!"),
});

export type LoginSchemaFormType = z.infer<typeof LoginSchemaForm>;
