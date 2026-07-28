"use client"

import { useState } from "react"
import { useIsMounted } from "@/hooks/use-is-mounted"
import { CrismandoComGrupo } from "../components"
import { SectionTitle } from "@/components/section-title"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from "@/components/ui/button"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { AniversariosRelatorioPDF } from "../PDFReport/aniversarios-relatorio-pdf"
import { Cake, Calendar, Download, RefreshCw } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
    crismandos: CrismandoComGrupo[];
}

function formatarDataBr(dataStr: string) {
    if (!dataStr) return "-";
    const cleanDate = dataStr.split('T')[0];
    const parts = cleanDate.split('-');
    if (parts.length !== 3) return dataStr;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
}

function isAniversarioNoIntervalo(dataNascimento: string, startIso: string, endIso: string): boolean {
    if (!dataNascimento || !startIso || !endIso) return false;

    const bParts = dataNascimento.split('T')[0].split('-');
    const sParts = startIso.split('-');
    const eParts = endIso.split('-');

    if (bParts.length !== 3 || sParts.length !== 3 || eParts.length !== 3) return false;

    const bVal = parseInt(bParts[1], 10) * 100 + parseInt(bParts[2], 10);
    const sVal = parseInt(sParts[1], 10) * 100 + parseInt(sParts[2], 10);
    const eVal = parseInt(eParts[1], 10) * 100 + parseInt(eParts[2], 10);

    if (sVal <= eVal) {
        return bVal >= sVal && bVal <= eVal;
    } else {
        // Intervalo cruza a virada do ano (ex: 15/12 a 15/01)
        return bVal >= sVal || bVal <= eVal;
    }
}

export function AniversariosContainer({ crismandos }: Props) {
    const [dataInicial, setDataInicial] = useState<string>("")
    const [dataFinal, setDataFinal] = useState<string>("")
    const isMounted = useIsMounted()

    const datasPreenchidas = Boolean(dataInicial && dataFinal);

    const filteredCrismandos = datasPreenchidas
        ? crismandos
            .filter(c => isAniversarioNoIntervalo(c.dataNascimento, dataInicial, dataFinal))
            .sort((a, b) => {
                const partsA = a.dataNascimento.split('T')[0].split('-');
                const partsB = b.dataNascimento.split('T')[0].split('-');
                const valA = parseInt(partsA[1], 10) * 100 + parseInt(partsA[2], 10);
                const valB = parseInt(partsB[1], 10) * 100 + parseInt(partsB[2], 10);
                return valA - valB;
            })
        : [];

    const handleLimparFiltros = () => {
        setDataInicial("");
        setDataFinal("");
    }

    return (
        <div className="space-y-6">
            <SectionTitle title="Aniversariantes" />

            <div className="bg-card border rounded-lg p-4 sm:p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                    <div className="w-full sm:w-1/2 space-y-1.5">
                        <Label htmlFor="dataInicial" className="font-semibold text-sm">Data Inicial</Label>
                        <Input
                            id="dataInicial"
                            type="date"
                            value={dataInicial}
                            onChange={(e) => setDataInicial(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="w-full sm:w-1/2 space-y-1.5">
                        <Label htmlFor="dataFinal" className="font-semibold text-sm">Data Final</Label>
                        <Input
                            id="dataFinal"
                            type="date"
                            value={dataFinal}
                            onChange={(e) => setDataFinal(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    {datasPreenchidas && (
                        <Button
                            variant="outline"
                            onClick={handleLimparFiltros}
                            className="w-full sm:w-auto flex items-center gap-2"
                        >
                            <RefreshCw className="h-4 w-4" /> Limpar
                        </Button>
                    )}
                </div>
            </div>

            {!datasPreenchidas ? (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl text-center space-y-3 bg-muted/20">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Calendar className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-lg">Selecione o intervalo de datas</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        Digite a <strong>Data Inicial</strong> e a <strong>Data Final</strong> nos campos acima para visualizar os crismandos que fazem aniversário no período.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/40 p-4 rounded-lg border">
                        <div>
                            <h3 className="font-bold text-lg">Aniversariantes no Período</h3>
                            <p className="text-sm text-muted-foreground">
                                Total encontrado: <span className="font-bold text-foreground">{filteredCrismandos.length}</span> crismando(s)
                            </p>
                        </div>

                        {isMounted && (
                            <PDFDownloadLink
                                document={
                                    <AniversariosRelatorioPDF
                                        crismandos={filteredCrismandos}
                                        dataInicial={dataInicial}
                                        dataFinal={dataFinal}
                                    />
                                }
                                fileName={`aniversariantes_${dataInicial}_a_${dataFinal}.pdf`}
                                className={cn(buttonVariants({ variant: 'default' }), 'flex items-center gap-2 w-full sm:w-auto')}
                            >
                                <Download className="h-4 w-4" /> Gerar relatório PDF
                            </PDFDownloadLink>
                        )}
                    </div>

                    {filteredCrismandos.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground border rounded-lg">
                            Nenhum crismando faz aniversário no período selecionado.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredCrismandos.map((crismando) => (
                                <Card key={crismando.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-base line-clamp-1 font-bold">
                                                {crismando.nomeCrismando}
                                            </CardTitle>
                                            <Cake className="h-5 w-5 text-primary-red shrink-0" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-1 text-sm pb-4">
                                        <p><span className="font-semibold">Aniversário:</span> {formatarDataBr(crismando.dataNascimento)}</p>
                                        <p><span className="font-semibold">Idade:</span> {crismando.idade} anos</p>
                                        <p><span className="font-semibold">Grupo:</span> {crismando.nomeGrupo || "Sem grupo"}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/dashboard/crismandos/${crismando.id}`} className={cn(buttonVariants({ variant: 'outline' }), 'w-full text-xs')}>
                                            Ver detalhes
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
