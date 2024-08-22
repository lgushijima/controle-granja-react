import {sortArrayData} from '@/lib/utils';
import {ResponsiveLine} from '@nivo/line';

interface Props {
    lote: any;
}

const ChartPesagem = ({lote}: Props) => {
    let pesoInicial = lote.pesoMedio;

    let metaPesagemData: any = [];
    if (lote.metaPesagem) {
        let result = [];
        let data = sortArrayData(lote.metaPesagem, 'idade', 'asc', true);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let pesoAnterior = 0;

                const item = data[i];
                pesoAnterior = item.referencia === 'inicial' ? pesoInicial : result[i - 1].peso || pesoInicial;
                const peso = (pesoAnterior || 0) * (item.conversao || 0);
                result.push({...item, ...{peso}});
            }
        }

        metaPesagemData = [
            {x: 1, y: pesoInicial},
            ...result.map(t => {
                return {x: t.idade, y: t.peso || 0};
            }),
        ];
    }

    let chartPesagem = lote.pesagem
        ? lote.pesagem.map((t: any, i: number) => {
              return {x: t.idade, y: t.peso || 0};
          })
        : [];

    const data = [
        {
            id: 'Pesagem média',
            color: '#444444',
            data: chartPesagem,
        },
        {
            id: 'Meta de peso médio',
            color: '#51c159',
            data: metaPesagemData,
        },
    ];

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Gráfico de Pesagem Média</h2>
                </div>

                <div style={{height: '400px', width: '100%'}}>
                    <ResponsiveLine
                        data={data}
                        margin={{top: 50, left: 70, bottom: 100, right: 50}}
                        colors={{datum: 'color'}}
                        xScale={{type: 'point'}}
                        yScale={{
                            type: 'linear',
                            min: 0,

                            stacked: false,
                            reverse: false,
                        }}
                        yFormat=" >-.0f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Idade (Dias)',
                            legendOffset: 36,
                            legendPosition: 'middle',
                            truncateTickAt: 0,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Peso médio (gramas)',
                            legendOffset: -50,
                            legendPosition: 'middle',
                            truncateTickAt: 0,
                        }}
                        pointSymbol={data => {
                            let isMainSeries = data.borderColor == '#444444';
                            return (
                                <circle
                                    r={isMainSeries ? 2 : 1}
                                    fill={isMainSeries ? '#444444' : data.color}
                                    strokeWidth={2}
                                    stroke={data.borderColor || 'white'}
                                />
                            );
                        }}
                        pointSize={5}
                        pointColor={{theme: 'background'}}
                        pointBorderWidth={4}
                        pointBorderColor={{from: 'serieColor'}}
                        pointLabel="data.yFormatted"
                        pointLabelYOffset={-12}
                        enableTouchCrosshair={true}
                        animate={false}
                        useMesh={true}
                        tooltip={(data, b) => {
                            const title = data.point.serieId == 'Pesagem média' ? 'Pesagem' : 'Meta';

                            return (
                                <div className="bg-gray-800 text-white p-2 text-xs rounded-lg">
                                    <h3 className="font-semibold text-sm">{title}</h3>
                                    <p>
                                        Dia: {data.point.data.xFormatted}
                                        <br />
                                        Peso médio: {data.point.data.yFormatted} gramas
                                    </p>
                                </div>
                            );
                        }}
                        legends={[
                            {
                                anchor: 'bottom-left',
                                direction: 'column',
                                justify: false,
                                translateX: 0,
                                translateY: 100,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

export default ChartPesagem;
