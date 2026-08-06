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
import { Eye, EyeOff } from "lucide-react";
import { profileChangePassword } from "../actions";

const changePasswordSchema = z.object({
    senhaAtual: z.string().min(1, "Senha atual é obrigatória"),
    novaSenha: z.string().min(1, "Digite a nova senha!")
})

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>

export function ChangePasswordDialog(){  
   const [open, setOpen] = useState(false);
   const [showSenhaAtual, setShowSenhaAtual] = useState(false);
   const [showNovaSenha, setShowNovaSenha] = useState(false);

   const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange'
   })

   const onSubmit = async(data: ChangePasswordSchemaType) => {
     const result = await profileChangePassword(data);

     if(result?.success){
        toast.success(`${result.message}`);
        reset();
        setShowSenhaAtual(false);
        setShowNovaSenha(false);
        setOpen(false);
     }else{
        toast.error(`${result?.message}`)
     }
   }

   const handleOpenChange = (isOpen: boolean) => {
     setOpen(isOpen);
     if (!isOpen) {
       reset();
       setShowSenhaAtual(false);
       setShowNovaSenha(false);
     }
   }

   return(
      <Dialog open={open} onOpenChange={handleOpenChange}>
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
                    <div className="relative">
                        <Input 
                            type={showSenhaAtual ? "text" : "password"} 
                            {...register("senhaAtual")} 
                            error={errors.senhaAtual?.message}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                            className="absolute right-3 top-4 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                            tabIndex={-1}
                            aria-label={showSenhaAtual ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {showSenhaAtual ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </Field>
                <Field>
                    <FieldLabel>Nova senha</FieldLabel>
                    <div className="relative">
                        <Input 
                            type={showNovaSenha ? "text" : "password"} 
                            {...register("novaSenha")} 
                            error={errors.novaSenha?.message}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNovaSenha(!showNovaSenha)}
                            className="absolute right-3 top-4 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                            tabIndex={-1}
                            aria-label={showNovaSenha ? "Ocultar senha" : "Mostrar senha"}
                        >
                            {showNovaSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </Field>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Alterando...' : 'Alterar senha'}
                </Button>
            </form>
        </DialogContent>
      </Dialog>
   )
}