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
                <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {!lote.ph && <p className="text-gray-400 text-sm italic">Nenhum registro encontrado.</p>}
                    {lote.ph &&
                        sortArrayData(lote.ph, 'data', 'desc').map((i: any) => (
                            <div key={i.id} className="data-card with-title">
                                <div>
                                    <label>{dateFormat.format(new Date(i.data))}</label>
                                </div>
                                <div>
                                    <span className="w-12">PPM:</span>
                                    <label>{numberFormat.format(Number(i.ppm))}</label>
                                </div>
                                <div>
                                    <span className="w-12">pH:</span>
                                    <label>{numberFormat.format(Number(i.ph))}</label>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ControlePHeCloro;
