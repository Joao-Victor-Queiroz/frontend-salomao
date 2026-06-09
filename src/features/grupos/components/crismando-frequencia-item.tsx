import { Crismando, StatusFrequencia } from "@/features/crismandos"
import { Button } from '@/components/ui/button';
import { Field, FieldLabel} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FrequenciaSchemaType } from "../schemas/frequencia-schema";


type Props = {
    crismando: Crismando;
    currentStatus: StatusFrequencia;
    setStatus: (status: StatusFrequencia) => void;
    index: number;
    register: UseFormRegister<FrequenciaSchemaType>;
    errors: FieldErrors<FrequenciaSchemaType>
}

export  function CrismandoFrequenciaItem({crismando, currentStatus, setStatus, index, register, errors}: Props){
    const options = [
        {label: 'Presente', value: 'P'},
        {label: 'Falta Não Justificada', value: 'FNJ'},
        {label: 'Falta Justificada', value: 'FJ'},
    ]
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