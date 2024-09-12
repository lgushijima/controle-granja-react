import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
    print?: boolean;
}

const Medicamentos = ({lote, print = false}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Medicamentos Terapêuticos</h2>
                </div>

                {!print && (
                    <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {lote.medicamento &&
                            sortArrayData(lote.medicamento, 'data', 'desc').map((i: any) => (
                                <div key={i.id} className="data-card with-title">
                                    <div>
                                        <span className="w-48">Data</span>
                                        <label>{dateFormat.format(new Date(i.data))}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Produto</span>
                                        <label>{i.produto}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Quantidade</span>
                                        <label>{numberFormat.format(i.quantidade)}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Partida</span>
                                        <label>{i.partida}</label>
                                    </div>

                                    <div>
                                        <span className="w-48">Dose</span>
                                        <label>{numberFormat.format(i.dose)}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Data de Validate</span>
                                        <label>{i.dataValidade ? dateFormat.format(new Date(i.dataValidade)) : ''}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Data de Início</span>
                                        <label>{i.dataInicio ? dateFormat.format(new Date(i.dataInicio)) : ''}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Data de Término</span>
                                        <label>{i.dataTermino ? dateFormat.format(new Date(i.dataTermino)) : ''}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Período de Carência</span>
                                        <label>{i.carencia}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Médico Veterinário</span>
                                        <label>{i.veterinario}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Responsável</span>
                                        <label>{i.responsavel}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Data</span>
                                        <label>{i.dataAplicacao ? dateFormat.format(new Date(i.dataAplicacao)) : ''}</label>
                                    </div>
                                    <div>
                                        <span className="w-48">Observações </span>
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
                                    <th className="w-32" rowSpan={2}>
                                        Data:
                                    </th>
                                    <th colSpan={4}>Produto</th>
                                    <th colSpan={4}>Data</th>
                                    <th colSpan={4}>Aplicação</th>
                                </tr>
                                <tr>
                                    <th className="w-48">Nome:</th>
                                    <th className="w-28">Qtde:</th>
                                    <th className="w-28">Partida:</th>
                                    <th className="w-24">Dose:</th>
                                    <th className="w-32">Validade:</th>
                                    <th className="w-32">Início:</th>
                                    <th className="w-32">Término:</th>
                                    <th className="w-28">Carência:</th>
                                    <th className="w-48">Veterinário:</th>
                                    <th className="w-48">Responsável:</th>
                                    <th className="w-32">Data:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lote.medicamento &&
                                    sortArrayData(lote.medicamento, 'data', 'asc').map((i: any) => (
                                        <tr key={i.id}>
                                            <td>{dateFormat.format(new Date(i.data))}</td>
                                            <td>{i.produto}</td>
                                            <td>{numberFormat.format(i.quantidade)}</td>
                                            <td>{i.partida}</td>
                                            <td>{numberFormat.format(i.dose)}</td>
                                            <td>{i.dataValidade ? dateFormat.format(new Date(i.dataValidade)) : ''}</td>
                                            <td>{i.dataInicio ? dateFormat.format(new Date(i.dataInicio)) : ''}</td>
                                            <td>{i.dataTermino ? dateFormat.format(new Date(i.dataTermino)) : ''}</td>
                                            <td>{i.carencia}</td>
                                            <td>{i.veterinario}</td>
                                            <td>{i.responsavel}</td>
                                            <td>{i.dataAplicacao ? dateFormat.format(new Date(i.dataAplicacao)) : ''}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {(!lote.medicamento || lote.medicamento.length == 0) && (
                    <p className="text-gray-400 p-2 text-sm italic">Nenhum registro encontrado.</p>
                )}
            </div>
        </section>
    );
};

export default Medicamentos;
