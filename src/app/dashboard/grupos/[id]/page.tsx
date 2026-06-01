import { getGrupoById } from "@/features/grupos";
import { GrupoPageDetails } from "@/features/grupos/components/grupo-page";


export default async function GrupoPage({params} :  {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const grupo = await getGrupoById(id);

    console.log("Grupo recebido: ", grupo)

    return <GrupoPageDetails grupo={grupo} />
}