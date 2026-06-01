import { SectionTitle } from "@/components/section-title";
import { Grupo } from "../types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

type Props = {
    grupo: Grupo;
}

export function GrupoPageDetails({ grupo } : Props){
    return(
        <div>
            <div>
                <SectionTitle title={grupo.nomeGrupo}/>
            </div>
            <div>
                <h3 className='font-bold mt-8 text-2xl'>Crismandos</h3>
                <div className='grid grid-cols-2 mt-4 md:grid-cols-4'>
                    {grupo.crismandos?.length === 0 && <p>Nenhum crismando no grupo.</p>}

                    {grupo.crismandos?.map((crismando) => (
                        <Card key={crismando.id}>
                            <CardHeader>
                                <CardTitle>{crismando.nomeCrismando}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{crismando.idade} anos</p>
                            </CardContent>
                        </Card>
                        // <div className="p-4 border rounded border-gray-400" key={crismando.id}>
                        //     <p className='font-bold'>{crismando.nomeCrismando}</p>
                        //     <p>{crismando.idade}</p>
                        // </div>
                    ))}
                </div>
            </div>
        </div>
    )
}