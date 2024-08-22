import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
}

const ControlePHeCloro = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Controle Semanal de Cloro e pH</h2>
                </div>
                {!lote.ph && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                {lote.ph &&
                    sortArrayData(lote.ph, 'data', 'desc').map((i: any) => (
                        <div key={i.id} className="data-list">
                            <div>
                                <span>Data</span>
                                <label>{dateFormat.format(new Date(i.data))}</label>
                            </div>
                            <div>
                                <span>PPM</span>
                                <label>{numberFormat.format(Number(i.ppm))}</label>
                            </div>
                            <div>
                                <span>pH</span>
                                <label>{numberFormat.format(Number(i.ph))}</label>
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default ControlePHeCloro;
