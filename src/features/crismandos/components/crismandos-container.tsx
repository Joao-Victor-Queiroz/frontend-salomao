import { ListaCrismandos } from "./lista-crismandos";
import { getCrismandos } from "../actions/crismando-actions";

export async function CrismandosContainer() {
    const crismandos = await getCrismandos();
    console.log('Crismandos recebidos: ', crismandos)
    return (
        <ListaCrismandos crismandos={crismandos} />
    )
}
