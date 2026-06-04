'use server'

import { apiAxios } from "@/lib/api"
import { Grupo } from "../types/grupo-type"
import { revalidatePath } from "next/cache"
import { isAxiosError } from 'axios';


type CreateGrupoData = Omit<Grupo, 'id' | 'crismandos' | 'animadores'>

export async function getAllGrupos(){
    const api = await apiAxios()

    const response = await api.get('/grupo/todos-grupos')

    return response.data as Grupo[];
}

export async function getGrupoById(id: string) {
    const api = await apiAxios()

    const response = await api.get(`/grupo/${id}`)

    return response.data as Grupo;  
}

export async function createGrupo(data: CreateGrupoData){
    try {
        const api = await apiAxios()

        const response = await api.post('grupo/criar-grupo', data)
        console.log("Resposta: ", response)
        revalidatePath('/dashboard/grupos')

        return {success: true, data: response.data, message: 'Grupo criado com sucesso!'}
    } catch (error: unknown) {
        let errorMessage = 'Erro desconhecido';

        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log('Mensagem de erro: ', errorMessage)
        return { success: false, message: errorMessage}
    }
}

export async function addCrismandosAoGrupo(grupoId: string, crismandosIds: string[]){
    try{
        const api = await apiAxios()

        const response = await api.patch(`/grupo/adicionar-crismandos/${grupoId}`, {crismandosIds})

        revalidatePath(`/dashboard/grupos/${grupoId}`)
        revalidatePath('/dashboard/crismandos')

        return {success: true, data: response.data, message: 'Crismandos adicionados ao grupo com sucesso!'}
    }catch(error: unknown){
        let errorMessage = 'Erro desconhecido';

        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log('Mensagem de erro: ', errorMessage)
        return { success: false, message: errorMessage}
    }
}