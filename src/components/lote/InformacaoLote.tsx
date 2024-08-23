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
                        Lote {lote.nrLote} - Aviário {lote.nrAviario}
                    </h2>
                    <p>Última atualização de dados: {dateFormat.format(new Date(data))}</p>
                </div>

                <div className="data-card-wrapper grid-cols-1 xl:grid-cols-2">
                    <div className="data-card">
                        <div>
                            <span className="w-48">Lote: </span>
                            <label>{lote.nrLote}</label>
                        </div>
                        <div>
                            <span className="w-48">Número do Aviário: </span>
                            <label>{lote.nrAviario}</label>
                        </div>
                        <div>
                            <span className="w-48">Número da Cama: </span>
                            <label>{lote.nrCama}</label>
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
                            <label>{parceiro.proprietarioNome}</label>
                        </div>
                        <div>
                            <span className="w-48">Código do Parceiro: </span>
                            <label>{parceiro.codigoParceiro}</label>
                        </div>
                        <div>
                            <span className="w-48">Localização do Aviário: </span>
                            <label>{parceiro.localizacao}</label>
                        </div>
                        <div>
                            <span className="w-48">Município: </span>
                            <label>{parceiro.municipio}</label>
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
