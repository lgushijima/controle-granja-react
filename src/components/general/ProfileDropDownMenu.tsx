import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useAuth from '@/hooks/useAuth';
import {User} from 'lucide-react';

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
                    <User size={38} className="rounded-full bg-white text-primary p-1" />
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
