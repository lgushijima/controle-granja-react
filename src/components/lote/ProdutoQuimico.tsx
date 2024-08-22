import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
}

const ProdutoQuimico = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Produtos Químicos</h2>
                </div>
                {!lote.produtoQuimico && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                {lote.produtoQuimico &&
                    sortArrayData(lote.produtoQuimico, 'data', 'desc').map((i: any) => (
                        <div key={i.id} className="data-list">
                            <div>
                                <span>Data</span>
                                <label>{dateFormat.format(i.data)}</label>
                            </div>
                            <div>
                                <span>Produto</span>
                                <label>{i.produto}</label>
                            </div>
                            <div>
                                <span>Quantidade</span>
                                <label>{numberFormat.format(Number(i.quantidade))}</label>
                            </div>
                            <div>
                                <span>Partida</span>
                                <label>{i.partida}</label>
                            </div>

                            <div>
                                <span>Diluição (quando aplicável)</span>
                                <label>{i.diluicao}</label>
                            </div>
                            <div>
                                <span>Observações </span>
                                <label>{i.observacao}</label>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default ProdutoQuimico;
