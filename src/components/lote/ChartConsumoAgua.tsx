import {sortArrayData} from '@/lib/utils';
import {ResponsiveLine} from '@nivo/line';

interface Props {
    lote: any;
    print?: boolean;
}

const ChartConsumoAgua = ({lote, print = false}: Props) => {
    let chartConsumoAgua = lote.consumoAgua
        ? sortArrayData(lote.consumoAgua, 'dia', 'asc', true).map((t: any) => {
              return {x: t.dia, y: t.consumo || 0};
          })
        : [];

    let linhaMedia: any[] = [];
    if (lote.consumoAgua) {
        let totalMortalidade = chartConsumoAgua.reduce((sum: number, data: any) => sum + data.y, 0);
        let media = totalMortalidade / chartConsumoAgua.length;
        linhaMedia = Array(chartConsumoAgua.length)
            .fill([0, media])
            .map((_, i) => {
                return {x: i + 1, y: media};
            });
        if (linhaMedia.length > 0) {
            for (let day = 1; day <= 56; day++) {
                if (linhaMedia.indexOf((i: any) => i.x == day) == -1) linhaMedia.push({x: day, y: linhaMedia[0].y});
            }
        }
    }

    const data = [
        {
            id: 'Média de consumo',
            color: '#7ac2cd',
            data: linhaMedia,
        },
        {
            id: 'Consumo de água',
            color: '#444444',
            data: chartConsumoAgua,
        },
    ];

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Gráfico de Consumo de Água</h2>
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
                            legend: 'Consumo de Água (m³)',
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
                        pointColor={{theme: 'background'}}
                        pointBorderWidth={4}
                        pointBorderColor={{from: 'serieColor'}}
                        pointLabel="data.yFormatted"
                        pointLabelYOffset={-12}
                        enableTouchCrosshair={true}
                        animate={false}
                        useMesh={true}
                        tooltip={data => {
                            const title = data.point.serieId == 'Consumo de água' ? 'Consumo' : 'Média';

                            return (
                                <div className="bg-gray-800 text-white p-2 text-xs rounded-lg">
                                    <h3 className="font-semibold text-sm">{title}</h3>
                                    <p>
                                        Dia: {data.point.data.xFormatted}
                                        <br />
                                        Consumo: {data.point.data.yFormatted} m³
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

export default ChartConsumoAgua;
