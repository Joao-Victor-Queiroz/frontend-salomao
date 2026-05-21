import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter,
    SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SlidersHorizontal } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FilterProps = {
    gruposOptions: string[];
    gruposSelected: string[];
    setGruposSelected: (gruposSelected: string[]) => void;
    batizadoSelected: string;
    setBatizadoSelected: (value: "" | 'Sim' | 'Não') => void;
    eucaristiaSelected: string;
    setEucaristiaSelected: (value: "" | 'Sim' | 'Não') => void;
}

export function CrismandosFiltros({
    gruposOptions,
    gruposSelected,
    setGruposSelected,
    batizadoSelected,
    setBatizadoSelected,
    eucaristiaSelected,
    setEucaristiaSelected,
} : FilterProps){
    const options = [
        {label: 'Sim', value: 'Sim'},
        {label: 'Não', value: 'Não'}
    ]

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant='outline' className='w-full'>
                    <SlidersHorizontal /> Filtros
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                    <SheetDescription>
                        Selecione os filtros para filtrar os crismandos.
                    </SheetDescription>
                </SheetHeader>
                <div className='flex flex-col gap-4'>
                    <div className='px-5'>
                        <h3 className='text-sm font-semibold'>Grupos: </h3>
                        {gruposOptions.map((grupo) => (
                            <Button
                                key={grupo}
                                variant={gruposSelected?.includes(grupo) ? 'default' : 'outline'}
                                onClick={() => {
                                    if (gruposSelected?.includes(grupo)) {
                                        setGruposSelected(gruposSelected.filter(g => g !== grupo))
                                    } else {
                                        setGruposSelected([...(gruposSelected || []), grupo])
                                    }
                                }}
                                className='mx-1 mt-2'
                            >
                                {grupo}
                            </Button>
                        ))}
                    </div>
                    <div className='px-5'>
                        <h3 className='text-sm font-semibold'>Batizado: </h3>
                            <RadioGroup 
                            value={batizadoSelected}
                            onValueChange={(value) => setBatizadoSelected(value as "" | 'Sim' | 'Não')}
                            defaultValue='' 
                            className='mt-2'
                            >
                                {options.map((option) => (
                                    <div className='flex items-center gap-2' key={option.value}>
                                    <RadioGroupItem value={option} key={option.value} />
                                     <Label htmlFor={option.value}>{option.label}</Label> 
                                    </div>
                                ))}
                            </RadioGroup>
                    </div>
                    <div className='px-5'>
                        <h3 className='text-sm font-semibold'>Primeira Eucaristia: </h3>
                            <RadioGroup 
                            value={eucaristiaSelected}
                            onValueChange={(value) => setEucaristiaSelected(value as "" | 'Sim' | 'Não')}
                            defaultValue='' className='mt-2'
                            >
                                {options.map((option) => (
                                    <div className='flex items-center gap-2' key={option.value}>
                                    <RadioGroupItem value={option} key={option.value} />
                                     <Label htmlFor={option.value}>{option.label}</Label> 
                                    </div>
                                ))}
                            </RadioGroup>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose>
                        <Button className='bg-primary-red text-white w-full'>Aplicar filtros</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}