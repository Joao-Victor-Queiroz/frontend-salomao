import { Animador } from "@/features/animador";
import { CrismandoComFrequenciaECaixinha, StatusFrequencia } from "@/features/crismandos";

export type Grupo = {
    id: string;
    nomeGrupo: string;
    animadores?: Animador[];
    animadoresMinisterio?: Animador[];
    crismandos: CrismandoComFrequenciaECaixinha[];
}

