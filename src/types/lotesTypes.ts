import {PaginationType} from './generalTypes';

export interface LoteSearchType extends PaginationType {
    pesquisa: string;
    status: number;
}
export interface LoteType {
    id: string;
    cliente: object;
    dataAlteracao: string;
    data: string;
    numeroLote: number;
    numeroAviario: number;
    status: number;
}
