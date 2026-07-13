import { SectionTitle } from "@/components/section-title";
import { Frequencia } from "@/features/crismandos";
import { FrequenciaItem } from "./frequencia-item";
import { CalendarX } from "lucide-react";

export function ListaFrequencia({frequencias, nomeCrismando} : {frequencias: Frequencia[], nomeCrismando: string}){
    console.log("Frequências recebidas: ", frequencias)
    
    const temFrequencias = frequencias && frequencias.length > 0;

    return(
        <div >
            <SectionTitle title={`Frequência de ${nomeCrismando}`} className="border-border" isIcon/>
            
            {!temFrequencias ? (
                <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-muted/30 border-muted-foreground/20 min-h-[300px]">
                    <div className="p-4 bg-muted rounded-full mb-4">
                        <CalendarX className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">Nenhuma frequência registrada</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mt-2">
                        Este crismando ainda não possui registros de presença ou falta cadastrados no sistema.
                    </p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {frequencias.map(frequencia => (
                        <FrequenciaItem key={frequencia.id} frequencia={frequencia} />
                    ))}
                </div>
            )}
        </div>
    )
}