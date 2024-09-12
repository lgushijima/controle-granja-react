import {interpolarPeso, sortArrayData} from '@/lib/utils';
import {ResponsiveLine} from '@nivo/line';

interface Props {
    lote: any;
    print?: boolean;
}

const ChartPesagem = ({lote, print = false}: Props) => {
    const pesoInicial = lote.pesoMedio || 0;

    let metaPesagemData = [];
    let pesagemData = [];
    let sourceMeta = [];

    if (lote.metaPesagem) {
        let data = sortArrayData(lote.metaPesagem, 'idade', 'asc', true);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const pesoAnterior: number = item.referencia == 1 ? pesoInicial : sourceMeta[i - 1].peso || pesoInicial;
                const peso = (pesoAnterior || 0) * (item.conversao || 0);
                sourceMeta.push({...item, ...{peso}});
            }
        }
    }

    let _meta = {idade: 1, peso: pesoInicial};
    let _peso = {idade: 1, pesoMedio: pesoInicial};
    let _ref = [];
    for (let i = 1; i <= 56; i++) {
        _ref.push({x: i, y: 1});
        if (sourceMeta) {
            let meta = sourceMeta.find(t => t.idade >= i);
            if (meta) {
                if (meta.idade == i) {
                    metaPesagemData.push({x: i, y: meta.peso});
                    _meta = meta;
                } else {
                    if (i == 1) {
                        metaPesagemData.push({x: i, y: pesoInicial});
                    } else {
                        let calc = interpolarPeso(i, _meta.idade, _meta.peso, meta.idade, meta.peso);
                        metaPesagemData.push({x: i, y: calc});
                    }
                }
            }
        }

        if (lote.pesagem) {
            let peso = sortArrayData(lote.pesagem, 'idade', 'asc', true).find((t: any) => t.idade >= i);
            if (peso) {
                if (peso.idade == i) {
                    pesagemData.push({x: i, y: peso.pesoMedio});
                    _peso = peso;
                } else {
                    if (i == 1) {
                        pesagemData.push({x: i, y: pesoInicial});
                    } else {
                        let calc = interpolarPeso(i, _peso.idade, _peso.pesoMedio, peso.idade, peso.pesoMedio);
                        pesagemData.push({x: i, y: calc});
                    }
                }
            }
        }
    }

    const data = [
        {
            id: '-',
            color: 'transparent',
            data: _ref,
        },
        {
            id: 'Pesagem média',
            color: '#444444',
            data: pesagemData,
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
                        yFormat=" >-.0f"
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
                        tooltip={data => {
                            if (data.point.serieId == '-') {
                                return;
                            }
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
