import {useForm, useFieldArray} from 'react-hook-form';
import { frequenciaSchema, FrequenciaSchemaType } from '../schemas/frequencia-schema';
import { Crismando } from '@/features/crismandos';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
    crismandos: Crismando[];
}

export function FrequenciaForm({crismandos} : Props) {
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

}