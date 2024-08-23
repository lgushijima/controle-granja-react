interface Props {
    lote: any;
}

const FormacaoLote = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    let totalProgramado = 0;
    let totalAlojado = 0;
    if (lote.formacao) {
        lote.formacao.forEach((l: any) => {
            totalProgramado += Number(l.qtProgramado) || 0;
            totalAlojado += Number(l.qtAlojado) || 0;
        });
    }

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Formação do Lote</h2>
                </div>
                <div className="data-card-wrapper grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                    {!lote.formacao && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                    {lote.formacao &&
                        lote.formacao.map((i: any, idx: number) => (
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
                                    <label>{i.recriaCertificadaGlobal ? 'Sim' : 'Não'}</label>
                                </div>
                                <div>
                                    <span className="w-64">Lote Produção: </span>
                                    <label>{i.loteProducao}</label>
                                </div>
                                <div>
                                    <span className="w-64">Prod. Certificada Global: </span>
                                    <label>{i.producaoCertificadaGlobal ? 'Sim' : 'Não'}</label>
                                </div>
                                <div>
                                    <span className="w-64">Programado: </span>
                                    <label>{numberFormat.format(Number(i.qtProgramado))}</label>
                                </div>
                                <div>
                                    <span className="w-64">Alojado: </span>
                                    <label>{numberFormat.format(Number(i.qtAlojado))}</label>
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
                                    <label>{i.sexo == 'f' ? 'Fêmea' : 'Macho'}</label>
                                </div>
                                <div>
                                    <span className="w-64">Origem:</span>
                                    <label>{i.origem}</label>
                                </div>
                            </div>
                        ))}
                </div>

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
