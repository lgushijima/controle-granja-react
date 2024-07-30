import {Link, Outlet} from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import {useQuery, useQueryClient} from 'react-query';
import {axiosPrivate} from '@/api/axios';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {Menu} from 'lucide-react';

type LoteType = {
    id: string;
    numeroLote: number;
    numeroAviario: number;
    dataModificacao: string;
};

const Layout = () => {
    const {auth} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const queryClient = useQueryClient();
    const {data, isFetching} = useQuery<LoteType[]>(
        'getlotes',
        async () => {
            const response = await axiosPrivate.get('api/Lotes/buscarLotes?ativo=true', {
                headers: {Authorization: `bearer ${auth.token}`},
            });
            return response.data;
        },
        {
            //refetchOnWindowFocus: true,
            staleTime: 1000 * 60 * 5, // 1 minute
            refetchInterval: 1000 * 60 * 15, // 5 minutos
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
            <div className="flex h-full flex-col">
                <div className="bg-primary px-5">
                    <div className="flex items-center justify-between font-semibold text-white">
                        <div className="flex items-center">
                            <Button
                                variant={'link'}
                                className="text-white"
                                onClick={() => {
                                    setMenuOpen(!menuOpen);
                                }}>
                                <Menu />
                            </Button>
                            <img src="/images/logo.png" className="w-16" />
                            <h2 className="text-xl">CONTROLE DE GRANJA</h2>
                        </div>
                        <div className="flex items-center">
                            <p className="font-semibold text-white mr-5">Olá {auth.nome}!</p>
                            <Button variant={'secondary'}>Sair</Button>
                        </div>
                    </div>
                </div>

                <div className="relative flex-1 ">
                    <div
                        id="sidebar"
                        className={`absolute bg-white p-5 h-full w-72 transition-all z-20 ${
                            menuOpen ? 'ml-0' : '-ml-72'
                        }`}>
                        {isFetching && <p>Carregando...</p>}
                        <nav>
                            <ul>
                                {data?.map((item: any) => {
                                    return (
                                        <li key={item.id}>
                                            <Link to={`lote/${item.id}`}>
                                                Lote {item.numeroLote} - Aviário {item.numeroAviario}
                                                <div className="text-xs">{item.dataModificacao}</div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>

                    <div className={`flex h-full relative transition-all ${menuOpen ? 'ml-72' : 'ml-0'}`}>
                        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-x-hidden overflow-y-auto z-10">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
