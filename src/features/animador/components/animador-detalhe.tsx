'use client'

import React, { useState } from "react";
import { Animador } from "../types";
import { formatCargo } from "./animadores-lista";
import { useAuth, Cargo } from "@/features/auth";
import { doesCargoMatches } from "@/lib/cargo-matches";
import { SectionTitle } from "@/components/section-title";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserCheck, Shield, Calendar, Users, User, Edit3, ArrowLeft, Trash2, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteAnimador } from "../actions";
import { toast } from "sonner";
import { AnimadorForm } from "./animador-form";

type Props = {
  animador: Animador;
};

export function AnimadorDetalhe({ animador }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const canEdit = user && doesCargoMatches(user.cargo, [
    Cargo.ADMIN,
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
  ]);

  const formattedDate = animador.dataNascimento
    ? new Date(animador.dataNascimento).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      })
    : "Não informada";

  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja excluir o animador "${animador.nomeAnimador}"?`)) {
      setIsDeleting(true);
      const res = await deleteAnimador(animador.id);
      setIsDeleting(false);

      if (res.success) {
        toast.success("Animador removido com sucesso!");
        router.push("/dashboard/animadores");
        router.refresh();
      } else {
        toast.error(res.message || "Erro ao remover animador.");
      }
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setIsEditing(false)}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Voltar aos Detalhes
        </Button>
        <AnimadorForm type="EDIT" initialValues={animador} />
      </div>
    );
  }

  const frequencias = animador.frequencias || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/animadores"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
          >
            <ArrowLeft size={20} />
          </Link>
          <SectionTitle title={`Animador: ${animador.nomeAnimador}`} />
        </div>

        {canEdit && (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primary-red hover:bg-primary-red/90 text-white flex items-center gap-2"
            >
              <Edit3 size={16} /> Editar Informações
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Excluir Animador"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>

      {/* CARD PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DADOS GERAIS */}
        <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold border-b pb-3 flex items-center gap-2 text-foreground">
            <UserCheck size={20} className="text-primary-red" /> Informações Gerais
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs font-medium">Nome Completo</span>
              <span className="text-base font-semibold text-foreground">{animador.nomeAnimador}</span>
            </div>

            <div>
              <span className="text-muted-foreground block text-xs font-medium">Ministério / Cargo</span>
              <span className="inline-flex items-center gap-1.5 font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground mt-1">
                <Shield size={14} className="text-primary-red" />
                {formatCargo(animador.cargo)}
              </span>
            </div>

            <div>
              <span className="text-muted-foreground block text-xs font-medium">Data de Nascimento</span>
              <span className="flex items-center gap-2 font-medium text-foreground mt-1">
                <Calendar size={16} className="text-muted-foreground" />
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* GRUPOS E CONTA VINCULADA */}
        <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold border-b pb-3 flex items-center gap-2 text-foreground">
            <Users size={20} className="text-blue-600" /> Vínculos & Relações
          </h3>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs font-medium">Grupo de Crismando</span>
              <div className="mt-1">
                {animador.grupoCrismando ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                    <Users size={16} />
                    {animador.grupoCrismando.nomeGrupo}
                  </span>
                ) : (
                  <span className="text-muted-foreground italic">Nenhum grupo de crismando associado</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-muted-foreground block text-xs font-medium">Conta de Usuário Vinculada</span>
              <div className="mt-1">
                {animador.usuario ? (
                  <div className="p-3 bg-muted/40 rounded-lg space-y-1">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <User size={16} className="text-primary-red" />
                      {animador.usuario.nome}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {animador.usuario.email}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Cargo da Conta: {formatCargo(animador.usuario.cargo)}
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground italic">Nenhuma conta de usuário associada</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO: HISTÓRICO DE FREQUÊNCIAS */}
      <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold border-b pb-3 flex items-center gap-2 text-foreground">
          <ClipboardCheck size={20} className="text-emerald-600" /> Histórico de Frequência do Animador
        </h3>

        {frequencias.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Nenhum registro de frequência encontrado para este animador.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                <tr>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Justificativa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {frequencias.map((f) => {
                  const dateStr = f.dataFrequencia
                    ? new Date(f.dataFrequencia).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        timeZone: "UTC",
                      })
                    : "-";

                  const tipoText = f.tipo === "FORMACAO" ? "Formação" : "Encontro";

                  return (
                    <tr key={f.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-mono">{dateStr}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          {tipoText}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {f.status === "P" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            Presente (P)
                          </span>
                        )}
                        {f.status === "FNJ" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive">
                            Falta N/J (FNJ)
                          </span>
                        )}
                        {f.status === "FJ" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            Falta Justificada (FJ)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-xs italic">
                        {f.justificativa || "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

