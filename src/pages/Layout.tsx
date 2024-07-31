import {Link, Outlet} from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import {useQuery, useQueryClient} from 'react-query';
import {axiosPrivate} from '@/api/axios';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {Menu, LoaderCircle, Home, Sheet, Users, Settings} from 'lucide-react';
import ProfileDropDownMenu from '@/components/general/ProfileDropDownMenu';

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
                headers: {Authorization: `bearer ${auth?.token}`},
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
                    <div className="flex items-center justify-between font-semibold text-white py-2">
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
                            <ProfileDropDownMenu />
                        </div>
                    </div>
                </div>

                <div className="relative flex-1 ">
                    <div
                        id="sidebar"
                        className={`absolute bg-white py-2 h-full w-72 transition-all z-20 ${
                            menuOpen ? 'ml-0' : '-ml-72'
                        }`}>
                        <nav className="relative text-gray-700 font-medium">
                            <ul>
                                <li>
                                    <Link
                                        to={`/`}
                                        className="flex items-center pl-5 py-2 transition-all hover:bg-neutral-100 relative">
                                        <Home size={20} strokeWidth={1} className="mr-2" /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`lotes`}
                                        className="flex items-center pl-5 py-2 transition-all hover:bg-neutral-100 relative">
                                        <Sheet size={20} strokeWidth={1} className="mr-2" /> Lotes
                                        {isFetching && (
                                            <LoaderCircle size={12} className="absolute top-3 right-2 animate-spin" />
                                        )}
                                    </Link>

                                    <ul className="mb-2">
                                        {data?.map((item: any) => {
                                            return (
                                                <li key={item.id} className="">
                                                    <Link
                                                        to={`lote/${item.id}`}
                                                        className="block pl-14 py-1 font-normal transition-all hover:bg-neutral-100">
                                                        Lote {item.numeroLote} - Aviário {item.numeroAviario}
                                                        <span className="block text-xs">{item.dataModificacao}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <Link
                                        to={`usuarios`}
                                        className="flex items-center pl-5 py-2 transition-all hover:bg-neutral-100">
                                        <Users size={20} strokeWidth={1} className="mr-2" /> Usuários
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`conta`}
                                        className="flex items-center pl-5 py-2 transition-all hover:bg-neutral-100">
                                        <Settings size={20} strokeWidth={1} className="mr-2" /> Configurações da Conta
                                    </Link>
                                </li>
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