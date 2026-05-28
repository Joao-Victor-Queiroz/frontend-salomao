'use client'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGrupo } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

type FormType = 'REGISTER' | 'EDIT'

type Props = {
    type: FormType,
    initialValues?: GrupoSchemaType,
}

const grupoSchema = z.object({
    nomeGrupo: z.string().nonempty(''),
})

type GrupoSchemaType = z.infer<typeof grupoSchema>

export function GrupoForm({type, initialValues} : Props) {
    const {handleSubmit, register, control, formState: { errors, isLoading, isSubmitting}} = useForm<GrupoSchemaType>({
        resolver: zodResolver(grupoSchema),
        defaultValues: initialValues,
        mode: 'onChange',
    })

    const router = useRouter();

    const onSubmit = async(data: GrupoSchemaType) => {
        if(type === 'REGISTER'){
            const resultRegisterGroup = await createGrupo(data);
            if(!resultRegisterGroup.success){
               toast.error(resultRegisterGroup.message)
               return;
            }

            toast.success('Grupo registrado com sucesso!')
            router.back();

            return
        }else{
            console.log('Editando grupo: ', data)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <Field>
                <FieldLabel>Nome do Grupo</FieldLabel>
                <Input placeholder="Nome do grupo" error={errors.nomeGrupo?.message} {...register('nomeGrupo')} />
            </Field>
             <Button type="submit" disabled={isSubmitting || isLoading} className="w-full">
              {isSubmitting
                ? { REGISTER: 'Criando...', EDIT: 'Editando...' }[type]
                : { REGISTER: 'Criar grupo', EDIT: 'Editar grupo' }[type]
              }
            </Button>
        </form>
    )
}