import { Grupo } from "../types/grupo-type"
import { SectionTitle } from "@/components/section-title"

type Props = {
    data: Grupo[];
}

export function GruposLista({ data } : Props) {

    return(
        <div className="mb-8">
            <SectionTitle title="Grupos"/>
            <div className="p-6 mt-4 bg-white rounded-lg border shadow-md">
                {data.length === 0 && (
                    <p className="text-center text-gray-500">
                        Nenhum grupo encontrado.
                    </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <div key={item.id} className="border p-4 rounded-lg hover:shadow-md transition">
                            <h3 className="text-lg font-semibold">{item.nomeGrupo}</h3>
                            {/* <p className="text-sm text-gray-500">
                                Animadores: {item.animadores.length}
                            </p> */}
                            <p className="text-sm text-gray-500">
                                Crismandos: {item.crismandos.length}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}