import {AuthContextType} from '@/types/authTypes';
import {createContext, ReactNode, useState} from 'react';

const defaultAuthContext: AuthContextType = {
    setAuth: () => {
        console.error('Not implemented.');
    },
    auth: {
        id: '',
        idCliente: '',
        token: '',
        nome: '',
        perfil: '',
    },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [auth, setAuth] = useState(defaultAuthContext.auth);

    return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>;
};

export default AuthContext;
