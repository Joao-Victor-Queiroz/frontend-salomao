import { getCrismandos } from "@/features/crismandos"
import { ListaCrismandos } from "@/features/crismandos/components/lista-crismandos"

export default async function CrismandosPage({
    searchParams,
} : {searchParams : Promise<{page?: string; limit?: string;}>}) {

    const params = await searchParams;

    const page = Number(params?.page) || 1;
    const limit = Number(params?.limit) || 10;

    const crismandos = await getCrismandos({page, limit})
    console.log("Crismandos encontrados: ", crismandos)

    return <ListaCrismandos crismandos={crismandos}/>
}