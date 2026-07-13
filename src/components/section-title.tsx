"use client"

import { ChevronLeft} from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { LucideIcon } from "lucide-react";

export function SectionTitle({title, className, isIcon = false, icon: Icon} : {title: string, className?: string, isIcon?: boolean, icon?: LucideIcon}) {
    const router = useRouter();
    
    return (
        <>
        {isIcon && (
          <Button size="icon-lg" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
        )}
        <div className="flex p-0 m-0 gap-2">
          {Icon && <Icon className="w-5 h-5" />}
        <h1 className={`text-3xl font-bold py-2 ${className}`}>{title}</h1>
        </div>
        </>
    )
}