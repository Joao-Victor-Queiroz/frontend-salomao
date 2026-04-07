import { useContext, createContext, useState} from 'react';
import { UserType } from '../types/user-type';
import { signIn } from '../services/auth-service';
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

export function AuthProvider({ children } : { children: React.ReactNode }){
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: (data: LoginSchemaFormType) => signIn(data),
        onSuccess: (data) => {
            setUser(data.user);
            localStorage.setItem("token", data.access_token);
            router.push("/dashboard");
        },
        onError: (error: Error) => {
            console.log('ERRO AO FAZER LOGIN:', error.message)
        }
    })

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("token");
        router.push("/");
    }


    return(
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user, 
            isLoading: loginMutation.isPending, 
            signIn: loginMutation.mutate, 
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