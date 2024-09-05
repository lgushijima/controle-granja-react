import {Link, Outlet, useLocation} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import ProfileDropDownMenu from '@/components/general/ProfileDropDownMenu';
import {useReactQuery} from '@/hooks/useReactQuery';

type LoteType = {
    id: string;
    numeroLote: number;
    numeroAviario: number;
    dataAlteracao: string;
};

const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const location = useLocation();
    const {data, isFetching, error} = useReactQuery<LoteType[]>({key: ['get-lotes'], endpoint: 'api/Lotes/buscarLotes'});

    // const invalidateQuery = async () => {
    //     //-- option 1
    //     const previousData = queryClient.getQueryData<LoteType[]>(['getlotes']);
    //     if (previousData) {
    //         const nextData = previousData.map(item => {
    //             if (item.id === 'abc') {
    //                 return {...item, property: 'new value'};
    //             } else {
    //                 return item;
    //             }
    //         });
    //         queryClient.setQueryData(['getlotes'], nextData);
    //     }

    //     //-- option 2: force new api request
    //     //await queryClient.invalidateQueries(['getlotes']);
    // };

    const isMenuActive = (path: string, startsWith: string = '') => {
        if (startsWith) return location.pathname.startsWith(startsWith) ? 'active' : '';
        else return location.pathname == path ? 'active' : '';
    };

    return (
        <div className="main-content">
            <div className="header-wrapper">
                <div className="">
                    <div className="header-left">
                        <Button
                            variant={'link'}
                            className="text-white hover:no-underline"
                            onClick={() => {
                                setMenuOpen(!menuOpen);
                            }}>
                            <i className="fal fa-bars text-2xl" />
                        </Button>
                        <img src="/images/logo.png" className="w-16" />
                        <h2>CONTROLE DE GRANJA</h2>
                    </div>
                    <div className="header-right">
                        <ProfileDropDownMenu />
                    </div>
                </div>
            </div>

            <div className="body-content">
                <div id="sidebar" className={`sidebar ${menuOpen ? 'ml-0' : '-ml-72'}`}>
                    <nav>
                        <ul>
                            <li>
                                <Link to={`/`} className={isMenuActive('/')}>
                                    <i className="fal fa-home" /> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to={`lotes`} className={isMenuActive('/lotes', '/lote')}>
                                    <i className="fal fa-clipboard-list-check" /> Lotes
                                    {isFetching && <i className="fal fa-spinner fa-spin absolute top-3 right-2 " />}
                                </Link>
                                {(!data || (data && data.length == 0)) && (
                                    <div className="text-center text-gray-400">
                                        <span className="font-normal text-xs italic">Nenhum lote encontrado.</span>
                                    </div>
                                )}
                                {data && data.length > 0 && (
                                    <ul>
                                        {data.map((item: any) => {
                                            const isActive = location.pathname == `/lote/${item.id}`;
                                            return (
                                                <li key={item.id}>
                                                    <Link to={`lote/${item.id}`} className={isActive ? 'active' : ''}>
                                                        Lote {item.numeroLote} - Aviário {item.numeroAviario}
                                                        <span>{item.dataAlteracao}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                            <li>
                                <Link to={`relatorios`} className={isMenuActive('/relatorios')}>
                                    <i className="fal fa-chart-line" /> Relatórios
                                </Link>
                            </li>
                            <li>
                                <Link to={`usuarios`} className={isMenuActive('/usuarios')}>
                                    <i className="fal fa-users" /> Usuários
                                </Link>
                            </li>
                            <li>
                                <Link to={`conta`} className={isMenuActive('/conta')}>
                                    <i className="fal fa-cogs" /> Configurações da Conta
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className={`page-wrapper ${menuOpen ? 'ml-72' : 'ml-0'}`}>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
