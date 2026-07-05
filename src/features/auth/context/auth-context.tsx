"use client";
import { useContext, createContext, useState, useEffect} from 'react';
import { UserType } from '../types/user-type';
import { handleLoginAction } from '../actions/auth-actions';
import { useMutation } from '@tanstack/react-query';
import { LoginSchemaFormType } from '../schemas'
import { useRouter } from 'next/navigation';
import { getProfile } from "@/features/auth";
import { usePathname } from 'next/navigation';

type AuthContextType = {
    user: UserLoginType | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (data: LoginSchemaFormType) => void;
    signOut: () => void;
}

type UserLoginType = Omit<UserType, 'id' | 'email' | 'password'>

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children} : { children: React.ReactNode;}){
    const [user, setUser] = useState<UserLoginType | null>(null);
    const [isResolving, setIsResolving] = useState(true);
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
       async function loadUser(){
        try {
            const isUserSaved = localStorage.getItem("user");

            if (isUserSaved) {
                const parsedUser = JSON.parse(isUserSaved);
                setUser(parsedUser);

                // Se o usuário já está logado e está na página de login, redireciona para o dashboard
                if (pathName === '/') {
                    router.replace('/dashboard');
                    return;
                }

                // Busca informações atualizadas no backend e valida a sessão
                const response = await getProfile();

                if (response) {
                    const userData = {
                        ...response,
                        nome: response.nomeAnimador || response.nome,
                    };
                    setUser(userData);
                    localStorage.setItem("user", JSON.stringify(userData));
                }
            } else {
                // Se não há usuário logado e não está na página de login, redireciona para a raiz
                if (pathName !== '/') {
                    router.replace('/');
                }
            }
        } catch (error) {
            console.error("Erro ao validar sessão ou carregar perfil:", error);
            setUser(null);
            localStorage.removeItem("user");
            if (pathName !== '/') {
                router.replace('/');
            }
        } finally {
            setIsResolving(false);
        }
       }
       loadUser();
    }, [pathName, router]);

    console.log("Usuário do contexto: ", user);
 

    const loginMutation = useMutation({
        mutationFn: (data: LoginSchemaFormType) => handleLoginAction(data),
        onSuccess: (data) => {
            if (data.success && data.user) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user))
                router.refresh();
                router.push("/dashboard");
            }
        },
        onError: (error: Error) => {
            console.log('ERRO AO FAZER LOGIN:', error.message)
        }
    })

    const signOut = () => {
        setUser(null);
        router.push("/");
    }


    return(
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user, 
            isLoading: isResolving || loginMutation.isPending, 
            signIn: loginMutation.mutateAsync, 
            signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
   const context = useContext(AuthContext);

   if(!context) {
    throw new Error ("useAuth dever ser usado dentro do AuthProvider.");
   }

   return context;
}