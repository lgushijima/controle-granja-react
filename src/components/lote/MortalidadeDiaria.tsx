import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
}

const MortalidadeDiaria = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    let totalProgramado = 0;
    let totalAlojado = 0;
    if (lote.formacao) {
        lote.formacao.forEach((formacao: any) => {
            totalProgramado += formacao.quantidadeProgramado;
            totalAlojado += formacao.quantidadeAlojado;
        });
    }

    let diasMortalidade = [];
    let mortalidadeColumns = [
        {label: 'Natural', key: 'natural'},
        {label: 'Problema\nLocomotor', key: 'locomocao'},
        {label: 'Refugo/\nCaquéticos', key: 'refugo'},
        {label: 'Outros', key: 'outros'},
        {label: 'Total', key: 'total'},
    ];
    for (let i = 1; i <= 56; i++) {
        let data = lote.mortalidade ? lote.mortalidade.find((f: any) => f.dia == i) : null;
        let item = data ? {...data} : {dia: i};

        //-- calculate total per line
        item.total = 0;
        mortalidadeColumns
            .filter(c => c.key != 'total')
            .forEach(c => {
                if (item[c.key]) {
                    item.total += parseInt(item[c.key], 10);
                }
            });
        item.total = item.total || 0;
        diasMortalidade.push(item);
    }

    let totalAcumulado = 0;
    let totalRemanescente = 0;
    let weeks = [];
    for (let i = 0; i < diasMortalidade.length; i += 7) {
        let semana = (i + 7) / 7;
        let dias = diasMortalidade.slice(i, i + 7);
        let totalSemana: {[key: string]: any} = {dia: 'total'};

        //-- create a total line for week
        mortalidadeColumns.forEach(column => {
            totalSemana[column.key] = 0;
            dias.forEach(item => {
                totalSemana[column.key] += item[column.key] ? parseInt(item[column.key], 10) : 0;
            });
        });

        totalAcumulado += totalSemana.total;
        totalRemanescente = totalAlojado - totalAcumulado;
        let percentual = (totalSemana.total * 100) / totalAlojado;
        dias.push(totalSemana);

        weeks.push({
            semana,
            dias,
            percentual,
            totalAcumulado,
            totalRemanescente,
            totalSemana: totalSemana.total,
        });
    }

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Mortalidade Diária</h2>
                </div>
                <div className="table-list grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {weeks &&
                        sortArrayData(weeks, 'semana', 'asc', true).map((s: any) => (
                            <div key={s.semana} className="table-week with-totals">
                                <div className="table-title">
                                    <h3>Semana {s.semana}</h3>
                                    <div>({s.percentual.toFixed(2)}% Mort. Semanal)</div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <span>Dia</span>
                                            </th>
                                            {mortalidadeColumns.map(c => (
                                                <th key={c.key}>
                                                    <span>{c.label}</span>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {s.dias.map((item: any) => (
                                            <tr key={item.dia}>
                                                <td align="center" className="">
                                                    <span>{item.dia}</span>
                                                </td>
                                                <td align="center" className="">
                                                    <div>{item.natural || 0}</div>
                                                </td>
                                                <td align="center" className="">
                                                    <div>{item.locomocao || 0}</div>
                                                </td>
                                                <td align="center" className="">
                                                    <div>{item.refugo || 0}</div>
                                                </td>
                                                <td align="center" className="">
                                                    <div>{item.outros || 0}</div>
                                                </td>
                                                <td align="center" className="">
                                                    <div>{item.total || 0}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="table-footer">
                                    <div>
                                        Total Acumulado:
                                        <span>{s.totalSemana == 0 ? '--' : numberFormat.format(s.totalAcumulado || 0)}</span>
                                    </div>
                                    <div>
                                        Total Remanescente:
                                        <span>{s.totalSemana == 0 ? '--' : numberFormat.format(s.totalRemanescente || 0)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default MortalidadeDiaria;
