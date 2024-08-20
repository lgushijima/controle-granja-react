import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useAuth from '@/hooks/useAuth';

const ProfileDropDownMenu = () => {
    const {auth, logout} = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center ">
                    <p className="mr-3">Olá {auth?.nome}!</p>
                    <div className="user-dropdown">
                        <i className="fal fa-user text-2xl " />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mr-5">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Alterar Senha</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropDownMenu;
