import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
    print?: boolean;
}

const PesagemLote = ({lote, print = false}: Props) => {
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Pesagem do Lote</h2>
                </div>

                {!print && (
                    <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {lote.pesagem &&
                            sortArrayData(lote.pesagem, 'idade', 'asc').map((i: any) => (
                                <div key={i.id} className="data-card with-title">
                                    <div>
                                        <label>
                                            {i.idade} {i.idade > 1 ? 'Dias' : 'Dia'}
                                        </label>
                                    </div>
                                    <div>
                                        <span className="w-24">Qtde. Aves:</span>
                                        <label>{numberFormat.format(i.quantidadeAves)}</label>
                                    </div>
                                    <div>
                                        <span className="w-24">Peso Médio: </span>
                                        <label>{numberFormat.format(i.pesoMedio)} g</label>
                                    </div>
                                    <div>
                                        <span className="w-24">GPD: </span>
                                        <label>{numberFormat.format(i.gpd)}</label>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {print && (
                    <div className="data-card-wrapper">
                        <table className="table-data">
                            <thead>
                                <tr>
                                    <th className="w-24">Idade:</th>
                                    <th className="w-24">Qtde. Aves:</th>
                                    <th className="w-32">Peso Médio:</th>
                                    <th className="">GPD:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lote.pesagem &&
                                    sortArrayData(lote.pesagem, 'idade', 'asc').map((i: any) => (
                                        <tr key={i.id}>
                                            <td>
                                                {i.idade} {i.idade > 1 ? 'Dias' : 'Dia'}
                                            </td>
                                            <td>{numberFormat.format(i.quantidadeAves)}</td>
                                            <td>{numberFormat.format(i.pesoMedio)}</td>
                                            <td>{numberFormat.format(i.gpd)}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {(!lote.pesagem || lote.pesagem.length == 0) && (
                    <p className="text-gray-400 p-2 text-sm italic">Nenhum registro encontrado.</p>
                )}
            </div>
        </section>
    );
};

export default PesagemLote;
