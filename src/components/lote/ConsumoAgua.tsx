import {sortArrayData} from '@/lib/utils';

interface Props {
    lote: any;
}

const ConsumoAgua = ({lote}: Props) => {
    const dateFormat = new Intl.DateTimeFormat('pt-BR');
    const numberFormat = new Intl.NumberFormat('pt-BR');

    let diasConsumoAgua = [];
    let leituraInicial = lote.leituraInicialHidrometro || 0;
    let totalConsumoAguaAcumulado = 0;

    for (let i = 1; i <= 56; i++) {
        let acao = lote.consumoAgua ? lote.consumoAgua.find((f: any) => f.dia == i) : null;
        let item = acao || {dia: i, leituraHidrometro: 0, consumo: 0};

        diasConsumoAgua.push(item);

        let leituraAnterior = i == 1 ? leituraInicial : diasConsumoAgua[i - 2].leituraHidrometro || 0;
        if (item.leituraHidrometro > 0) {
            if (leituraAnterior > item.leituraHidrometro) {
                const digits = leituraAnterior.toString().length;
                let valorMaximo = Math.pow(10, digits);

                item.consumo = (valorMaximo - leituraAnterior + item.leituraHidrometro) / 100;
            } else {
                item.consumo = (item.leituraHidrometro - leituraAnterior) / 100;
            }
        }
    }

    let weeks = [];
    for (let i = 0; i < diasConsumoAgua.length; i += 7) {
        let semana = (i + 7) / 7;
        let dias = diasConsumoAgua.slice(i, i + 7);
        let totalConsumoAguaSemana = dias.reduce((a, b) => a + b.consumo, 0);

        totalConsumoAguaAcumulado += totalConsumoAguaSemana;

        weeks.push({
            semana,
            dias,
            totalConsumoAguaSemana,
            totalConsumoAguaAcumulado,
        });
    }

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Consumo Diário de Água</h2>
                </div>
                <div className="table-list grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {weeks &&
                        sortArrayData(weeks, 'semana', 'asc', true).map((s: any) => (
                            <div key={s.semana} className="table-week">
                                <div className="table-title">
                                    <h3>Semana {s.semana}</h3>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <span>Dia</span>
                                            </th>
                                            <th>
                                                <span>Leitura do Hidrômetro</span>
                                            </th>
                                            <th>
                                                <span>Consummo (m³)</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {s.dias.map((dia: any) => (
                                            <tr key={dia.dia}>
                                                <td align="center" className="">
                                                    <span>{dia.dia}</span>
                                                </td>
                                                <td align="center" className="">
                                                    <div>{dia.leituraHidrometro || 0}</div>
                                                </td>
                                                <td align="center" className="">
                                                    <div>{dia.consumo || 0}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="table-footer">
                                    <div>
                                        Total Consumido na Semana (m³):
                                        <span>
                                            {s.totalConsumoAguaSemana == 0 ? '--' : numberFormat.format(s.totalConsumoAguaSemana || 0)}
                                        </span>
                                    </div>
                                    <div>
                                        Total Acumulado (m³):
                                        <span>
                                            {s.totalConsumoAguaSemana == 0 ? '--' : numberFormat.format(s.totalConsumoAguaAcumulado || 0)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ConsumoAgua;
