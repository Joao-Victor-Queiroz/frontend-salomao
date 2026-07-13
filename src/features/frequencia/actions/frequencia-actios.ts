"use server"
import { apiAxios } from "@/lib/api"
import { isAxiosError } from "axios"

export async function buscarFrequenciasPorCrismando(idCrismando: string){
    try {
        const api = await apiAxios();
        const response = await api.get(`/frequencia?crismandoId=${idCrismando}`)

        return { success: true, data: response.data}
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