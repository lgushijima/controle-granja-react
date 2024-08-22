interface Props {
    lote: any;
}

const CarregamentoLote = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Informações do Carregamento</h2>
                </div>
                <div className="data-list">
                    <div>
                        <span>Data: </span>
                        <label>{dateFormat.format(new Date(lote.data))}</label>
                    </div>
                    <div>
                        <span>Hora do Carregamento: </span>
                        <label>{lote.horaCarregamento}</label>
                    </div>
                    <div>
                        <span>Temperatura da Pinteira: </span>
                        <label>{numberFormat.format(Number(lote.tempPinteiraCarregamento))}</label>
                    </div>
                    <div>
                        <span>Hora da Chegada: </span>
                        <label>{lote.horaChegada}</label>
                    </div>
                    <div>
                        <span>Temperatura da Pinteira:</span>
                        <label>{numberFormat.format(Number(lote.tempPinteiraChegada))}</label>
                    </div>
                    <div>
                        <span>Nº de Pessoas para Descarregamento:</span>
                        <label>{lote.nrPessoasDescarregamento}</label>
                    </div>
                    <div>
                        <span>Peso Médio do Pinto: </span>
                        <label>{numberFormat.format(Number(lote.pesoMedio))}</label>
                    </div>
                    <div>
                        <span>Temperatura do Aviário: </span>
                        <label>{numberFormat.format(Number(lote.tempAviario))}</label>
                    </div>
                    <div>
                        <span>Nº de Pintos Mortos: </span>
                        <label>{numberFormat.format(Number(lote.nrMortos))}</label>
                    </div>
                    <div>
                        <span>Uniformidade: </span>
                        <label>{lote.uniformidade}</label>
                    </div>
                    <div>
                        <span>Aspecto: </span>
                        <label>{lote.aspecto}</label>
                    </div>
                    <div>
                        <span>Ração no Comedouro: </span>
                        <label>{lote.racaoComedouro ? 'Sim' : 'Não'}</label>
                    </div>
                    <div>
                        <span>Campânulas Ligadas:</span>
                        <label>{lote.campanulasLigadas ? 'Sim' : 'Não'}</label>
                    </div>
                    <div>
                        <span>Água no Bebedouro:</span>
                        <label>{lote.aguaBebedouro ? 'Sim' : 'Não'}</label>
                    </div>
                    <div>
                        <span>Leitura inicial do hidrômetro:</span>
                        <label>{lote.hidrometro}</label>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CarregamentoLote;
