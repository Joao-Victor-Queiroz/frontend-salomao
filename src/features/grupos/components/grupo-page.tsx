'use client'
import { SectionTitle } from "@/components/section-title";
import { Grupo } from "../types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogTrigger,DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { apiAxios } from "@/lib/api";
import { Crismando } from "@/features/crismandos";

type Props = {
    grupo: Grupo;
}

export function GrupoPageDetails({ grupo } : Props){
    return(
        <div>
            <div>
                <SectionTitle title={grupo.nomeGrupo}/>
            </div>
            <div>
                <h3 className='font-bold mt-8 text-2xl'>Crismandos</h3>
                <div className='grid grid-cols-2 mt-4 md:grid-cols-4'>
                    {grupo.crismandos?.length === 0 && <p>Nenhum crismando no grupo.</p>}

                    {grupo.crismandos?.map((crismando) => (
                        <Card key={crismando.id}>
                            <CardHeader>
                                <CardTitle>{crismando.nomeCrismando}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{crismando.idade} anos</p>
                            </CardContent>
                        </Card>
                        // <div className="p-4 border rounded border-gray-400" key={crismando.id}>
                        //     <p className='font-bold'>{crismando.nomeCrismando}</p>
                        //     <p>{crismando.idade}</p>
                        // </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

type DialogProps = {
    grupoId: string;
    crismandos: string[];
}

export function AddCrismandosDialog({ grupoId, crismandos} : DialogProps) {
    const [open, setOpen] = useState(false);
    const [crismandosSelecionados, setCrismandosSelecionados] = useState<string[]>([]);
    const [crismandosData, setCrismandosData] = useState<Crismando[]>([]);

    useEffect(() => {
       if(!open) {
        setCrismandosSelecionados([]);
        return;
       }

       async function fetchCrismandosLivres(){
        try {
            const api = apiAxios();

            const response = (await api).get(`/crismando/crismandos-sem-grupo`)
            setCrismandosData((await response).data)
        } catch (error) {
            
        }
       }

       fetchCrismandosLivres();
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                Adicionar crismandos
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar crismandos ao grupo</DialogTitle>
                </DialogHeader>
                <div>
                    {crismandosData.map((crismando) => (
                        <div key={crismando.id}>
                            <Checkbox
                            id={crismando.id}
                            checked={crismandosSelecionados.includes(crismando.id)}
                            onCheckedChange={(checked) => {
                                setCrismandosSelecionados(prev => 
                                    checked ? [...prev, crismando.id] : prev.filter(id => id !== crismando.id)
                                )
                            }}
                            />
                            <label htmlFor={crismando.id}>{crismando.nomeCrismando}</label>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <DialogClose>
                        Fechar
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}