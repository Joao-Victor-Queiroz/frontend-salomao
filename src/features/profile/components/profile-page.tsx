"use client";
import { useAuth, Cargo } from "@/features/auth"
import { SectionTitle } from "@/components/section-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";


const CARGO_LABELS: Record<Cargo, string> = {
  [Cargo.COORDENADOR_GERAL]: "Coordenador Geral",
  [Cargo.FORMADOR]: "Formador",
  [Cargo.COORDENADOR_FREQUENCIA]: "Coordenador de Frequência",
  [Cargo.COORDENADOR_CAIXINHA]: "Coordenador de Caixinha",
  [Cargo.ANIMADOR_FREQUENCIA]: "Animador de Frequência",
  [Cargo.ANIMADOR_CAIXINHA]: "Animador de Caixinha",
  [Cargo.ANIMADOR_PESCARIA]: "Animador de Pescaria",
  [Cargo.ANIMADOR]: "Animador",
};

export function ProfilePage() {
    const { user, isLoading } = useAuth();

    if(!user || isLoading) {
        return <p>Usuário está undefined.</p>
    }

    return(
        <main>
            <SectionTitle title={`Bem vindo(a), ${user.nomeAnimador}!`}/>
            <p>Bem-vindo ao seu perfil.</p>
            <Card className="mt-10">
                <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg font-medium">Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent>
                    <p> <span>Cargo:</span> {CARGO_LABELS[user.cargo]}</p>
                    <p> <span>Nome completo:</span> {user.nomeAnimador}</p>
                </CardContent>
            </Card>
        </main>
    )
}
