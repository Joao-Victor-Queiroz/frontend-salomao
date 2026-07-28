import { Cargo } from "@/features/auth/types/enum-cargo";


export type UserProfileResponse = {
    id: string;
    nome: string;
    nomeAnimador?: string;
    email: string;
    cargo: Cargo;
    grupoAnimadorId: string | null;
    grupoCrismandoId: string | null;
}