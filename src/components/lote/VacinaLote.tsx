interface Props {
    lote: any;
}

const VacinaLote = ({lote}: Props) => {
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Vacinas</h2>
                </div>
                <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {!lote.vacina && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                    {lote.vacina &&
                        lote.vacina.map((i: any) => (
                            <div key={i.id} className="data-card with-title">
                                <div>
                                    <label>{i.doenca}</label>
                                </div>
                                <div>
                                    <span className="w-24">Partida:</span>
                                    <label>{i.partida}</label>
                                </div>
                                <div>
                                    <span className="w-24">Dose:</span>
                                    <label>{numberFormat.format(Number(i.dose))}</label>
                                </div>
                                <div>
                                    <span className="w-24">Fornecedor:</span>
                                    <label>{i.fornecedor}</label>
                                </div>
                                <div>
                                    <span className="w-24">OBs.:</span>
                                    <label>{i.observacao}</label>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default VacinaLote;
