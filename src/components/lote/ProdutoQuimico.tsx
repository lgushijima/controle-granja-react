import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
    print?: boolean;
}

const ProdutoQuimico = ({lote, print = false}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Produtos Químicos</h2>
                </div>

                {!print && (
                    <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {lote.produtoQuimico &&
                            sortArrayData(lote.produtoQuimico, 'data', 'desc').map((i: any) => (
                                <div key={i.id} className="data-card with-title">
                                    <div>
                                        <label>{dateFormat.format(new Date(i.data))}</label>
                                    </div>
                                    <div>
                                        <span className="w-24">Produto:</span>
                                        <label>{i.produto}</label>
                                    </div>
                                    <div>
                                        <span className="w-24">Quantidade:</span>
                                        <label>{numberFormat.format(i.quantidade)}</label>
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
                )}

                {print && (
                    <div className="data-card-wrapper table-wrapper">
                        <table className="table-data">
                            <thead>
                                <tr>
                                    <th className="w-32">Data:</th>
                                    <th className="w-32">Produto:</th>
                                    <th className="w-24">Qtde:</th>
                                    <th className="w-32">Partida:</th>
                                    <th className="w-32">Diluição:</th>
                                    <th className="">Observações:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lote.produtoQuimico &&
                                    sortArrayData(lote.produtoQuimico, 'data', 'asc').map((i: any) => (
                                        <tr key={i.id}>
                                            <td>{dateFormat.format(new Date(i.data))}</td>
                                            <td>{i.produto}</td>
                                            <td>{numberFormat.format(i.quantidade)}</td>
                                            <td>{i.partida}</td>
                                            <td>{i.diluicao}</td>
                                            <td>{i.observacao}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {(!lote.produtoQuimico || lote.produtoQuimico.length == 0) && (
                    <p className="text-gray-400 p-2 text-sm italic">Nenhum registro encontrado.</p>
                )}
            </div>
        </section>
    );
};

export default ProdutoQuimico;
