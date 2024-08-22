import {PaginationType} from './generalTypes';

export interface LoteSearchType extends PaginationType {
    pesquisa: string;
}
export interface LoteType {
    lote: string;
    parceiro: string;
    atualizado: string;
}
