import { Cargo } from "@/features/auth";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  cargo: Cargo;
  animadorId?: string | null;
  grupoAnimadorId?: string | null;
  grupoCrismandoId?: string | null;
  animador?: {
    id: string;
    nomeAnimador: string;
    cargo: Cargo;
    dataNascimento: string;
  } | null;
};
