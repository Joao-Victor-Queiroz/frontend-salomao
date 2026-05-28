import { UserType } from "@/features/auth";
import { Crismando } from "@/features/crismandos";

export type Grupo = {
    id: string;
    nomeGrupo: string;
    animadores: UserType[];
    crismandos: Crismando[];
}