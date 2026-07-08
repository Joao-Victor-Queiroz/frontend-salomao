import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { profileChangePassword } from "../actions";

const changePasswordSchema = z.object({
    senhaAtual: z.string().min(1, "Senha atual é obrigatória"),
    novaSenha: z.string().min(1, "Digite a nova senha!")
})

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>

export function ChangePasswordDialog(){  
   const [open, setOpen] = useState(false);
   const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange'
   })

   const onSubmit = async(data: ChangePasswordSchemaType) => {
     const result =  await profileChangePassword(data);

     if(result?.success){
        toast.success(`${result.message}`);
        setOpen(false);
     }else{
        toast.error(`${result?.message}`)
     }
   }

   return(
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger className={buttonVariants({variant:'default'})}>
            Alterar senha
         </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Alterar senha</DialogTitle>
                <DialogDescription>Preencha os campos para alterar sua senha.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Field>
                    <FieldLabel>Senha atual</FieldLabel>
                    <Input type="password" {...register("senhaAtual")} error={errors.senhaAtual?.message}/>
                </Field>
                <Field>
                    <FieldLabel>Nova senha</FieldLabel>
                    <Input type="password" {...register("novaSenha")} error={errors.novaSenha?.message}/>
                </Field>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Alterando...' : 'Alterar senha'}
                </Button>
            </form>
        </DialogContent>
      </Dialog>
   )
}