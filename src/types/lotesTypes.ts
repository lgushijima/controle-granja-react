import {PaginationType} from './generalTypes';

export interface LoteSearchType extends PaginationType {
    pesquisa: string;
}
export interface LoteType {
    cliente: object;
    dataModificacao: string;
}
