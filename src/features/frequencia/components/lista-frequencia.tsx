import { SectionTitle } from "@/components/section-title";
import { Frequencia } from "@/features/crismandos";
import { FrequenciaItem } from "./frequencia-item";

export function ListaFrequencia({frequencias, nomeCrismando} : {frequencias: Frequencia[], nomeCrismando: string}){
    return(
        <div>
            <SectionTitle title={`Frequência de ${nomeCrismando}`} className="border-border" isIcon/>
            {frequencias.map(frequencia => (
                <FrequenciaItem key={frequencia.id} frequencia={frequencia} />
            ))}
        </div>
    )
}