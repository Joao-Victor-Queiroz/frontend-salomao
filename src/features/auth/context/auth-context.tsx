"use client";
import { useContext, createContext, useState} from 'react';
import { UserType } from '../types/user-type';
import { handleLoginAction } from '../actions/auth-actions';
import { useMutation } from '@tanstack/react-query';
import { LoginSchemaFormType } from '../schemas'
import { useRouter } from 'next/navigation';

type AuthContextType = {
    user: UserType | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (data: LoginSchemaFormType) => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children, initialUser } : { children: React.ReactNode; initialUser: UserType | null}){
    const [user, setUser] = useState<UserType | null>(initialUser);
    const router = useRouter();

    console.log("Usuário do contexto: ", user);
    console.log("Usuário inicial: ", initialUser);

    const loginMutation = useMutation({
        mutationFn: (data: LoginSchemaFormType) => handleLoginAction(data),
        onSuccess: (data) => {
            if (data.success && data.user) {
                console.log('O onSuccess foi chamado com sucesso:', data);
                setUser(data.user);
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
            isLoading: loginMutation.isPending, 
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