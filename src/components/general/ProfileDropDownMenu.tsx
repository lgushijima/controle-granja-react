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

    const getPerfil = () => {
        const perfil = auth?.perfil;
        switch (perfil) {
            case 'granjeiro':
                return 'Granjeiro';
            case 'proprietario':
                return 'Proprietário';
            case 'tecnico':
                return 'Técnico';
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center ">
                    <div className="leading-4 text-right mr-3">
                        <p className="">Olá {auth?.nome}!</p>
                        <p className="text-sm font-normal">({getPerfil()})</p>
                    </div>
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
