import { SectionTitle } from '@/components/section-title';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingCrismandos() {
    return (
        <div>
            <SectionTitle title="Crismandos" />
            <Skeleton className="h-8 w-54 mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle><Skeleton className="h-6 w-3/4" /></CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
