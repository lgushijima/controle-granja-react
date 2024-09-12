interface Props {
    lote: any;
    print?: boolean;
}

const CarregamentoLote = ({lote, print = false}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    const getNivel = (id: number) => {
        switch (id) {
            case 1:
                return 'Péssimo';
            case 2:
                return 'Ruim';
            case 3:
                return 'Regular';
            case 4:
                return 'Bom';
            case 5:
                return 'Ótimo';
        }
    };
    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Informações do Carregamento</h2>
                </div>
                {!print && (
                    <div className="data-card-wrapper grid-cols-1 xl:grid-cols-3">
                        <div className="data-card">
                            <div>
                                <span className="w-48">Data: </span>
                                <label>{dateFormat.format(new Date(lote.data))}</label>
                            </div>
                            <div>
                                <span className="w-48">Hora do Carregamento: </span>
                                <label>{lote.horaCarregamento}</label>
                            </div>
                            <div>
                                <span className="w-48">Temperatura da Pinteira: </span>
                                <label>{numberFormat.format(Number(lote.tempPinteiraCarregamento))}</label>
                            </div>
                            <div>
                                <span className="w-48">Hora da Chegada: </span>
                                <label>{lote.horaChegada}</label>
                            </div>
                            <div>
                                <span className="w-48">Temperatura da Pinteira:</span>
                                <label>{numberFormat.format(Number(lote.tempPinteiraChegada))}</label>
                            </div>
                            <div>
                                <span className="w-48">Nº de Pessoas para Descarregamento:</span>
                                <label>{lote.numeroPessoasDescarregamento}</label>
                            </div>
                        </div>
                        <div className="data-card">
                            <div>
                                <span className="w-48">Peso Médio do Pinto: </span>
                                <label>{numberFormat.format(Number(lote.pesoMedio))}</label>
                            </div>
                            <div>
                                <span className="w-48">Temperatura do Aviário: </span>
                                <label>{numberFormat.format(Number(lote.tempAviario))}</label>
                            </div>
                            <div>
                                <span className="w-48">Nº de Pintos Mortos: </span>
                                <label>{numberFormat.format(Number(lote.numeroPintosMortos))}</label>
                            </div>
                            <div>
                                <span className="w-48">Uniformidade: </span>
                                <label>{getNivel(lote.uniformidade)}</label>
                            </div>
                            <div>
                                <span className="w-48">Aspecto: </span>
                                <label>{getNivel(lote.aspecto)}</label>
                            </div>
                        </div>
                        <div className="data-card">
                            <div>
                                <span className="w-48">Ração no Comedouro: </span>
                                <label>{lote.racaoComedouro ? 'Sim' : 'Não'}</label>
                            </div>
                            <div>
                                <span className="w-48">Campânulas Ligadas:</span>
                                <label>{lote.campanulasLigadas ? 'Sim' : 'Não'}</label>
                            </div>
                            <div>
                                <span className="w-48">Água no Bebedouro:</span>
                                <label>{lote.aguaBebedouro ? 'Sim' : 'Não'}</label>
                            </div>
                            <div>
                                <span className="w-48">Leitura inicial do hidrômetro:</span>
                                <label>{lote.leituraInicialHidrometro}</label>
                            </div>
                            <div>
                                <span className="w-48">Valor Unit. Estimado Final:</span>
                                <label>R$ {numberFormat.format(Number(lote.valorUnitarioEstimadoFinal || 0))}</label>
                            </div>
                        </div>
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
                                    <th colSpan={2}>Carregamento</th>
                                    <th colSpan={2}>Chegada</th>
                                    <th className="w-48" rowSpan={2}>
                                        Nº de Pessoas para Descarregamento:
                                    </th>
                                </tr>
                                <tr>
                                    <th className="w-14">Hora:</th>
                                    <th className="w-28">Temp. da Pinteira:</th>
                                    <th className="w-14">Hora:</th>
                                    <th className="w-28">Temp. da Pinteira:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{dateFormat.format(new Date(lote.data))}</td>
                                    <td>{lote.horaCarregamento}</td>
                                    <td>{numberFormat.format(Number(lote.tempPinteiraCarregamento))}</td>
                                    <td>{lote.horaChegada}</td>
                                    <td>{numberFormat.format(Number(lote.tempPinteiraChegada))}</td>
                                    <td>{lote.numeroPessoasDescarregamento}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table-data">
                            <thead>
                                <tr>
                                    <th className="w-48">Peso Médio do Pinto:</th>
                                    <th className="w-48">Temp. do Aviário:</th>
                                    <th className="w-48">Nº de Pintos Mortos:</th>
                                    <th className="w-48">Uniformidade:</th>
                                    <th className="w-48">Aspecto:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{numberFormat.format(Number(lote.pesoMedio))}</td>
                                    <td>{numberFormat.format(Number(lote.tempAviario))}</td>
                                    <td>{numberFormat.format(Number(lote.numeroPintosMortos))}</td>
                                    <td>{getNivel(lote.uniformidade)}</td>
                                    <td>{getNivel(lote.aspecto)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="table-data">
                            <thead>
                                <tr>
                                    <th className="w-48">Ração no Comedouro:</th>
                                    <th className="w-48">Campanulas Ligadas:</th>
                                    <th className="w-48">Água no Bebedouro:</th>
                                    <th className="w-48">Leitura Inicial do Hidrômetro:</th>
                                    <th className="w-48">Valor Unit. Estimado Final:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{lote.racaoComedouro ? 'Sim' : 'Não'}</td>
                                    <td>{lote.campanulasLigadas ? 'Sim' : 'Não'}</td>
                                    <td>{lote.aguaBebedouro ? 'Sim' : 'Não'}</td>
                                    <td>{lote.leituraInicialHidrometro}</td>
                                    <td>R$ {numberFormat.format(Number(lote.valorUnitarioEstimadoFinal || 0))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CarregamentoLote;
