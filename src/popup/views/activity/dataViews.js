import currency from "currency.js";
import {scaleLog, scaleSequential} from "d3-scale";
import {interpolatePlasma} from "d3-scale-chromatic";

const dailySum = data => data.reduce((acc, next) => currency(acc).add(currency(next.price)), currency(0)).value;

const hotColdScaler = () => {
    let valueScale = scaleLog().domain([1, 500]).range([0,1]);
    let colorScale = scaleSequential().domain([0, 1]).interpolator(interpolatePlasma);
    return val => val === 0 ? '#dddddd' : colorScale(valueScale(val));
}

export default [
    {
        title: 'Superchat Heatmap',
        range: [0, 500],
        description: 'Heatmap of daily superchat spending, hotter colors represent higher values.',
        processor: dailySum,
        valueScale: hotColdScaler()
    }
]
