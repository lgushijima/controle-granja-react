import {PaginationType} from './generalTypes';

export interface UserSearchType extends PaginationType {
    pesquisa: string;
}
export interface UserType {
    id: string;
    idCliente: string;

    nome: string;
    login: string;
    senha: string;
    perfil: string;
    ativo: boolean;
}
