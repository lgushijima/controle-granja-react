import {axiosPrivate} from '@/api/axios';
import {useState} from 'react';
import useAuth from '@/hooks/useAuth';
import {useMutation, useQuery} from 'react-query';
import {CustomTable} from '@/components/general/CustomTable';
import {Button} from '@/components/ui/button';
import {UserType} from '@/types/userTypes';
import {AxiosError} from 'axios';
import {APIErrorType, APIQueryPaginationResponseType} from '@/types/generalTypes';
import useAlertDialog from '@/hooks/useAlertDialog';

export default function Usuarios() {
    const {auth} = useAuth();
    const {openAlertDialog} = useAlertDialog();
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const [pagina, setPagina] = useState(1);
    const [tamanhoPagina] = useState(15);
    const [ordenarPor] = useState('Nome');
    const [ordenacao] = useState('asc');

    const {data, isFetching} = useQuery<APIQueryPaginationResponseType<UserType>>(
        `get-usuarios-${pagina}-${ordenarPor}-${ordenacao}`,
        async () => {
            const response = await axiosPrivate.get(
                `api/Usuarios/ListarGrid?ordenarPor=${ordenarPor}&ordenacao=${ordenacao}&tamanhoPagina=${tamanhoPagina}&numeroPagina=${pagina}`,
                {
                    headers: {Authorization: `bearer ${auth?.token}`},
                },
            );
            return response.data;
        },
        {
            keepPreviousData: true,
            staleTime: 1000 * 60 * 5, // 1 minute
            refetchInterval: 1000 * 60 * 15, // 5 minutos
        },
    );

    const mutation = useMutation<boolean, AxiosError<APIErrorType>, UserType>({
        mutationFn: data => {
            return axiosPrivate
                .post('api/Usuarios/Excluir', data, {
                    headers: {Authorization: `bearer ${auth?.token}`},
                })
                .then(response => response.data);
        },
        onSuccess: data => {
            setIsConfirmationModalOpen(false);
        },
        onError: err => {
            setIsConfirmationModalOpen(false);
        },
    });

    const handleClickMaroto = (item: UserType) => {
        console.log(item);
    };

    console.log('RENDERIZOU');

    return (
        <div className="m-5">
            <div className="p-5 bg-white rounded-2xl">
                <h2 className="text-xl font-semibold">Gerenciamento de Usuários</h2>
                <p>Cadastre novos usuários, edite dados existentes, exclua registros, gerencie permissões.</p>

                <div className="mt-5">
                    <CustomTable
                        config={[
                            {
                                header: '',
                                key: 'actions',
                                width: '1px',
                                element: item => (
                                    <div className="flex">
                                        <Button onClick={() => handleClickMaroto(item)}>
                                            <i className="fal fa-pencil" />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setSelectedUser(item);
                                                openAlertDialog(true, {
                                                    title: 'Atenção!',
                                                    subtitle: 'Confirme a ação antes de prosseguir',
                                                    message: (
                                                        <label>
                                                            Deseja realmente <b>EXCLUIR</b> este usuário:
                                                            <b className="ml-1 uppercase">{item.nome}</b> ?
                                                        </label>
                                                    ),
                                                    enableClose: true,
                                                    closeText: 'Cancelar',
                                                    enableConfirm: true,
                                                    confirmText: 'EXCLUIR',
                                                    onConfirm: () => {
                                                        openAlertDialog(true, {
                                                            title: 'Aguarde!',
                                                            subtitle: 'Este processo pode demorar alguns instantes',
                                                            message: 'Processando dados...',
                                                        });
                                                        setTimeout(() => {
                                                            openAlertDialog(false);
                                                        }, 5000);
                                                        return false;
                                                    },
                                                });
                                            }}
                                            variant={'destructive'}
                                            className="ml-1 bg-red-700 hover:bg-red-800">
                                            <i className="fal fa-trash-alt" />
                                        </Button>
                                    </div>
                                ),
                            },
                            {width: '200px', header: 'Nome', key: 'nome'},
                            {width: '200px', header: 'Login', key: 'login'},
                            {width: '200px', header: 'Perfil', key: 'perfil'},
                            {
                                width: '200px',
                                header: 'Status',
                                key: 'ativo',
                                format: item => {
                                    return item.ativo ? 'Ativo' : 'Inativo';
                                },
                            },
                        ]}
                        isFetching={isFetching}
                        data={data}
                        page={pagina}
                        pageSize={tamanhoPagina}
                        onPageClick={(p: number) => {
                            setPagina(p);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
