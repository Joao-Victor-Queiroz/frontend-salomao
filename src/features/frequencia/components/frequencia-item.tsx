"use client"
import { Frequencia, StatusFrequencia } from "@/features/crismandos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Pencil } from "lucide-react";

const FREQUENCIA_CONFIGS: Record<StatusFrequencia, {
    label: string;
    containerClass: string;
    badgeClass: string;
    badgeVariant: "default" | "secondary" | "destructive" | "outline";
}> = {
    P: {
        label: "Presente",
        containerClass: "bg-emerald-500/5 border-y-emerald-500/20 border-r-emerald-500/20 border-l-emerald-500",
        badgeVariant: "outline",
        badgeClass: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/10"
    },
    FNJ: {
        label: "Falta não Justificada",
        containerClass: "bg-destructive/5 border-y-destructive/20 border-r-destructive/20 border-l-destructive",
        badgeVariant: "destructive",
        badgeClass: ""
    },
    FJ: {
        label: "Falta Justificada",
        containerClass: "bg-muted/40 border-muted border-l-muted-foreground/60",
        badgeVariant: "outline",
        badgeClass: ""
    }
};

export function FrequenciaItem({ frequencia }: { frequencia: Frequencia }) {
    const config = FREQUENCIA_CONFIGS[frequencia.status];
    const dataFormatada = new Date(frequencia.dataFrequencia).toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <div className={`p-3.5 rounded-lg border-y border-r border-l-4 text-sm flex flex-col gap-2.5 transition-colors ${config.containerClass}`}>
            <div className="flex items-center justify-between gap-4 w-full">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span className="font-semibold text-foreground">
                        {dataFormatada}
                    </span>
                </div>
                
                <div className="flex items-center gap-2">
                    <Badge 
                        variant={config.badgeVariant}
                        className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${config.badgeClass}`}
                    >
                        {config.label}
                    </Badge>
                    
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        title="Editar frequência"
                        onClick={() => {
                        }}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {frequencia.status === 'FJ' && (
                <div className="bg-background/80 p-2.5 rounded border border-dashed text-xs text-muted-foreground flex gap-1.5 items-start">
                    <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-500" />
                    <div className="wrap-break-word w-full">
                        <span className="font-semibold text-foreground block mb-0.5">Motivo/Justificativa:</span>
                        {frequencia.justificativa?.trim() ? frequencia.justificativa : "Sem justificativa detalhada por escrito."}
                    </div>
                </div>
            )}
        </div>
    );
}