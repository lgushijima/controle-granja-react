import {axiosPrivate} from '@/api/axios';
import {useState} from 'react';
import useAuth from '@/hooks/useAuth';
import {useQuery} from 'react-query';
import {CustomTable} from '@/components/general/CustomTable';
import {Button} from '@/components/ui/button';

export default function Usuarios() {
    const {auth} = useAuth();
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

    const handleClickMaroto = (item: object) => {
        console.log(item);
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
                                element: item => <Button onClick={() => handleClickMaroto(item)}>Delete</Button>,
                            },
                            {header: 'Nome', key: 'nome'},
                            {header: 'Login', key: 'login'},
                            {header: 'Perfil', key: 'perfil'},
                            {header: 'Status', key: 'status'},
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
