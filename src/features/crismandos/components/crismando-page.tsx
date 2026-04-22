import { SectionTitle } from "@/components/section-title";
import { Crismando } from "../types";

type Props = {
    crismando: Crismando;
}

export function CrismandoPageDetails({crismando} : Props) {
    return (
        <div>
            <SectionTitle  title={crismando.nomeCrismando} />

            <div>
                <p>Idade: {crismando.idade} anos</p>
                <p>Data de Nascimento: {crismando.dataNascimento}</p>
                <p>Data de nascimento: {new Date(crismando.dataNascimento).toLocaleDateString('pt-BR')}</p>
                <p>Telefone: {crismando.telefoneCrismando} </p>
                <p>Nome da mãe: {crismando.nomeMae}</p>
                <p>Telefone da mãe: {crismando.telefoneMae}</p>
                <p>Nome do pai: {crismando.nomePai}</p>
                <p>Telefone do pai: {crismando.telefonePai}</p>
                <p>Batizado: {crismando.batizado}</p>
                <p>Primeira Eucaristia: {crismando.primeiraEucaristia}</p>
            </div>
        </div>
    )
}