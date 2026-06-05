import { getGrupoById } from "@/features/grupos/actions";
import { FrequenciaForm } from "@/features/grupos/components/frequencia-form";


export default async function FrequenciaPage({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id;
    const grupo = await getGrupoById(id);

    console.log('Dados do grupo no page', grupo)

    return <FrequenciaForm crismandos={grupo.crismandos} idGrupo={id} />
}