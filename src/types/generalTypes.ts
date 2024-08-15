export interface APIQueryPaginationResponseType<T> {
    total: number;
    lista: T[];
}
export interface APIErrorType {
    error: string;
    [key: string]: any; // Permite outras propriedades
}

export interface PaginationType {
    numeroPagina: number;
    tamanhoPagina: number;
    ordenacao: string;
    ordenarPor: string;
}
