import { getCrismandos } from "@/features/crismandos"
import { ListaCrismandos } from "@/features/crismandos/components/lista-crismandos"

export default async function CrismandosPage() {

    const crismandos = await getCrismandos()
    console.log("Crismandos encontrados: ", crismandos)

    return <ListaCrismandos crismandos={crismandos}/>
}