'use client'

import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrarFrequenciaAnimadoresSchema,
  RegistrarFrequenciaAnimadoresSchemaType,
} from "../schemas";
import { Animador, StatusFrequencia } from "../types";
import { registrarFrequenciaAnimadores } from "../actions";
import { SectionTitle } from "@/components/section-title";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimadorFrequenciaItem } from "./animador-frequencia-item";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  animadores: Animador[];
};

export function FrequenciaAnimadoresForm({ animadores }: Props) {
  const router = useRouter();

  const animadoresComStatusInicial = animadores.map((animador) => ({
    animadorId: animador.id,
    tipo: "ENCONTRO" as const,
    status: "P" as StatusFrequencia,
    justificativa: "",
  }));

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<RegistrarFrequenciaAnimadoresSchemaType>({
    resolver: zodResolver(registrarFrequenciaAnimadoresSchema),
    defaultValues: {
      dataFrequencia: "",
      tipoGeral: "ENCONTRO",
      frequencias: animadoresComStatusInicial,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "frequencias",
  });

  // Observa a alteração no tipoGeral e sincroniza o campo `tipo` de cada animador
  const tipoGeralWatched = useWatch({
    control,
    name: "tipoGeral",
    defaultValue: "ENCONTRO",
  });

  useEffect(() => {
    fields.forEach((_, index) => {
      setValue(`frequencias.${index}.tipo`, tipoGeralWatched);
    });
  }, [tipoGeralWatched, fields, setValue]);

  const onSubmit = async (data: RegistrarFrequenciaAnimadoresSchemaType) => {
    if (!Array.isArray(data.frequencias) || data.frequencias.length === 0) {
      toast.error("Não há animadores para registrar frequência.");
      return;
    }

    const payload = {
      dataFrequencia: data.dataFrequencia,
      frequencias: data.frequencias.map((f) => ({
        animadorId: f.animadorId,
        tipo: data.tipoGeral,
        status: f.status,
        justificativa: f.justificativa ? f.justificativa.trim() : null,
      })),
    };

    const result = await registrarFrequenciaAnimadores(payload);

    if (!result.success) {
      toast.error(result.message || "Erro ao registrar frequência.");
      return;
    }

    toast.success(result.message || "Frequência registrada com sucesso!");
    router.push("/dashboard/animadores");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3 border-b pb-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft size={20} />
        </Button>
        <SectionTitle title="Registrar Frequência dos Animadores" />
      </div>

      {/* SELEÇÃO DE DATA E TIPO GERAL */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel>Data da Frequência</FieldLabel>
          <Input
            type="date"
            error={errors.dataFrequencia?.message}
            {...register("dataFrequencia")}
          />
        </Field>

        <Field>
          <FieldLabel>Tipo de Frequência</FieldLabel>
          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            {...register("tipoGeral")}
          >
            <option value="ENCONTRO">Encontro</option>
            <option value="FORMACAO">Formação</option>
          </select>
          {errors.tipoGeral && (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.tipoGeral.message}
            </p>
          )}
        </Field>
      </div>

      {/* GRID DE CARDS DOS ANIMADORES */}
      {fields.length === 0 ? (
        <div className="bg-card border rounded-xl p-8 text-center text-muted-foreground">
          Nenhum animador cadastrado para registrar frequência.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field, index) => {
            const animador = animadores.find((a) => a.id === field.animadorId);

            if (!animador) return null;

            return (
              <AnimadorFrequenciaItem
                key={field.id}
                animador={animador}
                control={control}
                index={index}
                setStatus={(status) => setValue(`frequencias.${index}.status`, status)}
                register={register}
                errors={errors}
              />
            );
          })}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="bg-primary-red hover:bg-primary-red/90 text-white font-semibold h-12 text-base shadow-sm"
      >
        {isSubmitting || isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={20} />
            Registrando...
          </div>
        ) : (
          "Registrar Frequência"
        )}
      </Button>
    </form>
  );
}
