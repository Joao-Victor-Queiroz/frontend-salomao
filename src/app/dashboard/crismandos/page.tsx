import { Suspense } from 'react'
import { CrismandosContainer } from "@/features/crismandos/components/crismandos-container"
import { CrismandosSkeleton } from '@/features/crismandos/components/crismandos-skeleton';
import { SectionTitle } from '@/components/section-title';


export default async function CrismandosPage() {

    return (
        <div className="space-y-4">
            <SectionTitle title="Crismandos" />
            <Suspense fallback={<CrismandosSkeleton />}>
                <CrismandosContainer />
            </Suspense>
        </div>
    )
}