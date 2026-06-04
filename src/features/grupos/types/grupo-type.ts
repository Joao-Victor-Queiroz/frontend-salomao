import { UserType } from "@/features/auth";
import { CrismandoComFrequenciaECaixinha } from "@/features/crismandos";

export type Grupo = {
    id: string;
    nomeGrupo: string;
    animadores: UserType[];
    crismandos: CrismandoComFrequenciaECaixinha[];
}