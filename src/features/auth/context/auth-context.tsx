"use client";
import { useContext, createContext, useState, useEffect} from 'react';
import { UserType } from '../types/user-type';
import { handleLoginAction } from '../actions/auth-actions';
import { useMutation } from '@tanstack/react-query';
import { LoginSchemaFormType } from '../schemas'
import { useRouter } from 'next/navigation';
import { getProfile } from "@/features/auth";

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
    const [user, setUser] = useState<UserLoginType | null>(() => {
        if (typeof window !== 'undefined') {
            const isUserSaved = localStorage.getItem('user');
            return isUserSaved ? JSON.parse(isUserSaved) : null;
        }
        return null;
    });
    const [isResolving, setIsResolving] = useState(true);
    const router = useRouter();

    useEffect(() => {
       async function loadUser(){
        try {
            const response = await getProfile();

            if(response.data) setUser(response.data)
        } catch (error) {
            setUser(null);
        }finally {
            setIsResolving(false);
        }
       }
       loadUser();
    }, []);

    console.log("Usuário do contexto: ", user);
 

    const loginMutation = useMutation({
        mutationFn: (data: LoginSchemaFormType) => handleLoginAction(data),
        onSuccess: (data) => {
            if (data.success && data.user) {
                console.log('O onSuccess foi chamado com sucesso:', data);
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