import {useForm, useFieldArray} from 'react-hook-form';
import { frequenciaSchema, FrequenciaSchemaType } from '../schemas/frequencia-schema';
import { Crismando, FrequenciaPost } from '@/features/crismandos';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { registrarFrequencia } from '../actions';
import { Field, FieldLabel } from '@/components/ui/field';


type Props = {
    crismandos: Crismando[];
    idGrupo: string;
}

export function FrequenciaForm({crismandos, idGrupo} : Props) {
    const { control, handleSubmit, formState: {errors, isSubmitting}} = useForm<FrequenciaSchemaType>({
        resolver: zodResolver(frequenciaSchema),
        defaultValues: {
            frequencias: [],
        }
    })

    const { fields } = useFieldArray({
        control,
        name: 'frequencias',
        rules: {required: true}
    })

    async function onSubmit(data: FrequenciaSchemaType) {
        if(!Array.isArray(data.frequencias) || data.frequencias.length === 0) {
            return toast.error('Não há dados para enviar na frequência.');
        }

       const result = await registrarFrequencia(data, idGrupo)

       if(!result.success) {
        return toast.error(result.message)
       }

       toast.success(result.message)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >

        </form>
    )

}