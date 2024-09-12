interface Props {
    lote: any;
    parceiro: any;
    data: string;
    print?: boolean;
}

const InformacaoLote = ({lote, parceiro, data, print = false}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                {print && (
                    <div className="page-title">
                        <h2>
                            {parceiro.nome} ({parceiro.codigoExterno}) - {parceiro.endereco}, {parceiro.cidade}/{parceiro.uf}
                        </h2>
                    </div>
                )}

                <div className="page-title">
                    <h2>
                        Lote {lote.numeroLote} - Aviário {lote.numeroAviario}
                    </h2>
                    <p>Última atualização de dados: {dateFormat.format(new Date(data))}</p>
                </div>

                <div className="data-card-wrapper table-wrapper">
                    <table className="table-data">
                        <thead>
                            <tr>
                                <th className="w-36">Número da Cama:</th>
                                <th className="w-28">Intervalo:</th>
                                <th>Nome do Técnico:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{lote.numeroCama}</td>
                                <td>{lote.intervalo}</td>
                                <td>{lote.nomeTecnico}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default InformacaoLote;
