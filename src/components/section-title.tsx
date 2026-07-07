"use client"

import { ChevronLeft} from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export function SectionTitle({title, className, isIcon = false} : {title: string, className?: string, isIcon?: boolean}) {
    const router = useRouter();
    
    return (
        <>
        {isIcon && (
          <Button size="icon-lg" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
        )}
        <h1 className={`text-3xl font-bold py-2 ${className}`}>{title}</h1>
        </>
    )
}