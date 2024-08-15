//-- alternativa ao React Query --
//--------------------------------
import axios from '@/api/axios';
import {useEffect, useState} from 'react';

export function useFetch<T = unknown>(endpoint: string, param: object) {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(endpoint, param)
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, []);

    return {data, isFetching, error};
}
