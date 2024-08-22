import {getLote} from '@/api/lote';
import AcoesTomadas from '@/components/lote/AcoesTomadas';
import CarregamentoLote from '@/components/lote/CarregamentoLote';
import ChartConsumoAgua from '@/components/lote/ChartConsumoAgua';
import ChartMortalidade from '@/components/lote/ChartMortalidade';
import ChartPesagem from '@/components/lote/ChartPesagem';
import ChartTemperatura from '@/components/lote/ChartTemperatura';
import ChartUmidade from '@/components/lote/ChartUmidade';
import ConsumoAgua from '@/components/lote/ConsumoAgua';
import ControlePHeCloro from '@/components/lote/ControlePHeCloro';
import FormacaoLote from '@/components/lote/FormacaoLote';
import InformacaoLote from '@/components/lote/InformacaoLote';
import Medicamentos from '@/components/lote/Medicamentos';
import MortalidadeDiaria from '@/components/lote/MortalidadeDiaria';
import PesagemLote from '@/components/lote/PesagemLote';
import ProdutoQuimico from '@/components/lote/ProdutoQuimico';
import RacaoRecebidaLote from '@/components/lote/RacaoRecebidaLote';
import VacinaLote from '@/components/lote/VacinaLote';
import useAlertDialog from '@/hooks/useAlertDialog';
import useAuth from '@/hooks/useAuth';
import {sortArrayData} from '@/lib/utils';
import {LoteType} from '@/types/lotesTypes';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';

const LoteDetalhe = () => {
    let {loteId} = useParams();
    const {auth, logout} = useAuth();
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');
    // const {openAlertDialog, closeAlertDialog, openAlertDialogLoading} = useAlertDialog();

    if (!loteId) return;

    const {data, isFetching} = useQuery<LoteType>({
        queryKey: ['get-lote', loteId],
        queryFn: () => getLote(loteId, auth?.token),
        placeholderData: keepPreviousData,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 1 minute
        refetchInterval: 1000 * 60 * 15, // 15 minutes
        throwOnError: (data, err) => {
            logout();
            return false;
        },
    });

    if (!data) return;

    const {lote, parceiro, atualizado} = data;
    const jsonLote = JSON.parse(lote);
    const jsonParceiro = JSON.parse(parceiro);

    console.log(jsonLote);
    console.log(jsonParceiro);
    return (
        <div className="p-5">
            <InformacaoLote lote={jsonLote} parceiro={jsonParceiro} data={atualizado} />
            <CarregamentoLote lote={jsonLote} />
            <FormacaoLote lote={jsonLote} />
            <VacinaLote lote={jsonLote} />
            <RacaoRecebidaLote lote={jsonLote} />
            <PesagemLote lote={jsonLote} />
            <ControlePHeCloro lote={jsonLote} />
            <MortalidadeDiaria lote={jsonLote} />
            <ConsumoAgua lote={jsonLote} />
            <ProdutoQuimico lote={jsonLote} />
            <Medicamentos lote={jsonLote} />
            <ChartPesagem lote={jsonLote} />
            <ChartMortalidade lote={jsonLote} />
            <ChartTemperatura lote={jsonLote} />
            <ChartConsumoAgua lote={jsonLote} />
            <ChartUmidade lote={jsonLote} />
            <AcoesTomadas lote={jsonLote} />
        </div>
    );
};

export default LoteDetalhe;
