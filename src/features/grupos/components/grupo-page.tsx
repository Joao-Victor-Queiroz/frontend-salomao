'use client'
import { SectionTitle } from "@/components/section-title";
import { Grupo } from "../types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger,DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Crismando } from "@/features/crismandos";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCrismandosSemGrupo } from "@/features/crismandos";
import { Button } from "@/components/ui/button";
import { addCrismandosAoGrupo, removeCrismandoDoGrupo } from "../actions";
import { cn } from "@/lib/utils";
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash } from "lucide-react";
import { ConfirmarAcaoDialog } from "@/components/confirmar-acao-dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { GrupoRelatorioPDF } from "../PDFReport/grupo-relatorio-pdf";
import { useIsMounted } from "@/hooks/use-is-mounted";

import { AddAnimadoresDialog } from "./add-animadores-dialog";
import { formatCargo } from "@/features/animador";

type Props = {
    grupo: Grupo;
}

export function GrupoPageDetails({ grupo } : Props){
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [crismandoSelecionadoId, setCrismandoSelecionadoId] = useState<string | null>(null);
    const isMounted = useIsMounted();

    const animadoresDoGrupo = Array.from(
        new Map((grupo.animadoresMinisterio || grupo.animadores || []).map(a => [a.id, a])).values()
    );
    const crismandosDoGrupo = Array.from(
        new Map((grupo.crismandos || []).map(c => [c.id, c])).values()
    );

    const handleRemoverCrismando = async({grupoId, crismandoId}: {grupoId: string, crismandoId: string}) => {
        setIsLoading(true)

        const response = await removeCrismandoDoGrupo(grupoId, crismandoId);

        setIsLoading(false);
        setOpenDialog(false);

        if(!response.success){
            toast.error(`${response.message}`)
            return;
        }

        toast.success(`${response.message}`)

    }
    return(
        <main>
            <SectionTitle isIcon title={grupo.nomeGrupo}/>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <AddCrismandosDialog grupoId={grupo.id}/>
                <AddAnimadoresDialog grupoId={grupo.id}/>
                {isMounted && (
                    <PDFDownloadLink document={<GrupoRelatorioPDF grupo={grupo} />} fileName={`relatorio-grupo-${grupo.nomeGrupo.toLowerCase().replace(/\s+/g, '')}_${new Date().toISOString().split('T')[0]}.pdf`} className={cn(buttonVariants({variant:'default'}), 'flex items-center gap-2')}>
                     Gerar relatório
                    </PDFDownloadLink>
                )}
                <Link href={`/dashboard/grupos/${grupo.id}/frequencia`} className={buttonVariants()}>Registrar Frequência</Link>
            </div>

            <div>
                <h3 className='font-bold mt-8 text-2xl'>Animadores</h3>
                <div className='grid grid-cols-2 mt-4 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                    {animadoresDoGrupo.length === 0 && <p className="text-muted-foreground col-span-full">Nenhum animador no grupo.</p>}

                    {animadoresDoGrupo.map((animador, index) => (
                        <Card key={`animador-${animador.id}-${index}`}>
                            <CardHeader>
                                <CardTitle className='line-clamp-1'>{animador.nomeAnimador}</CardTitle>
                                <Badge variant="outline" className="w-fit mt-1">{formatCargo(animador.cargo)}</Badge>
                            </CardHeader>
                            <CardFooter>
                                <Link href={`/dashboard/animadores/${animador.id}`} className={cn(buttonVariants({ variant: "outline" }), 'w-full text-xs')}>
                                    Ver detalhes
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h3 className='font-bold mt-8 text-2xl'>Crismandos</h3>
                <div className='grid grid-cols-2 mt-4 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                    {crismandosDoGrupo.length === 0 && <p>Nenhum crismando no grupo.</p>}

                    {crismandosDoGrupo.map((crismando, index) => {
                        const numeroFaltas = crismando.frequencias?.filter(frequencia => frequencia.status !== 'P').length || 0;
                    return (
                        <Card key={`crismando-${crismando.id}-${index}`}>
                            <CardHeader>
                                <CardTitle className='line-clamp-1'>{crismando.nomeCrismando}</CardTitle>
                                {numeroFaltas < 4 ?(
                                    <Badge className="bg-green-500">{numeroFaltas} falta(s)</Badge>
                                ): numeroFaltas < 6 ? (
                                    <Badge className="bg-yellow-500">{numeroFaltas} falta(s)</Badge>
                                ) : (
                                    <Badge className="bg-red-500">{numeroFaltas} falta(s)</Badge>
                                )}
                            </CardHeader>
                            <CardContent>
                                <p>{crismando.idade} anos</p>
                                <p>Batizado: {crismando.batizado}</p>
                                <p>Eucaristia: {crismando.primeiraEucaristia}</p>
                            </CardContent>
                            <CardFooter className='flex flex-col gap-2 justify-between lg:flex-row'>
                                <Link href={`/dashboard/crismandos/${crismando.id}`} className={cn(buttonVariants(), 'w-full lg:w-auto')}>Ver detalhes</Link>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        setCrismandoSelecionadoId(crismando.id);
                                        setOpenDialog(true);
                                    }}
                                    className='w-full lg:w-auto'
                                >  
                                    <Trash />
                                </Button>
                            </CardFooter>
                        </Card>
                    )})}

                </div>
            </div>
            <ConfirmarAcaoDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                isLoading={isLoading}
                titulo="Remover crismando do grupo"
                descricao="Tem certeza que deseja remover este crismando do grupo? Ele não será excluído do sistema."
                onConfirmar={() => {
                    if (!crismandoSelecionadoId) return;
                    handleRemoverCrismando({ grupoId: grupo.id, crismandoId: crismandoSelecionadoId });
                }}
            />
        </main>
    )
}

type DialogProps = {
    grupoId: string;
}

const addCrismandosAoGrupoSchema = z.object({
    crismandosIds: z.array(z.string()).min(1, "Selecione pelo menos um crismando"),
})

type CrismandoAoGrupoSchemaType = z.infer<typeof addCrismandosAoGrupoSchema>

export function AddCrismandosDialog({ grupoId} : DialogProps) {
    const [open, setOpen] = useState(false);
    const [crismandosSelecionados, setCrismandosSelecionados] = useState<string[]>([]);
    const [crismandosData, setCrismandosData] = useState<Crismando[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false)
    const {handleSubmit, setValue, clearErrors,formState: {errors, isSubmitting}} = useForm<CrismandoAoGrupoSchemaType>({
        resolver: zodResolver(addCrismandosAoGrupoSchema),
        defaultValues: {
            crismandosIds: [],
        }
    })

    const router = useRouter();

    useEffect(() => {
        setValue("crismandosIds", crismandosSelecionados);
        if (crismandosSelecionados.length > 0) {
            clearErrors("crismandosIds");
        }
    }, [crismandosSelecionados, open, setValue, clearErrors])

    useEffect(() => {
       if(!open) {
        setCrismandosSelecionados([]);
        return;
       }

       async function fetchCrismandosLivres(){
        try {
            setIsLoadingData(true)
            const response = await getCrismandosSemGrupo();
            setCrismandosData(response)
        } catch (error) {
            
        }
        finally{
            setIsLoadingData(false)
        }
       }

       fetchCrismandosLivres();
    }, [open])

    function handleDesmarcarTodos(){
        setCrismandosSelecionados([]);
    }

    const onSubmit = async(data: CrismandoAoGrupoSchemaType) => {
        const result = await addCrismandosAoGrupo(grupoId, data.crismandosIds);

        if(!result.success){
            toast.error(`${result.message}`)
            return;
        }

        toast.success(`${result.message}`)
        setOpen(false);
        setCrismandosSelecionados([]);
        setCrismandosData([]);
        router.refresh();
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={buttonVariants({variant:'default'})}>
                Adicionar crismandos
            </DialogTrigger>
            <DialogContent className='max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Adicionar crismandos ao grupo</DialogTitle>
                </DialogHeader>
                <Button onClick={handleDesmarcarTodos} variant={"destructive"} size={"sm"}>
                    Desmarcar todos
                </Button>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        Crismandos selecionados: <span className="text-foreground font-bold">{crismandosSelecionados.length}</span>
                    </p>
                  <div className="bg-muted/50 w-full min-h-12 rounded-md p-2 mt-2 flex flex-wrap items-center gap-2 border border-dashed">
    {crismandosSelecionados.length === 0 ? (
        <span className="text-xs text-muted-foreground px-2">Nenhum selecionado</span>
    ) : (
        <>
            {crismandosSelecionados.slice(0, 3).map((id, index) => {
                const crismando = crismandosData.find(c => c.id === id);
                if (!crismando) return null;
                
                return (
                    <div 
                        key={`crismando-badge-${id}-${index}`} 
                        className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                    >
                        {crismando.nomeCrismando}
                        <button 
                            type="button"
                            className="hover:bg-primary/20 rounded-full w-4 h-4 inline-flex items-center justify-center font-bold"
                            onClick={() => setCrismandosSelecionados(prev => prev.filter(item => item !== id))}
                        >
                            ×
                        </button>
                    </div>
                );
            })}

            {crismandosSelecionados.length > 3 && (
                <div className="inline-flex items-center bg-muted text-muted-foreground border border-neutral-300 dark:border-neutral-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap cursor-default hover:bg-muted/80" title="Clique no botão Fechar ou desmarque na lista abaixo para gerenciar">
                    +{crismandosSelecionados.length - 3} ...
                </div>
            )}
        </>
    )}
</div>
                </div>
                <ScrollArea className='max-h-[30vh] md:max-h-[45vh] pr-2'>
    {isLoadingData ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm">Buscando crismandos disponíveis...</p>
        </div>
    ) : crismandosData.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground">
            Nenhum crismando sem grupo encontrado.
        </div>
    ) : (
        crismandosData.map((crismando, index) => (
            <div key={`crismando-option-${crismando.id}-${index}`} className='flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md'>
                <Checkbox
                    id={crismando.id}
                    disabled={isSubmitting}
                    checked={crismandosSelecionados.includes(crismando.id)}
                    onCheckedChange={(checked) => {
                        setCrismandosSelecionados(prev => 
                            checked ? [...prev, crismando.id] : prev.filter(id => id !== crismando.id)
                        )
                    }}
                />
                <div className='flex justify-between w-full select-none'>
                    <label htmlFor={crismando.id} className="font-semibold cursor-pointer text-sm">
                        {crismando.nomeCrismando}
                    </label>
                    <span className="text-sm text-muted-foreground">{crismando.idade} anos</span>
                </div>
            </div>
        ))
    )}
</ScrollArea>
                <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting || isLoadingData}>
                   {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        'Adicionar crismandos'
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    )
}