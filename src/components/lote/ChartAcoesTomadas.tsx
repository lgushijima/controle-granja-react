import {sortArrayData} from '@/lib/utils';
import {ResponsiveScatterPlot} from '@nivo/scatterplot';

interface Props {
    lote: any;
}

const ChartAcoesTomadas = ({lote}: Props) => {
    let days = [];
    for (let day = 1; day <= 56; day++) {
        days.push(day);
    }

    const chartMap = [
        {id: 1, key: 'exaustor', text: 'Exaustores'},
        {id: 2, key: 'nebulizador', text: 'Nebulizadores'},
        {id: 3, key: 'ventilador', text: 'Ventiladores'},
        {id: 4, key: 'cortina', text: 'Cortinas'},
        {id: 5, key: 'aquecedor', text: 'Aquecedores'},
    ];

    let chartAcao: any[] = [];

    if (lote.acaoTomada) {
        sortArrayData(lote.acaoTomada, 'dia', 'asc', true).forEach((a: any, i: number) => {
            for (let prop in a) {
                let map = chartMap.find(m => m.key == prop);
                if (map && a[map.key] == true) {
                    chartAcao.push({x: a.dia, y: map.id, color: '#444444'});
                }
            }
        });
    }

    const data = [
        {
            id: 'Ações Tomadas',
            data: chartAcao,
            color: '#444444',
        },
    ];

    return (
        <section className="section-content">
            <div>
                <div className="page-title">
                    <h2>Ações Tomadas</h2>
                </div>

                <div style={{height: '400px', width: '100%'}}>
                    <ResponsiveScatterPlot
                        data={data}
                        margin={{top: 50, left: 70, bottom: 100, right: 50}}
                        colors={{scheme: 'dark2'}}
                        xScale={{type: 'linear', min: 1, max: 56}}
                        yScale={{type: 'linear', min: 0, max: 5}}
                        gridXValues={days}
                        gridYValues={[0, 1, 2, 3, 4, 5]}
                        blendMode="normal"
                        nodeSize={10}
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
                            tickRotation: -45,
                            legend: '',
                            legendPosition: 'middle',
                            legendOffset: -60,
                            truncateTickAt: 0,
                            tickValues: [1, 2, 3, 4, 5],
                            format: value => {
                                // Reverse map the numeric values back to the string labels
                                const map = chartMap.find(m => m.id == value);
                                return map ? map.text : value;
                            },
                        }}
                        tooltip={data => {
                            if (data) {
                                return <p className="bg-gray-800 text-white p-2 text-xs rounded-lg">Dia: {data?.node?.data?.x}</p>;
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

export default ChartAcoesTomadas;
