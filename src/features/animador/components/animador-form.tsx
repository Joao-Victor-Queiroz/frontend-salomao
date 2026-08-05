'use client'

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { animadorSchema, AnimadorSchemaType } from "../schemas";
import { createAnimador, updateAnimador } from "../actions";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SectionTitle } from "@/components/section-title";
import { Cargo } from "@/features/auth";
import { Usuario } from "@/features/usuario/types";
import { formatCargo } from "./animadores-lista";
import { UserCheck, Calendar, Shield, Link2, CheckCircle2, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  type: "CREATE" | "EDIT";
  initialValues?: {
    nomeAnimador?: string;
    cargo?: Cargo;
    dataNascimento?: string;
    usuarioId?: string;
  };
  usuarios?: Usuario[];
};

export function AnimadorForm({ type, initialValues, usuarios = [] }: Props) {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const formattedDefaultDate = initialValues?.dataNascimento
    ? new Date(initialValues.dataNascimento).toISOString().split("T")[0]
    : "";

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AnimadorSchemaType>({
    resolver: zodResolver(animadorSchema),
    defaultValues: {
      nomeAnimador: initialValues?.nomeAnimador || "",
      cargo: initialValues?.cargo || Cargo.ANIMADOR,
      dataNascimento: formattedDefaultDate,
      associarUsuario: !!initialValues?.usuarioId,
      usuarioId: initialValues?.usuarioId || "",
    },
    mode: "onChange",
  });

  const associarUsuarioWatched = watch("associarUsuario");
  const selectedUsuarioId = watch("usuarioId");

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = async (data: AnimadorSchemaType) => {
    if (type === "CREATE") {
      const result = await createAnimador(data);

      if (!result.success) {
        toast.error(result.message || "Erro ao cadastrar animador.");
        return;
      }

      toast.success("Animador cadastrado com sucesso!");
      router.push("/dashboard/animadores");
      router.refresh();
      return;
    }

    if (type === "EDIT") {
      const result = await updateAnimador(params.id, {
        nomeAnimador: data.nomeAnimador,
        cargo: data.cargo,
        dataNascimento: data.dataNascimento,
      });

      if (!result.success) {
        toast.error(result.message || "Erro ao atualizar animador.");
        return;
      }

      toast.success("Animador atualizado com sucesso!");
      router.push(`/dashboard/animadores/${params.id}`);
      router.refresh();
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <SectionTitle
        title={type === "CREATE" ? "Cadastrar Novo Animador" : `Editar Animador: ${initialValues?.nomeAnimador}`}
      />

      {/* DADOS PRINCIPAIS */}
      <section className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 border-b pb-3 text-foreground">
          <UserCheck size={20} className="text-primary-red" /> Dados do Animador
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field className="md:col-span-2">
            <FieldLabel>Nome Completo do Animador</FieldLabel>
            <Input
              placeholder="Digite o nome completo"
              error={errors.nomeAnimador?.message}
              {...register("nomeAnimador")}
            />
          </Field>

          <Field>
            <FieldLabel>Ministério / Cargo</FieldLabel>
            <div className="relative">
              <select
                className={cn(
                  "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.cargo && "border-destructive text-destructive"
                )}
                {...register("cargo")}
              >
                {Object.values(Cargo).map((cargoKey) => (
                  <option key={cargoKey} value={cargoKey}>
                    {formatCargo(cargoKey)}
                  </option>
                ))}
              </select>
            </div>
            {errors.cargo && (
              <p className="text-xs font-medium text-destructive mt-1">{errors.cargo.message}</p>
            )}
          </Field>

          <Field>
            <FieldLabel>Data de Nascimento</FieldLabel>
            <div className="relative">
              <Input
                type="date"
                error={errors.dataNascimento?.message}
                {...register("dataNascimento")}
              />
            </div>
          </Field>
        </div>
      </section>

      {/* SEÇÃO: ASSOCIAR USUÁRIO EXISTENTE (apenas em criação ou se fornecido) */}
      {type === "CREATE" && (
        <section className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
              <Link2 size={20} className="text-blue-600" /> Associar Conta de Usuário
            </h2>
            <Controller
              control={control}
              name="associarUsuario"
              render={({ field: { onChange, value } }) => (
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <Checkbox
                    checked={value}
                    onCheckedChange={(val) => {
                      onChange(val);
                      if (!val) {
                        setValue("usuarioId", "");
                      }
                    }}
                  />
                  <span>Associar a um usuário existente</span>
                </label>
              )}
            />
          </div>

          {associarUsuarioWatched && (
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  Selecione <strong>apenas um</strong> usuário existente para vincular a este animador:
                </p>
                <Input
                  type="text"
                  placeholder="Buscar usuário..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs h-9"
                />
              </div>

              {errors.usuarioId && (
                <p className="text-sm font-semibold text-destructive bg-destructive/10 p-2 rounded">
                  {errors.usuarioId.message}
                </p>
              )}

              {filteredUsuarios.length === 0 ? (
                <p className="text-center py-6 text-muted-foreground border rounded-lg bg-muted/30">
                  Nenhum usuário disponível encontrado.
                </p>
              ) : (
                <div className="max-h-64 overflow-y-auto border rounded-lg divide-y bg-background">
                  {filteredUsuarios.map((u) => {
                    const isSelected = selectedUsuarioId === u.id;
                    const isAlreadyLinked = !!u.animadorId;

                    return (
                      <div
                        key={u.id}
                        onClick={() => {
                          if (isSelected) {
                            setValue("usuarioId", "");
                          } else {
                            setValue("usuarioId", u.id);
                          }
                        }}
                        className={cn(
                          "p-3 flex items-center justify-between cursor-pointer transition-colors hover:bg-muted/50",
                          isSelected && "bg-primary-red/10 border-l-4 border-l-primary-red",
                          isAlreadyLinked && !isSelected && "opacity-60 bg-muted/20"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                              isSelected
                                ? "border-primary-red bg-primary-red text-white"
                                : "border-input"
                            )}
                          >
                            {isSelected && <CheckCircle2 size={14} />}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-foreground flex items-center gap-2">
                              {u.nome}
                              {isAlreadyLinked && (
                                <span className="text-[10px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded font-mono">
                                  Já possui animador
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">{u.email}</div>
                          </div>
                        </div>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded font-medium">
                          {formatCargo(u.cargo)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* BOTÃO DE ENVIO */}
      <div className="flex gap-3 justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-primary-red hover:bg-primary-red/90 text-white min-w-37.5"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? type === "CREATE"
              ? "Cadastrando..."
              : "Salvando..."
            : type === "CREATE"
            ? "Cadastrar Animador"
            : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  );
}
