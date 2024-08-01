import {axiosPrivate} from '@/api/axios';
import {useState} from 'react';
import useAuth from '@/hooks/useAuth';
import {useMutation, useQuery} from 'react-query';
import {CustomTable} from '@/components/general/CustomTable';
import {Button} from '@/components/ui/button';
import {UserType} from '@/types/userTypes';
import {LoaderCircle, Pencil, Trash2Icon} from 'lucide-react';
import {CustomAlertDialog} from '@/components/general/CustomAlertDialog';
import {AxiosError} from 'axios';
import {APIErrorType} from '@/types/generalTypes';
import {useAlertDialog} from '@/hooks/useAlertDialog';

export default function Usuarios() {
    const {auth} = useAuth();
    const {openAlertDialog, CustomAlertDialog} = useAlertDialog();
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const [pagina, setPagina] = useState(1);
    const [tamanhoPagina, setTamanhoPagina] = useState(3);
    const [ordenarPor, setOrdenarPor] = useState('Nome');
    const [ordenacao, setOrdenacao] = useState('asc');

    const {data, isFetching} = useQuery(
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
                    <CustomTable<UserType>
                        config={[
                            {
                                header: '',
                                key: 'actions',
                                width: '1px',
                                element: item => (
                                    <div className="flex">
                                        <Button onClick={() => handleClickMaroto(item)}>
                                            <Pencil size={18} strokeWidth={2} />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                //setIsConfirmationModalOpen(true);
                                                openAlertDialog(true, {
                                                    isOpen: true,
                                                    title: 'Oeee',
                                                    message: 'MAZaaaaaaaaaaaaaa',
                                                });
                                                setSelectedUser(item);
                                            }}
                                            variant={'destructive'}
                                            className="ml-1 bg-red-700 hover:bg-red-800">
                                            <Trash2Icon size={18} strokeWidth={1} />
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

                    <CustomAlertDialog />
                    {/* <CustomAlertDialog
                        isOpen={isConfirmationModalOpen}
                        onClose={() => {
                            setIsConfirmationModalOpen(!isConfirmationModalOpen);
                        }}
                        onConfirm={() => {
                            selectedUser && mutation.mutate(selectedUser);
                        }}
                        confirmElement={
                            mutation.isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin mr-2" /> Excluindo...
                                </>
                            ) : (
                                <span>Confirm</span>
                            )
                        }
                        title="Atenção!"
                        message={`Deseja realmente excluir este usuário: \"${selectedUser?.nome}\"`}
                    /> */}
                </div>
            </div>
        </div>
    );
}
