'use client'

import React from "react";
import Link from "next/link";
import { Animador } from "../types";
import { SectionTitle } from "@/components/section-title";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserCheck, Plus, ArrowRight, User, Shield, ClipboardCheck } from "lucide-react";
import { Cargo, useAuth } from "@/features/auth";
import { doesCargoMatches } from "@/lib/cargo-matches";

type Props = {
  animadores: Animador[];
};

export function formatCargo(cargo?: Cargo | string): string {
  if (!cargo) return "Sem cargo";
  const cargoMap: Record<string, string> = {
    ADMIN: "Administrador",
    COORDENADOR_GERAL: "Coordenador Geral",
    FORMADOR: "Formador",
    COORDENADOR_FREQUENCIA: "Coordenador de Frequência",
    COORDENADOR_CAIXINHA: "Coordenador de Caixinha",
    COORDENADOR_COMUNICACAO: "Coordenador de Comunicação",
    COORDENADOR_MUSICA: "Coordenador de Música",
    COORDENADOR_PESCARIA: "Coordenador de Pescaria",
    COORDENADOR_LEMBRANCINHA: "Coordenador de Lembrancinha",
    ANIMADOR_FREQUENCIA: "Animador de Frequência",
    ANIMADOR_CAIXINHA: "Animador de Caixinha",
    ANIMADOR_PESCARIA: "Animador de Pescaria",
    ANIMADOR_COMUNICACAO: "Animador de Comunicação",
    ANIMADOR_MUSICA: "Animador de Música",
    ANIMADOR_LEMBRANCINHA: "Animador de Lembrancinha",
    ANIMADOR: "Animador",
  };

  return cargoMap[cargo] || cargo.replace(/_/g, " ");
}

export function AnimadoresLista({ animadores }: Props) {
  const { user } = useAuth();
  const canCreateOrEdit = user && doesCargoMatches(user.cargo, [
    Cargo.ADMIN,
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionTitle title="Animadores" />
        {canCreateOrEdit && (
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/animadores/frequencia"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-primary-red/30 hover:bg-primary-red/10 text-primary-red flex items-center gap-2 rounded-lg font-medium shadow-sm transition-all"
              )}
            >
              <ClipboardCheck size={18} />
              Frequência dos Animadores
            </Link>
            <Link
              href="/dashboard/animadores/novo"
              className={cn(
                buttonVariants(),
                "bg-primary-red hover:bg-primary-red/90 text-white px-5 py-2.5 flex items-center gap-2 rounded-lg font-medium shadow-sm transition-all"
              )}
            >
              <Plus size={18} />
              Novo Animador
            </Link>
          </div>
        )}
      </div>

      {animadores.length === 0 ? (
        <div className="bg-card border rounded-xl p-12 text-center text-muted-foreground shadow-sm">
          <UserCheck className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-lg font-medium">Nenhum animador encontrado.</p>
          <p className="text-sm mt-1">Cadastre um novo animador para que ele apareça aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animadores.map((animador) => {
            const grupoNome = animador.grupoCrismando?.nomeGrupo || "Sem grupo";
            return (
              <div
                key={animador.id}
                className="bg-card border border-border/80 hover:border-primary-red/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-primary-red/10 text-primary-red rounded-lg">
                        <UserCheck size={22} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary-red transition-colors">
                          {animador.nomeAnimador}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground mt-1">
                          <Shield size={12} className="text-primary-red" />
                          {formatCargo(animador.cargo)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t text-sm space-y-1.5 text-muted-foreground">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground/80">Grupo Crismando:</span>
                      <span className={cn("px-2 py-0.5 rounded text-xs font-medium", animador.grupoCrismando ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground")}>
                        {grupoNome}
                      </span>
                    </div>

                    {animador.usuario && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="flex items-center gap-1 text-foreground/70">
                          <User size={12} /> Usuário vinculado:
                        </span>
                        <span className="font-mono text-foreground/90 truncate max-w-37.5">
                          {animador.usuario.email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href={`/dashboard/animadores/${animador.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-between hover:bg-primary-red hover:text-white hover:border-primary-red transition-colors"
                  )}
                >
                  <span>Ver Detalhes</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
