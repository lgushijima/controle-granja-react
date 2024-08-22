import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
}

const RacaoRecebidaLote = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Ração Recebida</h2>
                </div>
                {!lote.racao && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                {lote.racao &&
                    sortArrayData(lote.racao, 'data', 'desc').map((i: any) => (
                        <div key={i.id} className="data-list">
                            <div>
                                <span>Data </span>
                                <label>{dateFormat.format(new Date(i.data))}</label>
                            </div>
                            <div>
                                <span>Nº Nota Fiscal </span>
                                <label>{i.notaFiscal}</label>
                            </div>
                            <div>
                                <span>Tipo de Ração </span>
                                <label>{i.tipo}</label>
                            </div>
                            <div>
                                <span>Peso </span>
                                <label>{numberFormat.format(Number(i.peso))}</label>
                            </div>
                            <div>
                                <span>Nome do Parceiro</span>
                                <label>{i.nomeParceiro}</label>
                            </div>
                            <div>
                                <span>Observações </span>
                                <label>{i.observacao}</label>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default RacaoRecebidaLote;
