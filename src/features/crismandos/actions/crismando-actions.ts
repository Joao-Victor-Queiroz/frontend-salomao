"use server"

import { cookies } from "next/headers"
import { apiAxios } from "@/lib/api"
import { CrismandoComGrupo } from "../components";


export async function getCrismandos(query?: {page?: number, limit?: number}){
    const api = await apiAxios();

    const response = await api.get("/crismando/todos-crismandos", {params: query});

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