"use client";
import { useAuth } from "@/features/auth"
import { SectionTitle } from "@/components/section-title";

export function ProfilePage() {
    const { user } = useAuth();

    if(!user) {
        return <p>Usuário está null {user}</p>
    }

    return(
        <main>
            <SectionTitle title={`Bem vindo(a), ${user?.nomeAnimador}!`}/>
            <p>Bem-vindo ao seu perfil. {user?.email}</p>
        </main>
    )
}