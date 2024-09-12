import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
    print?: boolean;
}

const RacaoRecebidaLote = ({lote, print = false}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    let totalRecebido = 0;
    let totalEnviado = 0;
    let sobraLote = 0;
    sortArrayData(lote.racao, 'data', 'desc').forEach((racao: any) => {
        totalRecebido += racao.movimento == 1 ? racao.peso : 0;
        totalEnviado += racao.movimento == 2 ? racao.peso : 0;
    });

    if (!lote.racaoInfo) lote.racaoInfo = {};

    sobraLote = totalRecebido - totalEnviado - (lote.totalRacaoConsumido || 0);

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Ração Recebida</h2>
                </div>

                {!print && (
                    <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {lote.racao &&
                            sortArrayData(lote.racao, 'data', 'asc').map((i: any) => (
                                <div key={i.id} className="data-card with-title">
                                    <div>
                                        <label>{dateFormat.format(new Date(i.data))}</label>
                                        <span className="flex-1 justify-end">
                                            NF: #{i.notaFiscal}
                                            <i
                                                title={i.movimento == 1 ? 'Recebido' : 'Enviado'}
                                                className={`text-primary mx-1 fas ${
                                                    i.movimento == 1 ? 'fa-arrow-down' : 'fa-arrow-up'
                                                }`}></i>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="w-32">Tipo:</span>
                                        <label>{i.tipo}</label>
                                    </div>
                                    <div>
                                        <span className="w-32">Peso:</span>
                                        <label>{numberFormat.format(i.peso)}</label>
                                    </div>
                                    <div>
                                        <span className="w-32">Parceiro:</span>
                                        <label>{i.parceiro}</label>
                                    </div>
                                    <div>
                                        <span className="w-32">Obs.: </span>
                                        <label>{i.observacao}</label>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {print && (
                    <div className="data-card-wrapper table-wrapper">
                        <table className="table-data">
                            <thead>
                                <tr>
                                    <th className="w-28">Data:</th>
                                    <th className="w-28">Peso:</th>
                                    <th className="w-32">Nota Fiscal:</th>
                                    <th className="w-28">Tipo:</th>
                                    <th className="w-32">Parceiro:</th>
                                    <th className="">Observações:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lote.racao &&
                                    sortArrayData(lote.racao, 'data', 'asc').map((i: any) => (
                                        <tr key={i.id}>
                                            <td>{dateFormat.format(new Date(i.data))}</td>
                                            <td>{numberFormat.format(i.peso)}</td>
                                            <td>{i.notaFiscal}</td>
                                            <td>{i.tipo}</td>
                                            <td>{i.parceiro}</td>
                                            <td>{i.observacao}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {(!lote.racao || lote.racao.length == 0) && <p className="text-gray-400 p-2 text-sm italic">Nenhum registro encontrado.</p>}

                <div className="data-card-wrapper grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 mt-4">
                    <div className="data-card with-title">
                        <div>
                            <label>Total Geral</label>
                        </div>
                        <div>
                            <span className="w-64">Frangos para consumo próprio:</span>
                            <label>{numberFormat.format(lote.quantidadeConsumoProprio)}</label>
                        </div>
                        <div>
                            <span className="w-64">Sobra do lote anterior:</span>
                            <label>{numberFormat.format(lote.sobraRacaoLoteAnterior)}</label>
                        </div>
                        <div>
                            <span className="w-64">Total recebido:</span>
                            <label>{numberFormat.format(totalRecebido)}</label>
                        </div>
                        <div>
                            <span className="w-64">Total enviado:</span>
                            <label>{numberFormat.format(totalEnviado)}</label>
                        </div>
                        <div>
                            <span className="w-64">Total Consumido:</span>
                            <label>{numberFormat.format(lote.totalRacaoConsumido)}</label>
                        </div>
                        <div>
                            <span className="w-64">Sobra do lote atual:</span>
                            <label>{numberFormat.format(sobraLote)}</label>
                        </div>
                        <div>
                            <span className="w-64">Data de início do consumo de ração:</span>
                            <label>{lote.dataInicioConsumoRacao ? dateFormat.format(new Date(lote.dataInicioConsumoRacao)) : ''}</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RacaoRecebidaLote;
