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
                <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {!lote.produtoQuimico && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                    {lote.produtoQuimico &&
                        sortArrayData(lote.produtoQuimico, 'data', 'desc').map((i: any) => (
                            <div key={i.id} className="data-card with-title">
                                <div>
                                    <label>{dateFormat.format(i.data)}</label>
                                </div>
                                <div>
                                    <span className="w-24">Produto:</span>
                                    <label>{i.produto}</label>
                                </div>
                                <div>
                                    <span className="w-24">Quantidade:</span>
                                    <label>{numberFormat.format(Number(i.quantidade))}</label>
                                </div>
                                <div>
                                    <span className="w-24">Partida:</span>
                                    <label>{i.partida}</label>
                                </div>
                                <div>
                                    <span className="w-24">Diluição:</span>
                                    <label>{i.diluicao}</label>
                                </div>
                                <div>
                                    <span className="w-24">Obs.: </span>
                                    <label>{i.observacao}</label>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ProdutoQuimico;
