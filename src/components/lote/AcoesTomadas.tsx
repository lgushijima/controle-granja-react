import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
    print?: boolean;
}

const AcoesTomadas = ({lote, print = false}: Props) => {
    const columns = [
        {label: 'Exaustores', key: 'exaustor'},
        {label: 'Nebulizadores', key: 'nebulizador'},
        {label: 'Ventiladores', key: 'ventilador'},
        {label: 'Cortinas', key: 'cortina'},
        {label: 'Aquecedores', key: 'aquecedor'},
    ];

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Ações Tomadas</h2>
                </div>

                <div className="table-list grid gap-8 grid-cols-1">
                    <div className="table-week">
                        <table>
                            <thead>
                                <tr className="h-36">
                                    <th>
                                        <span>Dia</span>
                                    </th>
                                    {columns.map(c => (
                                        <th key={c.key}>
                                            <span>{c.label}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {lote.acaoTomada &&
                                    sortArrayData(lote.acaoTomada, 'id', 'asc', true).map((s: any) => (
                                        <tr key={s.id}>
                                            <td align="center" className="">
                                                <span>{s.id}</span>
                                            </td>
                                            {columns.map(c => (
                                                <td key={c.key} className="text-center">
                                                    <i className={`fas fa-circle ${s[c.key] ? 'text-green-500' : 'text-gray-100'}`}></i>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {print && <div></div>}
            </div>
        </section>
    );
};

export default AcoesTomadas;
