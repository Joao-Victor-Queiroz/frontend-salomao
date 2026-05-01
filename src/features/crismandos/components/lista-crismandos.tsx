"use client"
import { Crismando } from '../types'; 
import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react'

export type CrismandoComGrupo = Crismando & {
    nomeGrupo: string;
}

type Props = {
    crismandos: CrismandoComGrupo[];
}

export function ListaCrismandos({crismandos} : Props) {
    const router = useRouter();

    return (
        <div>
            <SectionTitle title="Crismandos" />
            <Button className='bg-primary-red px-6 py-4'>
                <UserPlus/> Adicionar crismando
            </Button>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                {crismandos.length > 0 ? (
                    crismandos.map((crismando) => (
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
        </div>
    )
}