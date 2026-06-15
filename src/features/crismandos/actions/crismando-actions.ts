"use server"

import { apiAxios } from "@/lib/api"
import { CrismandoComGrupo } from "../components";
import { CrismandoSchemaType } from "../schemas";
import { revalidatePath } from "next/cache";
import { isAxiosError } from 'axios';


export async function getCrismandos(){
    const api = await apiAxios();

    const response = await api.get("/crismando/todos-crismandos");

    return response.data as CrismandoComGrupo[];
}

export async function getCrismandosSemGrupo(){
    const api = await apiAxios();

    const response = await api.get('/crismando/crismandos-sem-grupo')

    return response.data as CrismandoComGrupo[];
}


export async function getCrismandoById(id: string){
    const api = await apiAxios();

    const response = await api.get(`/crismando/${id}`)

    return response.data as CrismandoComGrupo;
}

export async function apagarCrismando(idCrismando: string){
   try {
        const api = await apiAxios();

        await api.delete(`/crismando/remover-crismando/${idCrismando}`)

        revalidatePath('dashboard/crismandos')
        return {success: true, message: 'Crismando deletado com sucesso.'}
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

export async function registerCrismando(data: CrismandoSchemaType) {
    try {
        const api = await apiAxios();

        const response = await api.post('/crismando/criar-crismando', data);
        

        revalidatePath('dashboard/crismandos')
        return { success: true, data: response.data, message: 'Crismando cadastrado com sucesso!'}
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

export async function editCrismando(data: CrismandoSchemaType, id: string){
    try{
        const api = await apiAxios();

        const response = await api.patch(`/crismando/atualizar-crismando/${id}`, data)

        revalidatePath('dashboard/crismandos')
        return { success: true, data: response.data, message: 'Crismando atualizado com sucesso!'}
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