import { getAllGrupos, GruposLista } from "@/features/grupos";

export default async function GruposPage(){
    const grupos = await getAllGrupos()
    
    return <GruposLista data={grupos} />
}