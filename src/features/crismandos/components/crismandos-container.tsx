import { ListaCrismandos } from "./lista-crismandos";
import { getCrismandos } from "../actions/crismando-actions";

export async function CrismandosContainer() {
    const crismandos = await getCrismandos();

    return (
        <ListaCrismandos crismandos={crismandos} />
    )
}
