
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Frequencia, StatusFrequencia } from "@/features/crismandos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { editarFrequenciaSchema, EditarFrequenciaSchemaType } from "../schemas/editar-frequencia-schema";
import { Loader2 } from "lucide-react";

interface EditarFrequenciaDialogProps {
  frequencia: Frequencia;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditarFrequenciaDialog({ frequencia, open, onOpenChange }: EditarFrequenciaDialogProps) {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<EditarFrequenciaSchemaType>({
    resolver: zodResolver(editarFrequenciaSchema),
    defaultValues: {
      status: frequencia.status,
      justificativa: frequencia.justificativa || "",
    }
  });

  const currentStatus = watch("status");

  const options = [
    { label: 'Presente', value: 'P' as StatusFrequencia },
    { label: 'Falta Não Justificada', value: 'FNJ' as StatusFrequencia },
    { label: 'Falta Justificada', value: 'FJ' as StatusFrequencia },
  ];

  const onSubmit = async (data: EditarFrequenciaSchemaType) => {
    // Se o status não for FJ, limpar a justificativa
    const payload = {
      status: data.status,
      justificativa: data.status === 'FJ' ? data.justificativa : null
    };

    const { atualizarFrequencia } = await import("../actions/frequencia-actions");
    const result = await atualizarFrequencia(frequencia.id, payload);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
      onOpenChange(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Frequência</DialogTitle>
          <DialogDescription>
            Atualize o status de presença e justificativa do crismando.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-2">
          <div className="flex flex-col gap-2">
            <FieldLabel>Status da Presença</FieldLabel>
            <div className="flex flex-col gap-2">
              {options.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={currentStatus === option.value ? 'default' : 'outline'}
                  onClick={() => setValue("status", option.value, { shouldValidate: true })}
                  className="w-full justify-start font-medium"
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {errors.status && (
              <span className="text-xs text-destructive">{errors.status.message}</span>
            )}
          </div>

          {currentStatus === 'FJ' && (
            <Field>
              <FieldLabel>Justificativa da Falta</FieldLabel>
              <Input
                type="text"
                placeholder="Ex: Atestado médico, viagem familiar..."
                error={errors.justificativa?.message}
                {...register("justificativa")}
              />
            </Field>
          )}

          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Salvar Alterações
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
