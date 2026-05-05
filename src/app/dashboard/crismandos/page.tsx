import { Suspense } from 'react'
import { CrismandosContainer } from "@/features/crismandos/components/crismandos-container"
import { CrismandosSkeleton } from '@/features/crismandos/components/crismandos-skeleton';
import { SectionTitle } from '@/components/section-title';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react'


export default async function CrismandosPage() {

    return (
        <div>
            <SectionTitle title="Crismandos" />
            <Suspense  fallback={<CrismandosSkeleton />}>
                <CrismandosContainer  />
            </Suspense>
        </div>
    )
}