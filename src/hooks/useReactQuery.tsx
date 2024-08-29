import useAuth from '@/hooks/useAuth';
import {useQuery} from '@tanstack/react-query';
import {axiosPrivate} from '@/api/axios';

interface props {
    key: Array<any>;
    endpoint: string;
    params?: any;
}
export function useReactQuery<T = unknown>({key, endpoint, params}: props) {
    const {auth, logout} = useAuth();

    const {data, isFetching, error} = useQuery<T>({
        queryKey: key,
        queryFn: async () => {
            const response = await axiosPrivate.get(endpoint, {
                headers: {Authorization: `bearer ${auth?.token}`},
            });
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 15,
        throwOnError: err => {
            console.error('Oops!', err);
            debugger;
            return false;
        },
    });

    return {data, isFetching, error};
}
