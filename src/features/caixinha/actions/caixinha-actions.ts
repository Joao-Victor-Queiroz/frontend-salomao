'use server'
import { apiAxios } from "@/lib/api"
import { CaixinhaSchemaType } from "../schemas/caixinha-schema";
import { isAxiosError } from 'axios';
import { revalidatePath } from "next/cache";
import { Caixinha } from "../types";

export async function registrarCaixinhaDoCrismando(data: CaixinhaSchemaType) {
    try {
        const api = await apiAxios();

        await api.post(`/caixinha`, data);
        
        revalidatePath(`/dashboard/crismandos/${data.crismandoId}`);
        revalidatePath(`/dashboard/crismandos/${data.crismandoId}/caixinha`);
        
        return { success: true, message: 'Caixinha registrada com sucesso!' }
    } catch (error: unknown) {
        let errorMessage = 'Erro desconhecido';

        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return { success: false, message: errorMessage }
    }
}

export async function obterCaixinhaPorId(id: string) {
    try {
        const api = await apiAxios();
        const response = await api.get(`/caixinha/${id}`);
        return { success: true, data: response.data as Caixinha }
    } catch (error: unknown) {
        let errorMessage = 'Erro ao buscar registro de caixinha';

        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return { success: false, message: errorMessage }
    }
}

export async function editarCaixinha(id: string, data: Partial<CaixinhaSchemaType>) {
    try {
        const api = await apiAxios();
        const response = await api.patch(`/caixinha/${id}`, data);
        
        if (data.crismandoId) {
            revalidatePath(`/dashboard/crismandos/${data.crismandoId}`);
            revalidatePath(`/dashboard/crismandos/${data.crismandoId}/caixinha`);
        }
        revalidatePath('/dashboard/crismandos');

        return { success: true, message: 'Caixinha atualizada com sucesso!', data: response.data as Caixinha }
    } catch (error: unknown) {
        let errorMessage = 'Erro ao atualizar caixinha';

        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return { success: false, message: errorMessage }
    }
}