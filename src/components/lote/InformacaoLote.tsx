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

                <div className="data-list">
                    <div>
                        <span>Lote: </span>
                        <label>{lote.nrLote}</label>
                    </div>
                    <div>
                        <span>Número do Aviário: </span>
                        <label>{lote.nrAviario}</label>
                    </div>
                    <div>
                        <span>Número da Cama: </span>
                        <label>{lote.nrCama}</label>
                    </div>
                    <div>
                        <span>Intervalo:</span>
                        <label>{lote.intervalo}</label>
                    </div>
                    <div>
                        <span>Nome do Técnico:</span>
                        <label>{lote.nomeTecnico}</label>
                    </div>
                    <div>
                        <span>Nome do Parceiro: </span>
                        <label>{parceiro.proprietarioNome}</label>
                    </div>
                    <div>
                        <span>Código do Parceiro: </span>
                        <label>{parceiro.codigoParceiro}</label>
                    </div>
                    <div>
                        <span>Localização do Aviário: </span>
                        <label>{parceiro.localizacao}</label>
                    </div>
                    <div>
                        <span>Município: </span>
                        <label>{parceiro.municipio}</label>
                    </div>
                    <div>
                        <span>UF: </span>
                        <label>{parceiro.uf}</label>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InformacaoLote;
