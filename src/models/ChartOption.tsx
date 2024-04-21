type ChartTitle = {
    text: string
}

type ChartTooltip = {}

type ChartData = {
    data?: Array<string | number>;
}

type ChartLegend = {
    orient?: string;
    right?: number;
    left?: number;
    top?: string;
} & ChartData;

type ChartAxis = {
} & ChartData;

type ChartSeries = {
    name: string
    type: 'bar',
} & ChartData;


export type ChartOption = {
    title: ChartTitle;
    tooltip: ChartTooltip;
    legend: ChartLegend;
    xAxis: ChartAxis;
    yAxis: ChartAxis;
    series: ChartSeries[];
} 