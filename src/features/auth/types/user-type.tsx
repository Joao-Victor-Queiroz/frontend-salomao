import { Cargo } from "./enum-cargo";

export type UserType = {
    id: string;
    nomeAnimador: string;
    email: string;
    cargo: Cargo;
    dataNascimento: string;
    grupoAnimadorId: string;
    grupoCrismandoId: string;
}