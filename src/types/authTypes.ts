export interface AuthContextType {
    setAuth: (auth: AuthType) => void;
    auth: AuthType;
}

export interface AuthType {
    id: string;
    idCliente: string;
    token: string;
    nome: string;
    perfil: string;
}
