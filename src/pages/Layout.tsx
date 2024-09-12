import {Link, Outlet, useLocation} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import ProfileDropDownMenu from '@/components/general/ProfileDropDownMenu';

const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const location = useLocation();

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
                                </Link>
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
