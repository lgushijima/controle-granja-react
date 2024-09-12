import {getExportLote} from '@/api/lote';
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
import {LoteType} from '@/types/lotesTypes';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';

const ExportLoteDetalhe = () => {
    let {key} = useParams();
    if (!key) return;

    const {data} = useQuery<LoteType>({
        queryKey: ['export-lote', key],
        queryFn: () => getExportLote(key),
        placeholderData: keepPreviousData,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 1 minute
        refetchInterval: 1000 * 60 * 15, // 15 minutes
        throwOnError: () => {
            return false;
        },
    });

    document.querySelector('body')?.classList.add('print');
    const print = true;

    if (!data) return;

    return (
        <div className="p-5">
            <InformacaoLote lote={data} parceiro={data.cliente} data={data.dataAlteracao} print={print} />
            <CarregamentoLote lote={data} print={print} />
            <FormacaoLote lote={data} print={print} />
            <PesagemLote lote={data} print={print} />

            <RacaoRecebidaLote lote={data} print={print} />
            <ControlePHeCloro lote={data} print={print} />
            <VacinaLote lote={data} print={print} />
            <ProdutoQuimico lote={data} print={print} />
            <Medicamentos lote={data} print={print} />

            <MortalidadeDiaria lote={data} print={print} />
            <ConsumoAgua lote={data} print={print} />

            <ChartMortalidade lote={data} print={print} />
            <ChartPesagem lote={data} print={print} />
            <ChartTemperatura lote={data} print={print} />
            <ChartConsumoAgua lote={data} print={print} />
            <ChartUmidade lote={data} print={print} />
            <ChartAcoesTomadas lote={data} print={print} />
        </div>
    );
};

export default ExportLoteDetalhe;
