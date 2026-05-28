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
            {/* <div className="p-6 mt-4 bg-white rounded-lg border shadow-md">
                {data.length === 0 && (
                    <p className="text-center text-gray-500">
                        Nenhum grupo encontrado.
                    </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <div key={item.id} className="border p-4 rounded-lg hover:shadow-md transition">
                            <h3 className="text-lg font-semibold">{item.nomeGrupo}</h3>
                            <p className="text-sm text-gray-500">
                                Animadores: {item.animadores.length}
                            </p>
                            <p className="text-sm text-gray-500">
                                Crismandos: {item.crismandos.length}
                            </p>
                        </div>
                    ))}
                </div>
            </div> */}
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