"use client"
import { Crismando } from '../types'; 
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { UserPlus, Search, SlidersHorizontal} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { primeiroEUltimoNome } from '../utils';
import { CrismandosFiltros } from './crismandos-filtros';

export type CrismandoComGrupo = Crismando & {
    nomeGrupo: string;
}

type Props = {
    crismandos: CrismandoComGrupo[];
}

export function ListaCrismandos({crismandos} : Props) {
    const [visibleCount, setVisibleCount] = useState(8);
    const [searchName, setSearchName] = useState("");
    const [gruposFilter, setGruposFilter] = useState<string[]>([])
    const [batizadoFilter, setBatizadoFilter] = useState<'Sim' | 'Não' | ''>('')
    const [eucaristiaFilter, setEucaristiaFilter] = useState<'Sim' | 'Não' | ''>('')
    const router = useRouter();

    const normalizedSearch = searchName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const filteredList = crismandos.filter((crismando) => {
        const normalizedName = crismando.nomeCrismando.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const matchesName = normalizedName.includes(normalizedSearch);

        const matchesGrupo = !gruposFilter.length || gruposFilter.includes(crismando.nomeGrupo)

        const matchesBatizado = !batizadoFilter || crismando.batizado === batizadoFilter

        const matchesEucaristia = !eucaristiaFilter || crismando.primeiraEucaristia === eucaristiaFilter

        return matchesName && matchesGrupo && matchesBatizado && matchesEucaristia
    }
    ).sort((a, b) => a.nomeCrismando.localeCompare(b.nomeCrismando));

    const displayedElements = filteredList.slice(0, visibleCount);

    const nomesGruposCrismandos = crismandos.map(crismando => crismando.nomeGrupo)
    const gruposOptions = [...new Set(nomesGruposCrismandos)]

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 8);
    }

    return (
        <div>
            <div className='grid grid-cols-1 w-full lg:grid-cols-3 gap-4'>
            <Input 
                icon={Search}
                placeholder='Buscar crismando...'
                value={searchName}
                onChange={(e) => {
                    setSearchName(e.target.value)
                    setVisibleCount(8)
                }}
                className='w-full'
            />
            <Link href='/dashboard/crismandos/register' className={cn(buttonVariants(), 'bg-primary-red px-6 py-4 w-full')}>
                <UserPlus/> Adicionar crismando
            </Link>
            <CrismandosFiltros
                gruposOptions={gruposOptions}
                gruposSelected={gruposFilter}
                setGruposSelected={setGruposFilter}
                batizadoSelected={batizadoFilter}
                setBatizadoSelected={setBatizadoFilter}
                eucaristiaSelected={eucaristiaFilter}
                setEucaristiaSelected={setEucaristiaFilter}
            />
            </div>
            {(searchName || gruposFilter.length > 0 || batizadoFilter || eucaristiaFilter) ? (
                <div className="mt-4 flex flex-wrap gap-2 items-center text-sm">
                    <span className="font-medium text-muted-foreground">Filtros ativos:</span>
                    {searchName && <span className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs font-medium">Nome: {searchName}</span>}
                    {gruposFilter.length > 0 && <span className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs font-medium">Grupos: {gruposFilter.join(', ')}</span>}
                    {batizadoFilter && <span className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs font-medium">Batizado: {batizadoFilter}</span>}
                    {eucaristiaFilter && <span className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs font-medium">Eucaristia: {eucaristiaFilter}</span>}
                </div>
            ) : null}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedElements.length > 0 ? (
                    displayedElements.map((crismando) => (
                        <Card key={crismando.id}>
                        <CardHeader>
                            <CardTitle className='line-clamp-1'>{crismando.nomeCrismando}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{crismando.idade} anos</p>
                            <p>{crismando.nomeGrupo}</p>
                            <p>Batismo: {crismando.batizado}</p>
                            <p>Eucaristia: {crismando.primeiraEucaristia}</p>
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