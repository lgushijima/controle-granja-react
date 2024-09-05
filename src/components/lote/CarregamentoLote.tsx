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
                            <label>{lote.uniformidade}</label>
                        </div>
                        <div>
                            <span className="w-48">Aspecto: </span>
                            <label>{lote.aspecto}</label>
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
            </div>
        </section>
    );
};

export default CarregamentoLote;
