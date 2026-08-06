'use client'

import { useState } from "react";
import Link from "next/link";
import { Animador } from "../types";
import { SectionTitle } from "@/components/section-title";
import { buttonVariants, Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UserCheck, Plus, ArrowRight, User, Shield, ClipboardCheck, Search, Filter, X } from "lucide-react";
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
    COORDENADOR_INTERCESSAO: "Coordenador de Intercessão",
    ANIMADOR_FREQUENCIA: "Animador de Frequência",
    ANIMADOR_CAIXINHA: "Animador de Caixinha",
    ANIMADOR_PESCARIA: "Animador de Pescaria",
    ANIMADOR_COMUNICACAO: "Animador de Comunicação",
    ANIMADOR_MUSICA: "Animador de Música",
    ANIMADOR_LEMBRANCINHA: "Animador de Lembrancinha",
    ANIMADOR_INTERCESSAO: "Animador de Intercessão",
    ANIMADOR: "Animador",
  };

  return cargoMap[cargo] || cargo.replace(/_/g, " ");
}

export function AnimadoresLista({ animadores }: Props) {
  const { user } = useAuth();
  const [searchName, setSearchName] = useState("");
  const [selectedCargo, setSelectedCargo] = useState<string>("");

  const canCreateOrEdit = user && doesCargoMatches(user.cargo, [
    Cargo.ADMIN,
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
  ]);

  const cargoOptions = Object.values(Cargo)
    .map((cargoKey) => ({
      value: cargoKey,
      label: formatCargo(cargoKey),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));

  const normalizedSearch = searchName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const filteredAnimadores = animadores.filter((animador) => {
    const normalizedNome = animador.nomeAnimador
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const matchesName = !searchName || normalizedNome.includes(normalizedSearch);
    const matchesCargo = !selectedCargo || animador.cargo === selectedCargo;

    return matchesName && matchesCargo;
  });

  const hasActiveFilters = Boolean(searchName || selectedCargo);

  const handleClearFilters = () => {
    setSearchName("");
    setSelectedCargo("");
  };

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

      {/* BARRA DE FILTROS */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card border rounded-xl p-4 shadow-sm">
        <div className="relative flex-1 w-full">
          <Input
            icon={Search}
            placeholder="Buscar animador por nome..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className={cn("w-full h-10", searchName && "pr-9")}
          />
          {searchName && (
            <button
              type="button"
              onClick={() => setSearchName("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full hover:bg-muted transition-colors"
              title="Limpar busca"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="w-full sm:w-72 flex items-center gap-2">
          <div className="relative w-full">
            <select
              value={selectedCargo}
              onChange={(e) => setSelectedCargo(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer transition-colors"
            >
              <option value="">Todos os Ministérios / Cargos</option>
              {cargoOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClearFilters}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 shrink-0 h-10 px-3"
          >
            <X size={14} />
            Limpar filtros
          </Button>
        )}
      </div>

      {/* FILTROS ATIVOS E CONTADOR */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground px-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium">Filtros ativos:</span>
            {searchName && (
              <span className="bg-primary-red/10 text-primary-red border border-primary-red/20 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                Nome: "{searchName}"
                <button onClick={() => setSearchName("")} className="hover:opacity-75">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedCargo && (
              <span className="bg-primary-red/10 text-primary-red border border-primary-red/20 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                Ministério: {formatCargo(selectedCargo)}
                <button onClick={() => setSelectedCargo("")} className="hover:opacity-75">
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
          <span>
            Exibindo <strong>{filteredAnimadores.length}</strong> de <strong>{animadores.length}</strong> animadores
          </span>
        </div>
      )}

      {/* LISTA OU ESTADO VAZIO */}
      {animadores.length === 0 ? (
        <div className="bg-card border rounded-xl p-12 text-center text-muted-foreground shadow-sm">
          <UserCheck className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-lg font-medium">Nenhum animador encontrado.</p>
          <p className="text-sm mt-1">Cadastre um novo animador para que ele apareça aqui.</p>
        </div>
      ) : filteredAnimadores.length === 0 ? (
        <div className="bg-card border rounded-xl p-12 text-center text-muted-foreground shadow-sm space-y-3">
          <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-lg font-medium text-foreground">Nenhum animador encontrado com os filtros atuais.</p>
          <p className="text-sm">Tente buscar por outro nome ou selecionar outro ministério/cargo.</p>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="mt-2 text-sm"
          >
            Limpar Filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAnimadores.map((animador) => {
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
