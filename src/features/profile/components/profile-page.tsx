"use client";
import { useAuth } from "@/features/auth"
import { SectionTitle } from "@/components/section-title";

export function ProfilePage() {
    const { user, isLoading } = useAuth();

    if(!user || isLoading) {
        return <p>Usuário está undefined.</p>
    }

    return(
        <main>
            <SectionTitle title={`Bem vindo(a), ${user.nome}!`}/>
            <p>Bem-vindo ao seu perfil.</p>
        </main>
    )
}