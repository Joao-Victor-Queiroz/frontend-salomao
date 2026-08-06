'use server'

import { apiAxios } from "@/lib/api";
import { Animador } from "../types";
import { AnimadorSchemaType, UpdateAnimadorSchemaType } from "../schemas";
import { revalidatePath } from "next/cache";
import { isAxiosError } from "axios";

export async function getAnimadores() {
  try {
    const api = await apiAxios();
    const response = await api.get('/animadores');
    return response.data as Animador[];
  } catch (error: unknown) {
    console.error("Erro ao buscar animadores: ", error);
    return [];
  }
}

export async function getAnimadorById(id: string) {
  try {
    const api = await apiAxios();
    const response = await api.get(`/animadores/${id}`);
    return response.data as Animador;
  } catch (error: unknown) {
    console.error(`Erro ao buscar animador ${id}: `, error);
    return null;
  }
}

export async function createAnimador(data: AnimadorSchemaType) {
  try {
    const api = await apiAxios();

    const payload: {
      nomeAnimador: string;
      cargo: string;
      dataNascimento: string;
      usuarioId?: string;
    } = {
      nomeAnimador: data.nomeAnimador,
      cargo: data.cargo,
      dataNascimento: data.dataNascimento,
    };

    if (data.associarUsuario && data.usuarioId) {
      payload.usuarioId = data.usuarioId;
    }

    const response = await api.post('/animadores/criar-animador', payload);
    revalidatePath('/dashboard/animadores');
    revalidatePath('/dashboard/usuarios');

    return { success: true, data: response.data, message: 'Animador criado com sucesso!' };
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido ao criar animador';

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Mensagem de erro:', errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function updateAnimador(id: string, data: UpdateAnimadorSchemaType) {
  try {
    const api = await apiAxios();

    const response = await api.patch(`/animadores/atualizar-animador/${id}`, data);
    revalidatePath('/dashboard/animadores');
    revalidatePath(`/dashboard/animadores/${id}`);

    return { success: true, data: response.data, message: 'Animador atualizado com sucesso!' };
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido ao atualizar animador';

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Mensagem de erro:', errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function deleteAnimador(id: string) {
  try {
    const api = await apiAxios();

    await api.delete(`/animadores/remover-animador/${id}`);
    revalidatePath('/dashboard/animadores');

    return { success: true, message: 'Animador removido com sucesso!' };
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido ao remover animador';

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('Mensagem de erro:', errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function registrarFrequenciaAnimadores(data: {
  dataFrequencia: string;
  frequencias: Array<{
    animadorId: string;
    tipo: "FORMACAO" | "ENCONTRO";
    status: "P" | "FNJ" | "FJ";
    justificativa?: string | null;
  }>;
}) {
  try {
    const api = await apiAxios();

    const response = await api.post("/frequencia/frequencia-animadores", data);
    revalidatePath("/dashboard/animadores");

    return {
      success: true,
      data: response.data,
      message: "Frequência dos animadores registrada com sucesso!",
    };
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido ao registrar frequência dos animadores";

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Mensagem de erro:", errorMessage);
    return { success: false, message: errorMessage };
  }
}

