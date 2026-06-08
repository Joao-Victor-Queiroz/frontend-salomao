import { SectionTitle } from "@/components/section-title";
import { Crismando } from "../types";
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, User, ShieldCheck, AlertCircle, FileText } from "lucide-react";

// Definição da estrutura de frequência localmente ou estendida no seu tipo Crismando
type Frequencia = {
    id: string;
    crismandoId: string;
    status: 'P' | 'FJ' | 'FNJ';
    dataFrequencia: string;
    justificativa?: string;
}

type Props = {
    crismando: Crismando & { frequencias?: Frequencia[] }; // Permite receber a lista de frequências
}

export function CrismandoPageDetails({ crismando }: Props) {
    console.log('Crismando:', crismando);

    // Filtra apenas os registros que são faltas (Justificadas ou Não Justificadas)
    const faltas = crismando.frequencias?.filter(f => f.status === 'FJ' || f.status === 'FNJ') || [];

    return (
        <div className="space-y-6 max-w-4xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
                <SectionTitle title={crismando.nomeCrismando} className="text-center sm:text-start"/>
                <Link 
                    href={`/dashboard/crismandos/${crismando.id}/edit`} 
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                    Editar crismando
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Dados Pessoais */}
                <Card>
                    <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg font-medium">Dados Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">Idade:</span>
                            <span className="font-semibold">{crismando.idade} anos</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">Data de Nascimento:</span>
                            <span className="font-semibold">
                                {new Date(crismando.dataNascimento).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                        <div className="flex justify-between pb-1">
                            <span className="text-muted-foreground">Telefone:</span>
                            <span className="font-semibold">{crismando.telefoneCrismando || "Não informado"}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Sacramentos */}
                <Card>
                    <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg font-medium">Sacramentos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Batizado:</span>
                            <Badge variant={crismando.batizado === "Sim" ? "default" : "secondary"}>
                                {crismando.batizado}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Primeira Eucaristia:</span>
                            <Badge variant={crismando.primeiraEucaristia === "Sim" ? "default" : "secondary"}>
                                {crismando.primeiraEucaristia}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Filiação */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">Filiação</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2 text-sm">
                        <div className="p-3 bg-muted/50 rounded-lg space-y-1">
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Mãe</p>
                            <p className="font-medium text-base">{crismando.nomeMae}</p>
                            <p className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Phone className="h-3 w-3" /> {crismando.telefoneMae || "Sem telefone"}
                            </p>
                        </div>
                        
                        <div className="p-3 bg-muted/50 rounded-lg space-y-1">
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Pai</p>
                            <p className="font-medium text-base">{crismando.nomePai || "Não informado"}</p>
                            <p className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Phone className="h-3 w-3" /> {crismando.telefonePai || "Sem telefone"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* SEÇÃO DE FALTAS */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center space-x-2">
                            <AlertCircle className="h-5 w-5 text-muted-foreground" />
                            <CardTitle className="text-lg font-medium">Histórico de Faltas</CardTitle>
                        </div>
                        <Badge variant={faltas.length > 0 ? "destructive" : "secondary"} className="font-mono">
                            {faltas.length} {faltas.length === 1 ? 'falta' : 'faltas'}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        {faltas.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                Nenhuma falta registrada. Excelente! 🎉
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {faltas.map((falta) => (
                                    <div 
                                        key={falta.id} 
                                        className={`p-3 rounded-lg border text-sm flex flex-col gap-2 transition-colors ${
                                            falta.status === 'FNJ' 
                                                ? 'bg-destructive/5 border-destructive/20' 
                                                : 'bg-muted/40 border-muted'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="h-4 w-4 shrink-0" />
                                                <span className="font-medium text-foreground">
                                                    {new Date(falta.dataFrequencia).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                                </span>
                                            </div>
                                            <Badge 
                                                variant={falta.status === 'FNJ' ? 'destructive' : 'outline'}
                                                className="text-xs font-semibold uppercase tracking-wider"
                                            >
                                                {falta.status === 'FNJ' ? 'Não Justificada' : 'Justificada'}
                                            </Badge>
                                        </div>

                                        {falta.status === 'FJ' && (
                                            <div className="mt-1 bg-background/80 p-2.5 rounded border border-dashed text-xs text-muted-foreground flex gap-1.5 items-start">
                                                <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-500" />
                                                <div>
                                                    <span className="font-semibold text-foreground block mb-0.5">Motivo/Justificativa:</span>
                                                    {falta.justificativa?.trim() ? falta.justificativa : "Sem justificativa detalhada por escrito."}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}