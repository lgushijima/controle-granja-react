import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
}

const Medicamentos = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Medicamentos Terapêuticos</h2>
                </div>
                {!lote.medicamento && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                {lote.medicamento &&
                    sortArrayData(lote.medicamento, 'data', 'desc').map((i: any) => (
                        <div key={i.id} className="data-list">
                            <div>
                                <span>Data</span>
                                <label>{dateFormat.format(i.data)}</label>
                            </div>
                            <div>
                                <span>Produto</span>
                                <label>{i.produto}</label>
                            </div>
                            <div>
                                <span>Quantidade</span>
                                <label>{numberFormat.format(Number(i.quantidade))}</label>
                            </div>
                            <div>
                                <span>Partida</span>
                                <label>{i.partida}</label>
                            </div>

                            <div>
                                <span>Dose</span>
                                <label>{numberFormat.format(Number(i.dose))}</label>
                            </div>
                            <div>
                                <span>Data de Validate</span>
                                <label>{dateFormat.format(i.dataValidade)}</label>
                            </div>
                            <div>
                                <span>Data de Início</span>
                                <label>{dateFormat.format(i.dataInicio)}</label>
                            </div>
                            <div>
                                <span>Data de Término</span>
                                <label>{dateFormat.format(i.dataTermino)}</label>
                            </div>
                            <div>
                                <span>Período de Carência</span>
                                <label>{i.diluicao}</label>
                            </div>
                            <div>
                                <span>Médico Veterinário</span>
                                <label>{i.veterinario}</label>
                            </div>
                            <div>
                                <span>Responsável</span>
                                <label>{i.respExecusao}</label>
                            </div>
                            <div>
                                <span>Data</span>
                                <label>{dateFormat.format(i.dataExecucao)}</label>
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

export default Medicamentos;