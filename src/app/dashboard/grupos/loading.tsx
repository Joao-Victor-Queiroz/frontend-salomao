import { Skeleton } from "@/components/ui/skeleton";

export default function GruposLoading() {

  const skeletonCards = Array.from({ length: 3 });

  return (
    <div className="mb-8 w-full">
      <Skeleton className="h-8 w-32 mb-4" />

      <Skeleton className="h-10 w-[150px] rounded-md mb-6" />

      <div className="flex flex-col gap-4 pt-6">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="h-[60px] w-full bg-gray-100 dark:bg-zinc-800 p-4 rounded-md flex justify-between items-center border border-gray-200 dark:border-zinc-700"
          >
            <Skeleton className="h-5 w-40" />
            
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}