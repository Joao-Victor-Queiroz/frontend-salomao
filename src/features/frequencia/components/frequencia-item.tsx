import { Frequencia, StatusFrequencia } from "@/features/crismandos";

const FREQUENCIA_STYLES : Record<StatusFrequencia, {label: string, className: string}> = {
    P: {label: "Presente", className: "text-green-600 border-green-600"},
    FNJ: {label: "Falta não justificada", className: "text-red-600 border-red-600"},
    FJ: {label: "Falta justificada", className: "text-yellow-600 border-yellow-600"}
}

export function FrequenciaItem({frequencia} : {frequencia: Frequencia}){
   const style = FREQUENCIA_STYLES[frequencia.status]
   const dataFormatada = new Date(frequencia.dataFrequencia).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
   })

    return(
        <div className="flex items-center">
            <h4 className="flex-1 font-medium">{dataFormatada}</h4>
            <p className={`border-b ${style.className}`}>{style.label}</p>
        </div>
    )
}