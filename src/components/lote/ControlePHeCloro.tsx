import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
    print?: boolean;
}

const ControlePHeCloro = ({lote, print = false}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Controle Semanal de Cloro e pH</h2>
                </div>

                {!print && (
                    <div className="data-card-wrapper grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {lote.controlePh &&
                            sortArrayData(lote.controlePh, 'data', 'desc').map((i: any) => (
                                <div key={i.id} className="data-card with-title">
                                    <div>
                                        <label>{dateFormat.format(new Date(i.data))}</label>
                                    </div>
                                    <div>
                                        <span className="w-12">PPM:</span>
                                        <label>{numberFormat.format(i.ppm)}</label>
                                    </div>
                                    <div>
                                        <span className="w-12">pH:</span>
                                        <label>{numberFormat.format(i.ph)}</label>
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
                                    <th className="w-32">Data:</th>
                                    <th className="w-20">PPM:</th>
                                    <th className="w-20">pH:</th>
                                    <th className="">Observações:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lote.controlePh &&
                                    sortArrayData(lote.controlePh, 'data', 'asc').map((i: any) => (
                                        <tr key={i.id}>
                                            <td>{dateFormat.format(new Date(i.data))}</td>
                                            <td>{numberFormat.format(i.ppm)}</td>
                                            <td>{numberFormat.format(i.ph)}</td>
                                            <td>{i.observacao}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {(!lote.controlePh || lote.controlePh.length == 0) && (
                    <p className="text-gray-400 p-2 text-sm italic">Nenhum registro encontrado.</p>
                )}
            </div>
        </section>
    );
};

export default ControlePHeCloro;
