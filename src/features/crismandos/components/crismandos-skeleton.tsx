import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export function CrismandosSkeleton(){
    return(
        <div>
            <div className='grid grid-cols-1 w-full lg:grid-cols-3 gap-4'>
                <Skeleton className="h-8w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-3/4" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/3" />
                        </CardContent>
                        <CardFooter>
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}