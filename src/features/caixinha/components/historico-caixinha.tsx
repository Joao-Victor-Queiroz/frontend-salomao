'use client'

import { SectionTitle } from "@/components/section-title";
import { Caixinha } from "../types";
import { CrismandoCaixinhaEdit } from "./crismando-caixinha-edit";
import { CrismandoCaixinhaRegister } from "@/features/crismandos/components/crismando-caixinha-register";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Coins, Calendar, Wallet, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    caixinhas: Caixinha[];
    nomeCrismando: string;
    crismandoId: string;
}

export function HistoricoCaixinha({ caixinhas = [], nomeCrismando, crismandoId }: Props) {
    const totalPago = caixinhas.reduce((acc, curr) => acc + Number(curr.valorPago || 0), 0);
    const temRegistros = caixinhas && caixinhas.length > 0;

    const totalFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(totalPago);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link 
                        href={`/dashboard/crismandos/${crismandoId}`}
                        className={buttonVariants({ variant: "outline", size: "icon" })}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <SectionTitle title={`Histórico de Caixinha - ${nomeCrismando}`} isIcon />
                </div>
                <CrismandoCaixinhaRegister crismandoId={crismandoId} />
            </div>

            {/* Card com Resumo do Total Pago */}
            <Card className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Pago Acumulado
                    </CardTitle>
                    <Wallet className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                        {totalFormatado}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        {caixinhas.length} {caixinhas.length === 1 ? 'pagamento registrado' : 'pagamentos registrados'}
                    </p>
                </CardContent>
            </Card>

            {/* Lista de Lançamentos */}
            {!temRegistros ? (
                <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-muted/30 border-muted-foreground/20 min-h-[250px]">
                    <div className="p-4 bg-muted rounded-full mb-4">
                        <Coins className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">Nenhum pagamento registrado</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mt-2">
                        Este crismando ainda não possui lançamentos de caixinha cadastrados.
                    </p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {caixinhas.map((item) => {
                        const valorItemFormatado = new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(item.valorPago));

                        const dataFormatada = item.dataPagamento
                            ? new Date(item.dataPagamento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : 'Data não informada';

                        return (
                            <div 
                                key={item.id} 
                                className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-full shrink-0">
                                        <Coins className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-base text-foreground">
                                            {valorItemFormatado}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>Pago em: {dataFormatada}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 justify-end">
                                    <CrismandoCaixinhaEdit caixinha={item} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
