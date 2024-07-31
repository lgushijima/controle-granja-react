export interface AuthContextType {
    logout: () => void;
    login: (auth: AuthType | null) => void;
    auth: AuthType | null;
}

export interface AuthType {
    id: string;
    idCliente: string;
    token: string;
    nome: string;
    perfil: string;
}
