import { CrismandoForm } from "@/features/crismandos/components/crismando-form";
import { getCrismandoById } from "@/features/crismandos";

export default async function CrismandoEditPage({params} : {params: Promise<{id: string}>}){
    const { id } = await params;

    const crismando = await getCrismandoById(id);
    
    return <CrismandoForm type="EDIT" initialValues={crismando} />
}