import { buscarFrequenciasPorCrismando } from "@/features/frequencia/actions/frequencia-actions";
import { ListaFrequencia } from "@/features/frequencia/components/lista-frequencia";

export default async function FrequenciaCrismandoPage({params} : {params: Promise<{id: string}>}){
    const {id} = await params;
    const frequencias = await buscarFrequenciasPorCrismando(id);


    return <ListaFrequencia frequencias={frequencias.data?.frequencias} nomeCrismando={frequencias.data.nomeCrismando}/>
}