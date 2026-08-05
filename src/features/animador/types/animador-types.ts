import { Cargo } from "@/features/auth";
import { Usuario } from "@/features/usuario/types/usuario-types";

export type Animador = {
  id: string;
  nomeAnimador: string;
  cargo: Cargo;
  dataNascimento: string;
  grupoAnimadorId?: string | null;
  grupoCrismandoId?: string | null;
  grupoCrismando?: {
    nomeGrupo: string;
  } | null;
  usuario?: Usuario | null;
};

export type CreateAnimadorInput = {
  nomeAnimador: string;
  cargo?: Cargo;
  dataNascimento: string;
  usuarioId?: string;
};

export type UpdateAnimadorInput = {
  nomeAnimador?: string;
  cargo?: Cargo;
  dataNascimento?: string;
  grupoAnimadorId?: string | null;
  grupoCrismandoId?: string | null;
};
