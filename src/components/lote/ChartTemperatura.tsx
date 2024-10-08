import {sortArrayData} from '@/lib/utils';
import {ResponsiveLine} from '@nivo/line';

interface Props {
    lote: any;
    print?: boolean;
}

const ChartTemperatura = ({lote, print = false}: Props) => {
    let days = [];
    let maxTempIdeal = [];
    let minTempIdeal = [];
    for (let day = 1; day <= 56; day++) {
        days.push(day);

        const maxTemp = day <= 30 ? 34 - (day * (34 - 28)) / 30 : 28;
        maxTempIdeal.push({x: day, y: maxTemp});

        const minTemp = day <= 30 ? 32 - (day * (32 - 18)) / 30 : 18;
        minTempIdeal.push({x: day, y: minTemp});
    }

    let chartTemperatura = lote.controleTemperatura
        ? sortArrayData(lote.controleTemperatura, 'dia', 'asc', true).map((t: any) => {
              return {x: t.dia, y: t.temperatura || 0};
          })
        : [];

    const data = [
        {
            id: 'Mínimo ideal',
            color: '#51c159',
            data: minTempIdeal,
        },
        {
            id: 'Máximo ideal',
            color: '#cb645c',
            data: maxTempIdeal,
        },
        {
            id: 'Temperatura no galpão',
            color: '#444444',
            data: chartTemperatura,
        },
    ];

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Gráfico de Temperatura</h2>
                </div>

                <div style={print ? {height: '340px', width: '1000px'} : {height: '400px'}}>
                    <ResponsiveLine
                        data={data}
                        margin={{top: 10, left: 70, bottom: 100, right: 50}}
                        colors={{datum: 'color'}}
                        xScale={{type: 'point'}}
                        yScale={{
                            type: 'linear',
                            min: 0,
                            max: 40,
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
                            legend: 'Temp (ºC)',
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
                        tooltip={data => {
                            if (data.point.serieId == 'Temperatura no galpão') {
                                return (
                                    <p className="bg-gray-800 text-white p-2 text-xs rounded-lg">
                                        Dia: {data.point.data.xFormatted}
                                        <br />
                                        Temperatura: {data.point.data.yFormatted} ºC
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

export default ChartTemperatura;
