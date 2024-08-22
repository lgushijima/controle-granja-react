interface Props {
    lote: any;
}

const VacinaLote = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Vacinas</h2>
                </div>
                {!lote.vacina && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                {lote.vacina &&
                    lote.vacina.map((i: any) => (
                        <div key={i.id} className="data-list">
                            <div>
                                <span>Vacinas no Incubatório e Campo </span>
                                <label>{i.doenca}</label>
                            </div>
                            <div>
                                <span>Partida </span>
                                <label>{i.partida}</label>
                            </div>
                            <div>
                                <span>Dose</span>
                                <label>{numberFormat.format(Number(i.dose))}</label>
                            </div>
                            <div>
                                <span>Fornecedor </span>
                                <label>{i.fornecedor}</label>
                            </div>
                            <div>
                                <span>Observações</span>
                                <label>{i.observacao}</label>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default VacinaLote;
