interface Props {
    lote: any;
    parceiro: any;
    data: string;
}

const InformacaoLote = ({lote, parceiro, data}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>
                        Lote {lote.numeroLote} - Aviário {lote.numeroAviario}
                    </h2>
                    <p>Última atualização de dados: {dateFormat.format(new Date(data))}</p>
                </div>

                <div className="data-card-wrapper grid-cols-1 xl:grid-cols-2">
                    <div className="data-card">
                        <div>
                            <span className="w-48">Lote: </span>
                            <label>{lote.numeroLote}</label>
                        </div>
                        <div>
                            <span className="w-48">Número do Aviário: </span>
                            <label>{lote.numeroAviario}</label>
                        </div>
                        <div>
                            <span className="w-48">Número da Cama: </span>
                            <label>{lote.numeroCama}</label>
                        </div>
                        <div>
                            <span className="w-48">Intervalo:</span>
                            <label>{lote.intervalo}</label>
                        </div>
                        <div>
                            <span className="w-48">Nome do Técnico:</span>
                            <label>{lote.nomeTecnico}</label>
                        </div>
                    </div>
                    <div className="data-card">
                        <div>
                            <span className="w-48">Nome do Parceiro: </span>
                            <label>{parceiro.nome}</label>
                        </div>
                        <div>
                            <span className="w-48">Código do Parceiro: </span>
                            <label>{parceiro.codigoExterno}</label>
                        </div>
                        <div>
                            <span className="w-48">Localização do Aviário: </span>
                            <label>{parceiro.endereco}</label>
                        </div>
                        <div>
                            <span className="w-48">Município: </span>
                            <label>{parceiro.cidade}</label>
                        </div>
                        <div>
                            <span className="w-48">UF: </span>
                            <label>{parceiro.uf}</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InformacaoLote;
