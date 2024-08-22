interface Props {
    lote: any;
}

const FormacaoLote = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Formação do Lote</h2>
                </div>
                {!lote.formacao && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                {lote.formacao &&
                    lote.formacao.map((i: any) => (
                        <div key={i.id} className="data-list">
                            <div>
                                <span>Lote Recria </span>
                                <label>{i.loteRecria}</label>
                            </div>
                            <div>
                                <span>Recria Certificada Global </span>
                                <label>{i.recriaCertificadaGlobal ? 'Sim' : 'Não'}</label>
                            </div>
                            <div>
                                <span>Lote Produção </span>
                                <label>{i.loteProducao}</label>
                            </div>
                            <div>
                                <span>Produção Certificada Global </span>
                                <label>{i.producaoCertificadaGlobal ? 'Sim' : 'Não'}</label>
                            </div>
                            <div>
                                <span>Programado </span>
                                <label>{numberFormat.format(Number(i.qtProgramado))}</label>
                            </div>
                            <div>
                                <span>Alojado </span>
                                <label>{numberFormat.format(Number(i.qtAlojado))}</label>
                            </div>
                            <div>
                                <span>Idade da Matriz </span>
                                <label>{i.idadeMatriz}</label>
                            </div>
                            <div>
                                <span>Linhagem </span>
                                <label>{i.linhagem}</label>
                            </div>
                            <div>
                                <span>Sexo </span>
                                <label>{i.sexo == 'f' ? 'Fêmea' : 'Macho'}</label>
                            </div>
                            <div>
                                <span>Origem (Incubatório)</span>
                                <label>{i.origem}</label>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default FormacaoLote;
