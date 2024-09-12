import useAuth from '@/hooks/useAuth';
import {useQuery, keepPreviousData} from '@tanstack/react-query';
import {CustomTable} from '@/components/general/CustomTable';
import {Button} from '@/components/ui/button';
import {APIQueryPaginationResponseType} from '@/types/generalTypes';
import {Label} from '@/components/ui/label';
import {useForm} from 'react-hook-form';
import {Link, useSearchParams} from 'react-router-dom';
import TextInput from '@/components/forms/TextInput';
import {getLotes} from '@/api/lote';
import {LoteSearchType, LoteType} from '@/types/lotesTypes';
import SelectBox from '@/components/forms/SelectBox';

export default function Lotes() {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const {auth, logout} = useAuth();

    const [searchParams, setSearchParams] = useSearchParams();
    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<LoteSearchType>();

    const filters = {
        numeroPagina: searchParams.get('p') ? Number(searchParams.get('p')) : 1,
        tamanhoPagina: searchParams.get('ps') ? Number(searchParams.get('ps')) : 15,
        ordenarPor: searchParams.get('sc') ? String(searchParams.get('sc')) : 'NumeroLote',
        ordenacao: searchParams.get('so') ? String(searchParams.get('so')) : 'asc',
        status: searchParams.get('s') ? String(searchParams.get('s')) : 0,
    } as LoteSearchType;

    const {data, isFetching, refetch} = useQuery<APIQueryPaginationResponseType<LoteType>>({
        queryKey: ['get-lotes', `${filters.status}`],
        queryFn: () => getLotes(filters, auth?.token),
        placeholderData: keepPreviousData,
        retry: 0,
        staleTime: 0,
        refetchInterval: 1000 * 60 * 15,
        throwOnError: () => {
            logout();
            return false;
        },
    });

    const handleSearch = (data: LoteSearchType) => {
        filters.pesquisa = data.pesquisa;
        filters.status = data.status;
        setSearchParams(params => {
            params.set('q', filters.pesquisa);
            params.set('p', String(filters.numeroPagina));
            params.set('ps', String(filters.tamanhoPagina));
            params.set('so', filters.ordenacao);
            params.set('sc', filters.ordenarPor);
            params.set('s', filters.status.toString());
            return params;
        });

        refetch();
    };

    const listaStatus = [
        {value: '1', text: 'Ativo'},
        {value: '2', text: 'Fechado'},
        {value: '0', text: 'Todos'},
    ];

    return (
        <div className="page-content">
            <div>
                <div>
                    <div className="page-title">
                        <h2>Lotes</h2>
                        <p>Pesquisa e acompanhamento de lotes.</p>
                    </div>

                    <form onSubmit={handleSubmit(handleSearch)} className="my-4">
                        <div className="form-row">
                            <TextInput label="Nome" divClassName="md:w-2/12" name="pesquisa" register={register('pesquisa')} />

                            <SelectBox
                                name="status"
                                label="Status"
                                subtitle="Selecione um status"
                                defaultValue={'0'}
                                divClassName="md:w-2/12"
                                control={control}
                                fieldError={errors.status}
                                items={listaStatus}
                            />

                            <div className="col sm:w-auto">
                                <Label>&nbsp;</Label>
                                <div>
                                    <Button type="submit" className="btn btn-secondary">
                                        Pesquisar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <CustomTable
                        config={[
                            {
                                header: '',
                                key: 'id',
                                width: '1px',
                                element: item => (
                                    <div className="flex">
                                        <Link to={`/lote/${item.id}`}>
                                            <Button className="btn btn-primary-outline mr-1">
                                                <i className="fal fa-pencil" />
                                            </Button>
                                        </Link>
                                    </div>
                                ),
                            },
                            {
                                width: '200px',
                                header: 'Lote',
                                key: 'numeroLote',
                                format: item => {
                                    return `#${item.numeroLote} - Aviário ${item.numeroAviario}`;
                                },
                            },
                            {width: '100px', header: 'Nr. Cama', key: 'numeroCama'},
                            {width: '100px', header: 'Intervalo', key: 'intervalo'},
                            {width: '200px', header: 'Técnico', key: 'nomeTecnico'},
                            {
                                width: '100px',
                                header: 'Data',
                                key: 'data',
                                format: item => {
                                    return dateFormat.format(new Date(item.data));
                                },
                            },
                            {
                                width: '100px',
                                header: 'Data',
                                key: 'dataAlteracao',
                                format: item => {
                                    return dateFormat.format(new Date(item.dataAlteracao));
                                },
                            },
                            {
                                width: '200px',
                                header: 'Status',
                                key: 'ativo',
                                format: item => {
                                    return item.status == 1 ? 'Ativo' : 'Fechado';
                                },
                            },
                        ]}
                        isFetching={isFetching}
                        data={data}
                        page={filters.numeroPagina}
                        pageSize={filters.tamanhoPagina}
                    />
                </div>
            </div>
        </div>
    );
}
