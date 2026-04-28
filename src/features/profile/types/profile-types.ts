import { Cargo } from "@/features/auth/types/enum-cargo";


export type UserProfileResponse = {
    id: string;
    nomeAnimador: string;
    email: string;
    password: string;
    cargo: Cargo;
    grupoAnimadorId: string | null;
    grupoCrismandoId: string | null;
}