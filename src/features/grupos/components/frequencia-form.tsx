'use client'
import {useForm, useFieldArray} from 'react-hook-form';
import { frequenciaSchema, FrequenciaSchemaType } from '../schemas/frequencia-schema';
import { Crismando, FrequenciaPost, StatusFrequencia} from '@/features/crismandos';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { registrarFrequencia } from '../actions';
import { Field, FieldLabel } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { CrismandoFrequenciaItem } from './crismando-frequencia-item';

type Props = {
    crismandos: Crismando[];
    idGrupo: string;
}

export function FrequenciaForm({crismandos, idGrupo} : Props) {
    const crismandosComStatusInicial = crismandos.map((crismando) => ({
        crismandoId: crismando.id,
        status: 'P' as StatusFrequencia,
        justificativa: ''
    }))

    const { control, handleSubmit, register, setValue, watch, formState: {errors, isSubmitting}} = useForm<FrequenciaSchemaType>({
        resolver: zodResolver(frequenciaSchema),
        defaultValues: {
            dataFrequencia: '',
            frequencias: crismandosComStatusInicial,
        }
    })

    const { fields } = useFieldArray({
        control,
        name: 'frequencias',
        rules: {required: true}
    })

    const router = useRouter();


    async function onSubmit(data: FrequenciaSchemaType) {
        if(!Array.isArray(data.frequencias) || data.frequencias.length === 0) {
            return toast.error('Não há dados para enviar na frequência.');
        }

       const result = await registrarFrequencia(data, idGrupo)

       if(!result.success) {
        return toast.error(result.message)
       }

       toast.success(result.message)
       return router.push(`/dashboard/grupos/${idGrupo}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
           <Field>
            <FieldLabel>Data da Frequência</FieldLabel>
            <Input 
                type='date'
                error={errors.dataFrequencia?.message}
                {...register('dataFrequencia')}
            />
           </Field>

           <div>
                {fields.map((field, index) => {
                  const crismando = crismandos.find((c) => c.id === field.crismandoId)

                  if(!crismando) return null;

                  const currentStatus = watch(`frequencias.${index}.status`)

                  return (
                    <CrismandoFrequenciaItem crismando={crismando} currentStatus={currentStatus} key={field.id} index={index} setStatus={(status) => setValue(`frequencias.${index}.status`, status)} register={register} errors={errors}/>
                  )
                })}
           </div>
        </form>
    )

}