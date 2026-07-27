import { Suspense } from 'react'
import { getCrismandos } from "@/features/crismandos/actions/crismando-actions"
import { AniversariosContainer } from "@/features/crismandos/components/aniversarios-container"
import { CrismandosSkeleton } from '@/features/crismandos/components/crismandos-skeleton'

export default async function AniversariosPage() {
    const crismandos = await getCrismandos();

    return (
        <Suspense fallback={<CrismandosSkeleton />}>
            <AniversariosContainer crismandos={crismandos} />
        </Suspense>
    )
}
