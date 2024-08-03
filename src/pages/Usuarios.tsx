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
import {UsuarioCadastroModal} from './UsuarioCadastroModal';

export default function Usuarios() {
    const {auth} = useAuth();
    const {openAlertDialog, closeAlertDialog, openAlertDialogLoading, openAlertDialogConfirmation} = useAlertDialog();
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [isUsuarioModalOpen, setIsUsuarioModalOpen] = useState(false);

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
        onSuccess: () => {
            closeAlertDialog();
        },
        onError: err => {
            openAlertDialog({
                title: 'Oops!',
                titleClassName: 'text-red-700',
                subtitle: 'Não foi possível completar esta ação.',
                message: err?.response?.data
                    ? err.response.data?.error
                    : 'Ocorreu um erro ao tentar salvar os dados informados.',
                enableClose: true,
            });
        },
    });

    const handleCloseDialog = () => {
        setIsUsuarioModalOpen(false);
        setSelectedUser(null);
    };

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
                                        <Button
                                            onClick={() => {
                                                setSelectedUser(item);
                                                setIsUsuarioModalOpen(true);
                                            }}>
                                            <i className="fal fa-pencil" />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                console.log(item);
                                                setSelectedUser(item);
                                                openAlertDialogConfirmation({
                                                    reference: item.nome,
                                                    onConfirm: () => {
                                                        openAlertDialogLoading();
                                                        mutation.mutate(item);
                                                        return false;
                                                    },
                                                });
                                            }}
                                            variant={'destructive'}
                                            className="ml-1 bg-red-300 hover:bg-red-400">
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

            {selectedUser && (
                <UsuarioCadastroModal
                    isOpen={isUsuarioModalOpen}
                    selectedUser={selectedUser}
                    onClose={handleCloseDialog}
                />
            )}
        </div>
    );
}
