import { getCrismandoById } from "@/features/crismandos";
import { CrismandoPageDetails } from "@/features/crismandos/components/crismando-page";

export default async function CrismandoPage({params} : {params: Promise<{id: string}>}) {
    const { id } = await params;

    const crismando = await getCrismandoById(id);

    return <CrismandoPageDetails crismando={crismando}/>
}