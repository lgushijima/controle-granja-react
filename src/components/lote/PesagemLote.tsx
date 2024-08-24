import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
}

const PesagemLote = ({lote}: Props) => {
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Pesagem do Lote</h2>
                </div>

                <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {!lote.pesagem && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
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
            </div>
        </section>
    );
};

export default PesagemLote;
