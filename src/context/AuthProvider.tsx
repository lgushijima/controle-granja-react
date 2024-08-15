import {AuthContextType, AuthType} from '@/types/authTypes';
import {createContext, ReactNode, useState} from 'react';

interface Props {
    children: ReactNode;
}

const defaultAuthContext: AuthContextType = {
    logout: () => {},
    login: () => {},
    auth: {
        id: '',
        idCliente: '',
        token: '',
        nome: '',
        perfil: '',
    },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({children}: Props) => {
    const [auth, setAuth] = useState<AuthType | null>(() => {
        const data = localStorage.getItem('cg-cliente');
        return data ? JSON.parse(data) : null;
    });

    const login = (data: AuthType | null) => {
        setAuth(data);
        localStorage.setItem('cg-cliente', JSON.stringify(data));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('cg-cliente');
    };

    return <AuthContext.Provider value={{auth, login, logout}}>{children}</AuthContext.Provider>;
};

export default AuthContext;
