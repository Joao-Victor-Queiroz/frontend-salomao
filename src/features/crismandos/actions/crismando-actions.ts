"use server"

import { apiAxios } from "@/lib/api"
import { CrismandoComGrupo } from "../components";
import { CrismandoSchemaType } from "../schemas";
import { revalidatePath } from "next/cache";

export async function getCrismandos(){
    const api = await apiAxios();

    const response = await api.get("/crismando/todos-crismandos");

    return response.data as CrismandoComGrupo[];
}

// export async function getCrismandos(){

    
// const cookiesStore = await cookies()

// const token = cookiesStore.get("token")?.value

//     if(!token) {
//         return { error: "Token não encontrado"};
//     }

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/crismando/todos-crismandos`, {
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//     });

//     if (!response.ok) {
//         throw new Error("Falha ao buscar crismandos")
//     }

//     console.log(response)

//     return response.json()

// }

export async function getCrismandoById(id: string){
    const api = await apiAxios();

    const response = await api.get(`/crismando/${id}`)

    return response.data as CrismandoComGrupo;
}

export async function registerCrismando(data: CrismandoSchemaType) {
    try {
        const api = await apiAxios();

        const response = await api.post('/crismando/criar-crismando', data);
        

        revalidatePath('dashboard/crismandos')
        return { success: true, data: response.data, message: 'Crismando cadastrado com sucesso!'}
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro desconhecido';

        return { success: false, message: errorMessage}
    }
}