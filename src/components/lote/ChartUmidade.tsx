import {sortArrayData} from '@/lib/utils';
import {ResponsiveLine} from '@nivo/line';

interface Props {
    lote: any;
}

const ChartUmidade = ({lote}: Props) => {
    let umidadeIdeal = [];
    for (let day = 1; day <= 56; day++) {
        umidadeIdeal.push({x: day, y: 54});
    }

    let chartUmidade = lote.controleUmidade
        ? sortArrayData(lote.controleUmidade, 'id', 'asc', true).map((t: any, i: number) => {
              return {x: i + 1, y: t.umidade || 0};
          })
        : [];

    const data = [
        {
            id: 'Ideal',
            color: '#51c159',
            data: umidadeIdeal,
        },
        {
            id: 'Umidade no galpão',
            color: '#444444',
            data: chartUmidade,
        },
    ];

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Gráfico de Umidade</h2>
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
                            max: 100,
                            stacked: false,
                            reverse: false,
                        }}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Dia',
                            legendOffset: 36,
                            legendPosition: 'middle',
                            truncateTickAt: 0,
                            tickValues: [1, 7, 14, 21, 28, 35, 42, 49, 56],
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Umidade Relativa (%)',
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
                            if (data.point.serieId == 'Umidade no galpão') {
                                return (
                                    <p className="bg-gray-800 text-white p-2 text-xs rounded-lg">
                                        Dia: {data.point.data.xFormatted}
                                        <br />
                                        Umidade: {data.point.data.yFormatted} %
                                    </p>
                                );
                            }
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

export default ChartUmidade;
