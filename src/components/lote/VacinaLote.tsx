interface Props {
    lote: any;
    print?: boolean;
}

const VacinaLote = ({lote, print = false}: Props) => {
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Vacinas</h2>
                </div>

                {!print && (
                    <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
                )}

                {print && (
                    <div className="data-card-wrapper table-wrapper">
                        <table className="table-data">
                            <thead>
                                <tr>
                                    <th className="w-32">Doença:</th>
                                    <th className="w-32">Partida:</th>
                                    <th className="w-28">Dose:</th>
                                    <th className="w-48">Fornecedor:</th>
                                    <th className="">Observações:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lote.vacina.map((i: any) => (
                                    <tr key={i.id}>
                                        <td>{i.doenca}</td>
                                        <td>{i.partida}</td>
                                        <td>{numberFormat.format(i.dose)}</td>
                                        <td>{i.fornecedor}</td>
                                        <td>{i.observacao}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {(!lote.vacina || lote.vacina.length == 0) && (
                    <p className="text-gray-400 p-2 text-sm italic">Nenhum registro encontrado.</p>
                )}
            </div>
        </section>
    );
};

export default VacinaLote;
