import {Link, Outlet} from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import {useQuery, useQueryClient} from 'react-query';
import {axiosPrivate} from '@/api/axios';

type LoteType = {
    id: string;
};

const Layout = () => {
    const {auth} = useAuth();

    const queryClient = useQueryClient();
    const {data, isFetching} = useQuery<LoteType[]>(
        'getlotes',
        async () => {
            const response = await axiosPrivate.get('api/Lotes/buscarLotes');
            return response.data;
        },
        {
            refetchOnWindowFocus: true,
            staleTime: 1000 * 60, // 1 minute
            refetchInterval: 1000 * 60 * 5, // 5 minutos
        },
    );

    const invalidateQuery = async () => {
        //-- option 1
        const previousData = queryClient.getQueryData<LoteType[]>('getlotes');
        if (previousData) {
            const nextData = previousData.map(item => {
                if (item.id === 'abc') {
                    return {...item, property: 'new value'};
                } else {
                    return item;
                }
            });
            queryClient.setQueryData('getlotes', nextData);
        }

        //-- option 2: force new api request
        //await queryClient.invalidateQueries(['getlotes']);
    };

    return (
        <>
            <div id="sidebar">
                <h1>Menu - {auth.nome}</h1>

                {isFetching && <p>Carregando...</p>}
                <nav>
                    <ul>
                        {data?.map((item: any) => {
                            return (
                                <li key={item.id}>
                                    <Link to="lote/1">item.id</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            <div id="detail">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
