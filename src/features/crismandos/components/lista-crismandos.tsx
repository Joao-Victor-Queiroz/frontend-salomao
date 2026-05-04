"use client"
import { Crismando } from '../types'; 
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export type CrismandoComGrupo = Crismando & {
    nomeGrupo: string;
}

type Props = {
    crismandos: CrismandoComGrupo[];
}

export function ListaCrismandos({crismandos} : Props) {
    const [visibleCount, setVisibleCount] = useState(8);
    const [searchName, setSearchName] = useState("");
    const router = useRouter();

    const filteredList = crismandos.filter((crismando) => 
        crismando.nomeCrismando.toLowerCase().includes(searchName.toLocaleLowerCase())
    ).sort((a, b) => a.nomeCrismando.localeCompare(b.nomeCrismando));

    const displayedElements = filteredList.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 8);
    }

    return (
        <div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                {displayedElements.length > 0 ? (
                    displayedElements.map((crismando) => (
                        <Card key={crismando.id}>
                        <CardHeader>
                            <CardTitle>{crismando.nomeCrismando}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{crismando.idade} anos</p>
                            <p>{crismando.nomeGrupo}</p>
                            <p>{crismando.batizado}</p>
                            <p>{crismando.primeiraEucaristia}</p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => router.push(`/dashboard/crismandos/${crismando.id}`)}>
                                Ver detalhes
                            </Button>
                        </CardFooter>
                    </Card>
                    ))
                ) : (
                    <p>Não há crismandos cadastrados.</p>
                )}
            </div>
            { visibleCount < filteredList.length && (
            <Button onClick={handleLoadMore} className='mt-4 w-full bg-primary-red'>
                Carregar mais
            </Button>
            )}
        </div>
    )
}