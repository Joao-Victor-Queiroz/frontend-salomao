import { Crismando, StatusFrequencia } from "@/features/crismandos"
import { Button } from '@/components/ui/button';
import { Field, FieldLabel} from "@/components/ui/field";
import { Input } from "@/components/ui/input";


type Props = {
    crismando: Crismando;
    currentStatus: StatusFrequencia;
    setStatus: (status: StatusFrequencia) => void;
    index: number;
    register: any;
    errors: any
}

export  function CrismandoFrequenciaItem({crismando, currentStatus, setStatus, index, register, errors}: Props){
    const options = [
        {label: 'Presente', value: 'P'},
        {label: 'Falta Justificada', value: 'FJ'},
        {label: 'Falta Não Justificada', value: 'FNJ'}
    ]
    return (
       <div>
            <h1>{crismando.nomeCrismando}</h1>
            <div>
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
                            error={errors?.frequencias?.[index]?.justificativa?.message}
                            {...register(`frequencias.${index}.justificativa`)}
                        />
                    </Field>
                )}
            </div>
       </div>
    )
}