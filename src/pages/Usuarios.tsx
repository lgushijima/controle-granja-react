import {useState} from 'react';
import useAuth from '@/hooks/useAuth';
import {useMutation, useQuery, keepPreviousData} from '@tanstack/react-query';
import {CustomTable} from '@/components/general/CustomTable';
import {Button} from '@/components/ui/button';
import {UserSearchType, UserType} from '@/types/userTypes';
import {AxiosError} from 'axios';
import {APIErrorType, APIQueryPaginationResponseType} from '@/types/generalTypes';
import useAlertDialog from '@/hooks/useAlertDialog';
import {UsuarioCadastroModal} from './UsuarioCadastroModal';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {useForm} from 'react-hook-form';
import {useSearchParams} from 'react-router-dom';
import {deleteUser, getUsers} from '@/api/user';
import TextInput from '@/components/forms/TextInput';

export default function Usuarios() {
    const {auth, logout} = useAuth();
    const {openAlertDialog, closeAlertDialog, openAlertDialogLoading, openAlertDialogConfirmation} = useAlertDialog();
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [isUsuarioModalOpen, setIsUsuarioModalOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const {register, handleSubmit} = useForm<UserSearchType>();

    const filters = {
        numeroPagina: searchParams.get('p') ? Number(searchParams.get('p')) : 1,
        tamanhoPagina: searchParams.get('ps') ? Number(searchParams.get('ps')) : 15,
        ordenarPor: searchParams.get('sc') ? String(searchParams.get('sc')) : 'Nome',
        ordenacao: searchParams.get('so') ? String(searchParams.get('so')) : 'asc',
    } as UserSearchType;

    const {data, isFetching, refetch} = useQuery<APIQueryPaginationResponseType<UserType>>({
        queryKey: ['get-usuarios', filters],
        queryFn: () => getUsers(filters, auth?.token),
        placeholderData: keepPreviousData,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 1 minute
        refetchInterval: 1000 * 60 * 15, // 15 minutes
        throwOnError: (data, err) => {
            logout();
            return false;
        },
    });

    const mutation = useMutation<boolean, AxiosError<APIErrorType>, UserType>({
        mutationFn: data => deleteUser(data, auth?.token),
        onSuccess: (_, variables, context) => {
            closeAlertDialog();
            refetch();
        },
        onError: err => {
            openAlertDialog({
                title: 'Oops!',
                titleClassName: 'text-red-700',
                subtitle: 'Não foi possível completar esta ação.',
                message: err?.response?.data ? err.response.data?.error : 'Ocorreu um erro ao tentar salvar os dados informados.',
                enableClose: true,
            });
        },
    });

    const handleCloseDialog = () => {
        setIsUsuarioModalOpen(false);
        setSelectedUser(null);
    };

    const handleSearch = (data: UserSearchType) => {
        filters.pesquisa = data.pesquisa;
        setSearchParams(params => {
            params.set('q', filters.pesquisa);
            params.set('p', String(filters.numeroPagina));
            params.set('ps', String(filters.tamanhoPagina));
            params.set('so', filters.ordenacao);
            params.set('sc', filters.ordenarPor);
            return params;
        });

        refetch();
    };

    const handleNewClick = () => {
        setSelectedUser({ativo: true} as UserType);
        setIsUsuarioModalOpen(true);
    };

    return (
        <div className="m-5">
            <div className="p-5 bg-white rounded-2xl">
                <div className="page-title">
                    <h2>Gerenciamento de Usuários</h2>
                    <p>Cadastre novos usuários, edite dados existentes, exclua registros, gerencie permissões.</p>
                </div>

                <div>
                    <form onSubmit={handleSubmit(handleSearch)}>
                        <div className="mt-4 mb-10">
                            <div className="form-row">
                                <TextInput label="Nome" divClassName="md:w-2/12" name="pesquisa" register={register('pesquisa')} />

                                <div className="col sm:w-auto">
                                    <Label>&nbsp;</Label>
                                    <div>
                                        <Button type="submit" className="btn btn-secondary">
                                            Pesquisar
                                        </Button>
                                    </div>
                                </div>
                                <div className="col flex-1 self-end text-right">
                                    <Label>&nbsp;</Label>
                                    <div>
                                        <Button type="button" onClick={handleNewClick} className="btn btn-primary">
                                            <i className="fas fa-plus mr-2"></i>Cadastrar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
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
                                            className="btn btn-primary-outline mr-1"
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
                                            className="btn btn-danger-outline">
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
                        page={filters.numeroPagina}
                        pageSize={filters.tamanhoPagina}
                        onPageClick={(p: number) => {
                            //setPagina(p);
                        }}
                    />
                </div>
            </div>

            {selectedUser && (
                <UsuarioCadastroModal
                    isOpen={isUsuarioModalOpen}
                    selectedUser={selectedUser}
                    onClose={handleCloseDialog}
                    onSuccess={data => {
                        refetch();
                    }}
                />
            )}
        </div>
    );
}
