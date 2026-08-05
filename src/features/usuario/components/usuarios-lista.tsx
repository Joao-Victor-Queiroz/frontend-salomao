'use client'

import React from "react";
import { Usuario } from "../types";
import { formatCargo } from "@/features/animador/components/animadores-lista";
import { SectionTitle } from "@/components/section-title";
import { ShieldCheck, User, UserCheck, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  usuarios: Usuario[];
};

export function UsuariosLista({ usuarios }: Props) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Gerenciamento de Usuários do Sistema" />

      {usuarios.length === 0 ? (
        <div className="bg-card border rounded-xl p-12 text-center text-muted-foreground shadow-sm">
          <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-lg font-medium">Nenhum usuário encontrado.</p>
        </div>
      ) : (
        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                <tr>
                  <th className="py-3.5 px-4">Nome</th>
                  <th className="py-3.5 px-4">E-mail</th>
                  <th className="py-3.5 px-4">Cargo / Função</th>
                  <th className="py-3.5 px-4">Animador Vinculado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-foreground flex items-center gap-2">
                      <div className="p-1.5 bg-primary-red/10 text-primary-red rounded-full">
                        <User size={16} />
                      </div>
                      {u.nome}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground font-mono">
                      <div className="flex items-center gap-1.5">
                        <Mail size={14} className="text-muted-foreground/70" />
                        {u.email}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {formatCargo(u.cargo)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {u.animador ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          <UserCheck size={14} />
                          {u.animador.nomeAnimador}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Nenhum</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
