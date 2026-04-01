import * as z from 'zod';

export const UserSchemaForm = z.object({
    nome: z.string().min(2, "O nome deve conter no mínimo 2 caracteres!"),
    email: z.email("E-mail inválido!"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres!"),
    cargo: z.enum
})