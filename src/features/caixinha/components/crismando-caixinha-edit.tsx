'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { caixinhaSchema, CaixinhaSchemaType } from "@/features/caixinha/schemas/caixinha-schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editarCaixinha } from "@/features/caixinha/actions/caixinha-actions";
import { useTransition, useState } from "react";
import { Pencil } from "lucide-react"; 
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Caixinha } from "../types";

type Props = {
    caixinha: Caixinha;
}

export function CrismandoCaixinhaEdit({ caixinha }: Props) {
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    // Formatar a data para YYYY-MM-DD para preencher o input type="date"
    const dataFormatada = caixinha.dataPagamento 
        ? caixinha.dataPagamento.split('T')[0] 
        : new Date().toISOString().split('T')[0];

    const { register, handleSubmit, formState: { errors } } = useForm<CaixinhaSchemaType>({
        resolver: zodResolver(caixinhaSchema),
        defaultValues: {
            crismandoId: caixinha.crismandoId,
            valorPago: caixinha.valorPago,
            dataPagamento: dataFormatada,
        }
    });

    const onSubmit: SubmitHandler<CaixinhaSchemaType> = (data) => {
        startTransition(async () => {
            const result = await editarCaixinha(caixinha.id, data);

            if (result.success) {
                toast.success(result.message);
                setIsOpen(false);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                <Pencil className="h-4 w-4 mr-1" />
                Editar
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar Pagamento de Caixinha</DialogTitle>
                    <DialogDescription>
                        Altere os detalhes do pagamento de caixinha do crismando.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <input type="hidden" {...register("crismandoId")} />

                    {/* Valor Pago */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="valorPago" className="text-sm font-medium">Valor Pago (R$)</label>
                        <input
                            id="valorPago"
                            type="number"
                            step="0.01"
                            disabled={isPending}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...register("valorPago", { valueAsNumber: true })}
                        />
                        {errors.valorPago && (
                            <span className="text-xs text-red-500">{errors.valorPago.message}</span>
                        )}
                    </div>

                    {/* Data do Pagamento */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="dataPagamento" className="text-sm font-medium">Data do Pagamento</label>
                        <input
                            id="dataPagamento"
                            type="date"
                            disabled={isPending}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...register("dataPagamento")}
                        />
                        {errors.dataPagamento && (
                            <span className="text-xs text-red-500">{errors.dataPagamento.message}</span>
                        )}
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isPending}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
