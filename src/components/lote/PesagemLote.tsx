import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
}

const PesagemLote = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Pesagem do Lote</h2>
                </div>
                {!lote.pesagem && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                {lote.pesagem &&
                    sortArrayData(lote.pesagem, 'idade', 'desc').map((i: any) => (
                        <div key={i.id} className="data-list">
                            <div>
                                <span>Idade (Dias)</span>
                                <label>{i.idade}</label>
                            </div>
                            <div>
                                <span>Qtde. Aves</span>
                                <label>{numberFormat.format(Number(i.qtAves))}</label>
                            </div>
                            <div>
                                <span>Peso Médio (gramas)</span>
                                <label>{numberFormat.format(Number(i.peso))}</label>
                            </div>
                            <div>
                                <span>GPD </span>
                                <label>{numberFormat.format(Number(i.peso) / Number(i.idade))}</label>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default PesagemLote;
