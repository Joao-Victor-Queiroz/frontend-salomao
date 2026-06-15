'use server'
import { apiAxios } from "@/lib/api"
import { CaixinhaSchemaType } from "../schemas/caixinha-schema";
import { isAxiosError } from 'axios';

export async function registrarCaixinhaDoCrismando(data: CaixinhaSchemaType) {
    try {
        const api = await apiAxios();

        await api.post(`/caixinha`, data);
        return {success: true, message: 'Caixinha registrada com sucesso!'}
    } catch (error: unknown) {
            let errorMessage = 'Erro desconhecido';
    
            if (isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
    
            return { success: false, message: errorMessage}
        }
}