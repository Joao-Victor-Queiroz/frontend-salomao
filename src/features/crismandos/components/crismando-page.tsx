import { SectionTitle } from "@/components/section-title";
import { Crismando } from "../types";
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, User, ShieldCheck } from "lucide-react"; // Opcional: ícones trazem muita vida ao painel


type Props = {
    crismando: Crismando;
}

export function CrismandoPageDetails({ crismando }: Props) {
    return (
        <div className="space-y-6 max-w-4xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
                <SectionTitle title={crismando.nomeCrismando} />
                <Link 
                    href={`/dashboard/crismandos/${crismando.id}/edit`} 
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                    Editar crismando
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg font-medium">Dados Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">Idade:</span>
                            <span className="font-semibold">{crismando.idade} anos</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">Data de Nascimento:</span>
                            <span className="font-semibold">
                                {new Date(crismando.dataNascimento).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                        <div className="flex justify-between pb-1">
                            <span className="text-muted-foreground">Telefone:</span>
                            <span className="font-semibold">{crismando.telefoneCrismando || "Não informado"}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg font-medium">Sacramentos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Batizado:</span>
                            <Badge variant={crismando.batizado === "Sim" ? "default" : "secondary"}>
                                {crismando.batizado}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Primeira Eucaristia:</span>
                            <Badge variant={crismando.primeiraEucaristia === "Sim" ? "default" : "secondary"}>
                                {crismando.primeiraEucaristia}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">Filiação</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2 text-sm">
                        <div className="p-3 bg-muted/50 rounded-lg space-y-1">
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Mãe</p>
                            <p className="font-medium text-base">{crismando.nomeMae}</p>
                            <p className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Phone className="h-3 w-3" /> {crismando.telefoneMae || "Sem telefone"}
                            </p>
                        </div>
                        
                        <div className="p-3 bg-muted/50 rounded-lg space-y-1">
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Pai</p>
                            <p className="font-medium text-base">{crismando.nomePai || "Não informado"}</p>
                            <p className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Phone className="h-3 w-3" /> {crismando.telefonePai || "Sem telefone"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}