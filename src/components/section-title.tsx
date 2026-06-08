

export function SectionTitle({title, className} : {title: string, className?: string}) {
    return <h1 className={`text-3xl font-bold py-2 ${className}`}>{title}</h1>
}