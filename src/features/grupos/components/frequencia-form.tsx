'use client'
import {useForm, useFieldArray, useWatch} from 'react-hook-form';
import { frequenciaSchema, FrequenciaSchemaType } from '../schemas/frequencia-schema';
import { Crismando, StatusFrequencia} from '@/features/crismandos';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { registrarFrequencia } from '../actions';
import { Field, FieldLabel } from '@/components/ui/field';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { CrismandoFrequenciaItem } from './crismando-frequencia-item';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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

    const { control, handleSubmit, register, setValue, formState: {errors, isSubmitting, isLoading}} = useForm<FrequenciaSchemaType>({
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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full' >
           <Field>
            <FieldLabel>Data da Frequência</FieldLabel>
            <Input 
                type='date'
                error={errors.dataFrequencia?.message}
                {...register('dataFrequencia')}
            />
           </Field>

           <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {fields.map((field, index) => {
                  const crismando = crismandos.find((c) => c.id === field.crismandoId)

                  if(!crismando) return null;
        
                  return (
                    <CrismandoFrequenciaItem crismando={crismando} control={control} key={field.id} index={index} setStatus={(status) => setValue(`frequencias.${index}.status`, status)} register={register} errors={errors}/>
                  )
                })}
           </div>
           <Button type='submit' disabled={isSubmitting || isLoading}>
                {isSubmitting ? <Loader2 /> : isLoading ? <Loader2 /> : 'Registrar Frequência'}
           </Button>
        </form>
    )

}