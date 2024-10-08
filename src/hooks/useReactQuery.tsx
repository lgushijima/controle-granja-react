import useAuth from '@/hooks/useAuth';
import {useQuery} from '@tanstack/react-query';
import {axiosPrivate} from '@/api/axios';

interface props {
    key: Array<any>;
    endpoint: string;
    params?: any;
}
export function useReactQuery<T = unknown>({key, endpoint}: props) {
    const {auth} = useAuth();

    const {data, isFetching, error} = useQuery<T>({
        queryKey: key,
        queryFn: async () => {
            const response = await axiosPrivate.get(endpoint, {
                headers: {Authorization: `bearer ${auth?.token}`},
            });
            return response.data;
        },
        retry: 1,
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 15,
        throwOnError: err => {
            console.error('Oops!', err);
            return false;
        },
    });

    return {data, isFetching, error};
}
