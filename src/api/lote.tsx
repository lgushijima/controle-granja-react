import {objectToQueryString} from '@/lib/utils';
import {axiosPrivate} from './axios';
import {LoteSearchType, LoteType} from '@/types/lotesTypes';

export async function getLotes(filters?: LoteSearchType, token?: string) {
    const query = filters ? objectToQueryString(filters) : '';
    const header = token ? {headers: {Authorization: `bearer ${token}`}} : {};
    const response = await axiosPrivate.get(`api/Lotes/ListarGrid?${query}`, header);
    return response.data;
}

export async function getLote(loteId: string, token?: string) {
    const header = token ? {headers: {Authorization: `bearer ${token}`}} : {};
    const response = await axiosPrivate.get(`api/Lotes/BuscarDetalhe?id=${loteId}`, header);
    return response.data;
}

export async function deleteLote(data: LoteType, token?: string) {
    const header = token ? {headers: {Authorization: `bearer ${token}`}} : {};
    return axiosPrivate.post('api/Lotes/Excluir', data, header).then(response => response.data);
}

export async function saveUser(data: LoteType, token?: string) {
    const header = token ? {headers: {Authorization: `bearer ${token}`}} : {};
    return axiosPrivate.post('api/Lotes/Salvar', data, header).then(response => response.data);
}
