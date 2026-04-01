import { useContext, createContext, useState} from 'react';
import { UserType } from '../types/user-type';

type AuthContextType = {
    user: UserType | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children } : { children: React.ReactNode }){
    const [user, setUser] = useState<UserType | null>(null);

    return(
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading: false }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}