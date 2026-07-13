import { buscarFrequenciasPorCrismando } from "@/features/frequencia/actions/frequencia-actios";
import { ListaFrequencia } from "@/features/frequencia/components/lista-frequencia";

export default async function FrequenciaCrismandoPage({params} : {params: Promise<{id: string}>}){
    const {id} = await params;
    const frequencias = await buscarFrequenciasPorCrismando(id);

    return <ListaFrequencia frequencias={frequencias.data} nomeCrismando={frequencias.data.nomeCrismando} />
}