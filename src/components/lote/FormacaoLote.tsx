interface Props {
    lote: any;
    print?: boolean;
}

const FormacaoLote = ({lote, print = false}: Props) => {
    const numberFormat = new Intl.NumberFormat('pt-BR');

    let totalProgramado = 0;
    let totalAlojado = 0;
    if (lote.formacao) {
        lote.formacao.forEach((l: any) => {
            totalProgramado += Number(l.quantidadeProgramado) || 0;
            totalAlojado += Number(l.quantidadeAlojado) || 0;
        });
    }

    const getSexo = (id: number) => {
        switch (id) {
            case 1:
                return 'Macho';
            case 2:
                return 'Fêmea';
            case 3:
                return 'Misto';
        }
    };

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Formação do Lote</h2>
                </div>

                {!print && (
                    <div className="data-card-wrapper grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                        {lote.formacao.map((i: any, idx: number) => (
                            <div key={i.id} className="data-card with-title">
                                <div>
                                    <label>{idx + 1}.</label>
                                </div>
                                <div>
                                    <span className="w-64">Lote Recria: </span>
                                    <label>{i.loteRecria}</label>
                                </div>
                                <div>
                                    <span className="w-64">Recria Certificada Global: </span>
                                    <label>{i.recriaCertGlobal ? 'Sim' : 'Não'}</label>
                                </div>
                                <div>
                                    <span className="w-64">Lote Produção: </span>
                                    <label>{i.loteProducao}</label>
                                </div>
                                <div>
                                    <span className="w-64">Prod. Certificada Global: </span>
                                    <label>{i.producaoCertGlobal ? 'Sim' : 'Não'}</label>
                                </div>
                                <div>
                                    <span className="w-64">Programado: </span>
                                    <label>{numberFormat.format(i.quantidadeProgramado)}</label>
                                </div>
                                <div>
                                    <span className="w-64">Alojado: </span>
                                    <label>{numberFormat.format(i.quantidadeAlojado)}</label>
                                </div>
                                <div>
                                    <span className="w-64">Idade da Matriz: </span>
                                    <label>{i.idadeMatriz}</label>
                                </div>
                                <div>
                                    <span className="w-64">Linhagem: </span>
                                    <label>{i.linhagem}</label>
                                </div>
                                <div>
                                    <span className="w-64">Sexo: </span>
                                    <label>{getSexo(i.sexo)}</label>
                                </div>
                                <div>
                                    <span className="w-64">Origem:</span>
                                    <label>{i.origem}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {print && (
                    <div className="data-card-wrapper">
                        <table className="table-data">
                            <thead>
                                <tr>
                                    <th className="w-8" rowSpan={2}></th>
                                    <th colSpan={2}>Lote</th>
                                    <th colSpan={2}>Quantidade</th>
                                    <th colSpan={4}>Detalhes</th>
                                </tr>
                                <tr>
                                    <th className="w-36">Recria:</th>
                                    <th className="w-36">Produção:</th>
                                    <th className="w-32">Programado:</th>
                                    <th className="w-32">Alojado:</th>
                                    <th className="w-32">Idade Matriz:</th>
                                    <th className="w-32">Linhagem:</th>
                                    <th className="w-24">Sexo:</th>
                                    <th>Origem:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lote.formacao.map((i: any, idx: number) => (
                                    <tr key={i.id}>
                                        <td className="text-center">{idx + 1}</td>
                                        <td>
                                            {i.loteRecria}
                                            <br />
                                            {i.recriaCertGlobal ? (
                                                <span className="text-gray-400 text-sm font-normal">(certificada global)</span>
                                            ) : (
                                                ''
                                            )}
                                        </td>
                                        <td>
                                            {i.loteProducao}
                                            <br />
                                            {i.producaoCertGlobal ? '(certificada global)' : ''}
                                        </td>
                                        <td>{numberFormat.format(i.quantidadeProgramado)}</td>
                                        <td>{numberFormat.format(i.quantidadeAlojado)}</td>
                                        <td>{lote.idadeMatriz}</td>
                                        <td>{lote.linhagem}</td>
                                        <td>{i.sexo == 1 ? 'Macho' : i.sexo == 2 ? 'Fêmea' : 'Misto'}</td>
                                        <td>{lote.origem}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {(!lote.formacao || lote.formacao.length == 0) && (
                    <p className="text-gray-400 p-2 text-sm italic">Nenhum registro encontrado.</p>
                )}

                <div className="data-card-wrapper grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 mt-4">
                    <div className="data-card with-title">
                        <div>
                            <label>Total Programado/Alojado</label>
                        </div>
                        <div>
                            <span className="w-64">Programado: </span>
                            <label>{numberFormat.format(totalProgramado)}</label>
                        </div>
                        <div>
                            <span className="w-64">Alojado: </span>
                            <label>{numberFormat.format(totalAlojado)}</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormacaoLote;
