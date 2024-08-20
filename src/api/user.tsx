import {objectToQueryString} from '@/lib/utils';
import {axiosPrivate} from './axios';
import {UserSearchType, UserType} from '@/types/userTypes';

export async function getUsers(filters?: UserSearchType, token?: string) {
    const query = filters ? objectToQueryString(filters) : '';
    const header = token ? {headers: {Authorization: `bearer ${token}`}} : {};
    const response = await axiosPrivate.get(`api/Usuarios/ListarGrid?${query}`, header);
    return response.data;
}

export async function deleteUser(data: UserType, token?: string) {
    const header = token ? {headers: {Authorization: `bearer ${token}`}} : {};
    return axiosPrivate.post('api/Usuarios/Excluir', data, header).then(response => response.data);
}

export async function saveUser(data: UserType, token?: string) {
    const header = token ? {headers: {Authorization: `bearer ${token}`}} : {};
    return axiosPrivate.post('api/Usuarios/Salvar', data, header).then(response => response.data);
}
