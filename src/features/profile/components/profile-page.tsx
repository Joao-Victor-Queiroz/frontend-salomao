"use client";
import { useAuth, Cargo } from "@/features/auth"
import { SectionTitle } from "@/components/section-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, NotebookPen, User, Sun, Moon } from "lucide-react";
import { ChangePasswordDialog } from "./change-password-dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export const CARGO_LABELS: Record<Cargo, string> = {
  [Cargo.ADMIN]: "Administrador",
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
    const { setTheme, theme } = useTheme();

    if(!user || isLoading) {
        return <p>Usuário está undefined.</p>
    }

    const toggleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("system");
        else setTheme("light");
    }

    const renderThemeStatus = () => {
        switch (theme) {
            case "light":
                return (
                    <>
                        <span>Claro</span>
                        <Sun className="h-4 w-4 ml-2" />
                    </>
                );
            case "dark":
                return (
                    <>
                        <span>Escuro</span>
                        <Moon className="h-4 w-4 ml-2" />
                    </>
                );
            default: 
                return (
                    <>
                        <span>Sistema</span>
                        <Monitor className="h-4 w-4 ml-2" /> 
                    </>
                );
        }
    }
    
    return(
        <main>
            <SectionTitle title={`Bem vindo(a), ${user.nomeAnimador}!`}/>

            <div className="grid gap-4 lg:grid-cols-3 mt-10">
                
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg font-medium">Dados Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className='text-lg'> <span className="font-bold">Cargo:</span> {CARGO_LABELS[user.cargo]}</p>
                        <p className='text-lg'> <span className="font-bold">Nome completo:</span> {user.nomeAnimador}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                        <Monitor className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg font-medium">Aparência</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between h-[calc(100%-48px)]">
                        <p className="text-sm text-muted-foreground mb-4">Gerencie o tema visual da sua aplicação.</p>
                        <Button onClick={toggleTheme} variant="outline" className="w-full justify-between">
                            <span className="text-sm font-normal text-muted-foreground">Tema atual:</span>
                            <div className="flex items-center">
                                {renderThemeStatus()}
                            </div>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                      <NotebookPen className="h-5 w-5 text-muted-foreground" />
                       <CardTitle className="text-lg font-medium">Ações</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChangePasswordDialog />
                    </CardContent>
                </Card>

            </div>
        </main>
    )
}