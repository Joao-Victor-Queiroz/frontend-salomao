import { getCrismandoById } from "@/features/crismandos/actions";
import { HistoricoCaixinha } from "@/features/caixinha/components/historico-caixinha";
import { Caixinha } from "@/features/caixinha/types";

export default async function CaixinhaCrismandoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const crismando = await getCrismandoById(id);

    const caixinhas = (crismando as unknown as { caixinhas?: Caixinha[] }).caixinhas || [];

    return (
        <HistoricoCaixinha 
            caixinhas={caixinhas} 
            nomeCrismando={crismando.nomeCrismando} 
            crismandoId={crismando.id} 
        />
    );
}
