import { Crismando, StatusFrequencia } from "@/features/crismandos"
import { Button } from '@/components/ui/button';
import { Field, FieldLabel} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors, Control, useWatch} from "react-hook-form";
import { FrequenciaSchemaType } from "../schemas/frequencia-schema";


type Props = {
    crismando: Crismando;
    setStatus: (status: StatusFrequencia) => void;
    index: number;
    control: Control<FrequenciaSchemaType>;
    register: UseFormRegister<FrequenciaSchemaType>;
    errors: FieldErrors<FrequenciaSchemaType>
}

export  function CrismandoFrequenciaItem({crismando, setStatus, index, control, register, errors}: Props){
    const options = [
        {label: 'Presente', value: 'P'},
        {label: 'Falta Não Justificada', value: 'FNJ'},
        {label: 'Falta Justificada', value: 'FJ'},
    ]

    const currentStatus = useWatch({
                        control: control,
                        name: `frequencias.${index}.status`,
                        defaultValue: 'P',
                      })
    
    return (
       <div className='flex flex-col gap-4 p-4 rounded-md border-2  shadow-lg'>
            <h1 className='font-bold text-center'>{crismando.nomeCrismando}</h1>
            <div className='flex flex-col gap-2'>
                <input type="hidden" {...register(`frequencias.${index}.crismandoId`)} />
                <input type="hidden" {...register(`frequencias.${index}.status`)} />
                {options.map((option) => (
                    <Button type='button' variant={currentStatus === option.value ? 'default' : 'outline'}key={option.value} onClick={() => setStatus(option.value as StatusFrequencia)}>
                        {option.label}
                    </Button>
                ))}
                {currentStatus === 'FJ' && (
                    <Field>
                        <FieldLabel>Justificativa</FieldLabel>
                        <Input 
                            type='text'
                            placeholder="Ex: Estava doente"
                            error={errors?.frequencias?.[index]?.justificativa?.message}
                            {...register(`frequencias.${index}.justificativa`)}
                        />
                    </Field>
                )}
            </div>
       </div>
    )
}