'use server'

import { apiAxios } from "@/lib/api";
import { Usuario } from "../types";
import { revalidatePath } from "next/cache";
import { isAxiosError } from "axios";

export async function getUsuarios() {
  try {
    const api = await apiAxios();
    const response = await api.get('/auth/usuarios');
    return response.data as Usuario[];
  } catch (error: unknown) {
    console.error("Erro ao buscar usuários: ", error);
    return [];
  }
}

export async function associarAnimador(usuarioId: string, animadorId?: string | null) {
  try {
    const api = await apiAxios();
    const response = await api.patch(`/auth/usuarios/${usuarioId}/associar-animador`, {
      animadorId: animadorId || null,
    });

    revalidatePath('/dashboard/usuarios');
    revalidatePath('/dashboard/animadores');

    return { success: true, data: response.data, message: 'Associação atualizada com sucesso!' };
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido ao associar animador';

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Mensagem de erro:', errorMessage);
    return { success: false, message: errorMessage };
  }
}
