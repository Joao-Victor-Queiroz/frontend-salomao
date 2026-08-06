'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, UserPlus, X } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import { Cargo, useAuth } from "@/features/auth";
import { Animador, getAnimadoresSemGrupo, formatCargo } from "@/features/animador";
import { addAnimadoresAoGrupo } from "../actions";
import { addAnimadoresAoGrupoSchema, AddAnimadoresAoGrupoSchemaType } from "../schemas";

type AddAnimadoresDialogProps = {
    grupoId: string;
};

export function AddAnimadoresDialog({ grupoId }: AddAnimadoresDialogProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [animadoresSelecionados, setAnimadoresSelecionados] = useState<string[]>([]);
    const [animadoresData, setAnimadoresData] = useState<Animador[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [filtro, setFiltro] = useState("");

    const canAdd = user?.cargo && (user.cargo === Cargo.ADMIN || user.cargo === Cargo.COORDENADOR_GERAL);

    const { handleSubmit, setValue, clearErrors, formState: { isSubmitting } } = useForm<AddAnimadoresAoGrupoSchemaType>({
        resolver: zodResolver(addAnimadoresAoGrupoSchema),
        defaultValues: {
            animadoresIds: [],
        }
    });

    const router = useRouter();

    useEffect(() => {
        setValue("animadoresIds", animadoresSelecionados);
        if (animadoresSelecionados.length > 0) {
            clearErrors("animadoresIds");
        }
    }, [animadoresSelecionados, open, setValue, clearErrors]);

    useEffect(() => {
        if (!open) {
            setAnimadoresSelecionados([]);
            setFiltro("");
            return;
        }

        async function fetchAnimadoresLivres() {
            try {
                setIsLoadingData(true);
                const response = await getAnimadoresSemGrupo();
                setAnimadoresData(response);
            } catch (error) {
                console.error("Erro ao buscar animadores sem grupo:", error);
                toast.error("Não foi possível carregar a lista de animadores disponíveis.");
            } finally {
                setIsLoadingData(false);
            }
        }

        fetchAnimadoresLivres();
    }, [open]);

    if (!canAdd) {
        return null;
    }

    function handleDesmarcarTodos() {
        setAnimadoresSelecionados([]);
    }

    const animadoresFiltrados = animadoresData.filter((animador) => {
        if (!filtro.trim()) return true;
        const term = filtro.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const nome = (animador.nomeAnimador || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const rawCargo = (animador.cargo || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const fmtCargo = formatCargo(animador.cargo).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        return nome.includes(term) || rawCargo.includes(term) || fmtCargo.includes(term);
    });

    const onSubmit = async (data: AddAnimadoresAoGrupoSchemaType) => {
        const result = await addAnimadoresAoGrupo(grupoId, data.animadoresIds);

        if (!result.success) {
            toast.error(`${result.message}`);
            return;
        }

        toast.success(`${result.message}`);
        setOpen(false);
        setAnimadoresSelecionados([]);
        setAnimadoresData([]);
        router.refresh();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={buttonVariants({ variant: 'default' })}>
                <UserPlus className="mr-2 h-4 w-4" />
                Adicionar animador
            </DialogTrigger>
            <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-lg'>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <UserPlus className="h-5 w-5 text-primary" />
                        Adicionar animadores ao grupo
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Campo de filtro por nome ou cargo / ministério */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filtrar por nome, cargo ou ministério (ex: frequencia)..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            className="pl-9"
                        />
                        {filtro && (
                            <button
                                type="button"
                                onClick={() => setFiltro("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Caixa de selecionados (exibe TODOS) */}
                    <div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-muted-foreground">
                                Animadores selecionados: <span className="text-foreground font-bold">{animadoresSelecionados.length}</span>
                            </p>
                            {animadoresSelecionados.length > 0 && (
                                <Button onClick={handleDesmarcarTodos} variant={"ghost"} size={"sm"} className="h-7 text-xs text-destructive hover:text-destructive">
                                    Desmarcar todos
                                </Button>
                            )}
                        </div>
                        <div className="bg-muted/50 w-full min-h-12 rounded-md p-2 mt-1.5 flex flex-wrap items-center gap-2 border border-dashed">
                            {animadoresSelecionados.length === 0 ? (
                                <span className="text-xs text-muted-foreground px-2">Nenhum selecionado</span>
                            ) : (
                                animadoresSelecionados.map((id, index) => {
                                    const animador = animadoresData.find(a => a.id === id);
                                    if (!animador) return null;

                                    return (
                                        <div
                                            key={`animador-badge-${id}-${index}`}
                                            className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs font-medium px-2.5 py-1 rounded-full"
                                        >
                                            <span>{animador.nomeAnimador}</span>
                                            <span className="text-[10px] text-muted-foreground">({formatCargo(animador.cargo)})</span>
                                            <button
                                                type="button"
                                                className="hover:bg-primary/20 rounded-full w-4 h-4 inline-flex items-center justify-center font-bold ml-0.5"
                                                onClick={() => setAnimadoresSelecionados(prev => prev.filter(item => item !== id))}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Lista com barra de rolagem */}
                    <ScrollArea className='max-h-[35vh] md:max-h-[45vh] pr-2 border rounded-md p-2'>
                        {isLoadingData ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-2 text-muted-foreground">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                <p className="text-sm">Buscando animadores disponíveis...</p>
                            </div>
                        ) : animadoresFiltrados.length === 0 ? (
                            <div className="text-center py-8 text-sm text-muted-foreground">
                                {animadoresData.length === 0 
                                    ? "Nenhum animador sem grupo encontrado." 
                                    : "Nenhum animador encontrado com esse filtro."}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {animadoresFiltrados.map((animador, index) => (
                                    <div 
                                        key={`animador-option-${animador.id}-${index}`} 
                                        className='flex items-center gap-3 p-2 hover:bg-muted/60 rounded-md transition-colors cursor-pointer'
                                        onClick={() => {
                                            if (isSubmitting) return;
                                            setAnimadoresSelecionados(prev =>
                                                prev.includes(animador.id)
                                                    ? prev.filter(id => id !== animador.id)
                                                    : [...prev, animador.id]
                                            );
                                        }}
                                    >
                                        <Checkbox
                                            id={`animador-${animador.id}`}
                                            disabled={isSubmitting}
                                            checked={animadoresSelecionados.includes(animador.id)}
                                            onCheckedChange={(checked) => {
                                                setAnimadoresSelecionados(prev =>
                                                    checked ? [...prev, animador.id] : prev.filter(id => id !== animador.id)
                                                );
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className='flex items-center justify-between w-full select-none'>
                                            <label htmlFor={`animador-${animador.id}`} className="font-semibold cursor-pointer text-sm" onClick={(e) => e.stopPropagation()}>
                                                {animador.nomeAnimador}
                                            </label>
                                            <Badge variant="outline" className="text-xs font-normal">
                                                {formatCargo(animador.cargo)}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>

                    <Button 
                        onClick={handleSubmit(onSubmit)} 
                        disabled={isSubmitting || isLoadingData || animadoresSelecionados.length === 0}
                        className="w-full"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Adicionando animadores...
                            </>
                        ) : (
                            `Adicionar ${animadoresSelecionados.length > 0 ? `(${animadoresSelecionados.length}) ` : ''}Animador${animadoresSelecionados.length > 1 ? 'es' : ''}`
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
