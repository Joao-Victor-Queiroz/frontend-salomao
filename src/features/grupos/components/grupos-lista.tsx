import { Grupo } from "../types/grupo-type"
import { SectionTitle } from "@/components/section-title"
import Link from 'next/link';
import { ArrowRight  } from 'lucide-react'
import { buttonVariants } from "@/components/ui/button";
import { cn } from '@/lib/utils';

type Props = {
    data: Grupo[];
}

export function GruposLista({ data } : Props) {

    return(
        <div className="mb-8">
            <SectionTitle title="Grupos"/>
            <Link href="/dashboard/grupos/register" className={cn(buttonVariants(), 'bg-primary-red px-6 py-4')}>
                Adicionar grupo
            </Link>
            <div className="flex flex-col gap-4 pt-6">
                {data.length === 0 && (
                    <p className="text-center text-gray-500">
                        Nenhum grupo encontrado.
                    </p>
                )}
                {data.map((grupo) => (
                    <Link href={`/dashboard/grupos/${grupo.id}`} className="bg-primary-red p-4 rounded-md text-white flex justify-between items-center shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1)]" key={grupo.id}>
                        <h1 className="font-semibold">{grupo.nomeGrupo}</h1>
                        <ArrowRight />
                    </Link>
                ))}
            </div>
        </div>
    )

}