import {getLote} from '@/api/lote';
import CarregamentoLote from '@/components/lote/CarregamentoLote';
import ChartAcoesTomadas from '@/components/lote/ChartAcoesTomadas';
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
import useAuth from '@/hooks/useAuth';
import {LoteType} from '@/types/lotesTypes';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';

const LoteDetalhe = () => {
    let {loteId} = useParams();
    const {auth, logout} = useAuth();
    // const {openAlertDialog, closeAlertDialog, openAlertDialogLoading} = useAlertDialog();

    if (!loteId) return;

    const {data} = useQuery<LoteType>({
        queryKey: ['get-lote', loteId],
        queryFn: () => getLote(loteId, auth?.token),
        placeholderData: keepPreviousData,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 1 minute
        refetchInterval: 1000 * 60 * 15, // 15 minutes
        throwOnError: () => {
            logout();
            return false;
        },
    });

    if (!data) return;

    console.log(data);
    return (
        <div className="p-5">
            <InformacaoLote lote={data} parceiro={data.cliente} data={data.dataModificacao} />
            <CarregamentoLote lote={data} />
            <FormacaoLote lote={data} />
            <VacinaLote lote={data} />
            <RacaoRecebidaLote lote={data} />
            <PesagemLote lote={data} />
            <ControlePHeCloro lote={data} />
            <MortalidadeDiaria lote={data} />
            <ConsumoAgua lote={data} />
            <ProdutoQuimico lote={data} />
            <Medicamentos lote={data} />
            <ChartPesagem lote={data} />
            <ChartMortalidade lote={data} />
            <ChartTemperatura lote={data} />
            <ChartConsumoAgua lote={data} />
            <ChartUmidade lote={data} />
            <ChartAcoesTomadas lote={data} />
        </div>
    );
};

export default LoteDetalhe;
