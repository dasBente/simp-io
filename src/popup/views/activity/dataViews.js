import currency from "currency.js";
import {scaleLog, scaleSequential, scaleLinear} from "d3-scale";
import {interpolatePlasma} from "d3-scale-chromatic";
import {max} from 'd3-array';

const dailySum = data => data.reduce((acc, next) => currency(acc).add(currency(next.price)), currency(0)).value;
const dailyCount = data => data.length;

const hotColdScaler = domain => {
    let valueScale = scaleLog().domain(domain).range([0,1]);
    let colorScale = scaleSequential().domain([0, 1]).interpolator(interpolatePlasma);
    return val => val === 0 ? '#dddddd' : colorScale(valueScale(val));
}

const monochrome = color => domain => scaleLinear.domain(domain).range('#cccccc', color);

const fixedRange = (min, max) => _ => [min, max];
const maxRange = data => [0, max(data)]

export default [
    {
        title: 'Superchat Heatmap',
        description: 'Heatmap of daily superchat spending, hotter colors represent higher values.',
        domain: fixedRange(0, 500),
        processor: dailySum,
        valueScale: hotColdScaler
    },
    {
        title: 'Activity',
        description: 'Displays number of superchats, more saturated colors correspond with a higher count',
        domain: maxRange,
        processor: dailyCount,
        valueScale: monochrome('green')
    }
]
