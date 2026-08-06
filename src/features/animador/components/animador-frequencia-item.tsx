
import { Animador, StatusFrequencia } from "../types";
import { formatCargo } from "./animadores-lista";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UseFormRegister, FieldErrors, Control, useWatch } from "react-hook-form";
import { RegistrarFrequenciaAnimadoresSchemaType } from "../schemas";

type Props = {
  animador: Animador;
  setStatus: (status: StatusFrequencia) => void;
  index: number;
  control: Control<RegistrarFrequenciaAnimadoresSchemaType>;
  register: UseFormRegister<RegistrarFrequenciaAnimadoresSchemaType>;
  errors: FieldErrors<RegistrarFrequenciaAnimadoresSchemaType>;
};

export function AnimadorFrequenciaItem({
  animador,
  setStatus,
  index,
  control,
  register,
  errors,
}: Props) {
  const options = [
    { label: "Presente", value: "P" },
    { label: "Falta Não Justificada", value: "FNJ" },
    { label: "Falta Justificada", value: "FJ" },
  ];

  const currentStatus = useWatch({
    control,
    name: `frequencias.${index}.status`,
    defaultValue: "P",
  });

  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl border-2 bg-card shadow-md transition-all hover:border-primary-red/40">
      <div className="text-center space-y-1">
        <h2 className="font-bold text-lg text-foreground">{animador.nomeAnimador}</h2>
        <p className="text-xs text-muted-foreground font-medium">
          {formatCargo(animador.cargo)} {animador.grupoCrismando ? `• ${animador.grupoCrismando.nomeGrupo}` : ""}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <input type="hidden" {...register(`frequencias.${index}.animadorId`)} />
        <input type="hidden" {...register(`frequencias.${index}.tipo`)} />
        <input type="hidden" {...register(`frequencias.${index}.status`)} />

        {options.map((option) => {
          const isSelected = currentStatus === option.value;
          return (
            <Button
              type="button"
              key={option.value}
              variant={isSelected ? "default" : "outline"}
              className={isSelected ? "bg-primary-red hover:bg-primary-red/90 text-white font-semibold shadow-sm" : "font-medium"}
              onClick={() => setStatus(option.value as StatusFrequencia)}
            >
              {option.label}
            </Button>
          );
        })}

        {(currentStatus === "FJ" || currentStatus === "FNJ") && (
          <Field className="mt-2">
            <FieldLabel>Justificativa</FieldLabel>
            <Input
              type="text"
              placeholder="Ex: Motivo de saúde ou trabalho"
              error={errors?.frequencias?.[index]?.justificativa?.message}
              {...register(`frequencias.${index}.justificativa`)}
            />
          </Field>
        )}
      </div>
    </div>
  );
}
