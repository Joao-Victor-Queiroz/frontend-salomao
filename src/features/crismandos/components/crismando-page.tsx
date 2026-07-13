'use client'
import { SectionTitle } from "@/components/section-title";
import { Crismando } from "../types";
import Link from 'next/link';
import { buttonVariants, Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, User, ShieldCheck, AlertCircle, FileText, Trash } from "lucide-react";
import { useAuth } from "@/features/auth";
import {Cargo} from '@/features/auth/types/enum-cargo'
import { ConfirmarAcaoDialog } from "@/components/confirmar-acao-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { apagarCrismando } from "../actions";
import { useRouter } from "next/navigation";
import {CrismandoCaixinhaRegister} from "@/features/crismandos/components/crismando-caixinha-register";

type Frequencia = {
    id: string;
    crismandoId: string;
    status: 'P' | 'FJ' | 'FNJ';
    dataFrequencia: string;
    justificativa?: string;
}

type Props = {
    crismando: Crismando & { frequencias?: Frequencia[] };
}

export function CrismandoPageDetails({ crismando }: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isLoadingRemocao, setIsLoadingRemocao] = useState<boolean>(false);

    const faltas = crismando.frequencias?.filter(f => f.status === 'FJ' || f.status === 'FNJ') || [];
    const { user } = useAuth();
    const doesCargoMatches = user?.cargo === Cargo.COORDENADOR_FREQUENCIA || user?.cargo === Cargo.FORMADOR;
    const router = useRouter();

    async function handleApagarCrismando(idCrismando: string) {
        setIsLoadingRemocao(true);

        const response = await apagarCrismando(idCrismando);
        setIsLoadingRemocao(false);
        
        if(!response.success){
            toast.error(response.message);
            return;
        }

        toast.success(response.message);
        setIsDialogOpen(false);
        router.push('/dashboard/crismandos')
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
                <SectionTitle isIcon title={crismando.nomeCrismando} className="text-center sm:text-start"/>
                <nav className="flex flex-col gap-4 sm:flex-row">
                    <Link 
                        href={`/dashboard/crismandos/${crismando.id}/edit`} 
                        className={buttonVariants({ variant: "default" })}
                    >
                        Editar crismando
                    </Link>
                    <Link 
                        href={`/dashboard/crismandos/${crismando.id}/frequencia`} 
                        className={buttonVariants({ variant: "default" })}
                    >
                        Frequência completa
                    </Link>
                    <CrismandoCaixinhaRegister crismandoId={crismando.id} />
                    {
                        doesCargoMatches && (
                            <Button className='bg-primary-red' onClick={() => setIsDialogOpen(true)}>
                                <Trash />
                                Apagar crismando
                            </Button>
                        )
                    }
                </nav>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
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
                                        className={`p-3 rounded-lg border-y border-r border-l-4 text-sm flex flex-col gap-2 transition-colors ${
                                            falta.status === 'FNJ' 
                                                ? 'bg-destructive/5 border-y-destructive/20 border-r-destructive/20 border-l-destructive' 
                                                : 'bg-muted/40 border-muted border-l-muted-foreground/60'
                                        }`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-2 w-full">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="h-4 w-4 shrink-0" />
                                                <span className="font-medium text-foreground">
                                                    {new Date(falta.dataFrequencia).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                                </span>
                                            </div>
                                            <Badge 
                                                variant={falta.status === 'FNJ' ? 'destructive' : 'outline'}
                                                className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                                            >
                                                {falta.status === 'FNJ' ? 'Não Justificada' : 'Justificada'}
                                            </Badge>
                                        </div>

                                        {falta.status === 'FJ' && (
                                            <div className="mt-1 bg-background/80 p-2.5 rounded border border-dashed text-xs text-muted-foreground flex gap-1.5 items-start">
                                                <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-500" />
                                                <div className="wrap-break-word w-full">
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
              <ConfirmarAcaoDialog 
                open={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)} 
                onConfirmar={() => handleApagarCrismando(crismando.id)} 
                titulo="Apagar crismando"
                descricao="Tem certeza que deseja apagar o crismando? Essa ação não pode ser revertida!"
            />
        </div>
    );
}