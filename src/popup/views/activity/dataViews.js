import currency from "currency.js";
import {scaleLog, scaleSequential, scaleLinear} from "d3-scale";
import {interpolatePlasma, interpolateGreens} from "d3-scale-chromatic";
import {max} from 'd3-array';

const dailySum = data => data.reduce((acc, next) => currency(acc).add(currency(next.price)), currency(0)).value;
const dailyCount = data => data.length;

const monochrome = color => scaleLinear.domain([0, 1]).range('#dddddd', color);
const withInterpolator = interpolator => scaleSequential().domain([0, 1]).interpolator(interpolator);

const fixedRange = (min, max) => _ => [min, max];
const maxRange = data => [0, max(data)]

export const applyView = (data, view) => {
    let values = data.map(view.processor);
    let domain = view.domain(values);
    let normalizer = view.normalizer(domain);

    console.log(values.map(v => normalizer(v)));

    let colors = values.map(v => view.toColor(normalizer(v)));

    return {values, domain, colors};
};

export default [
    {
        title: 'Superchat Heatmap',
        description: 'Heatmap of daily superchat spending, hotter colors represent higher values.',
        domain: fixedRange(1, 500),
        processor: dailySum,
        normalizer: domain => (() => {
            console.log(domain);
            let scaler = scaleLog().domain(domain).range([0,1]);
            return v => v === 0 ? -1 : scaler(v);
        })(),
        toColor: (() => {
            let scaler = withInterpolator(interpolatePlasma);
            return val => val === -1 ? '#dddddd' : scaler(val);
        })()
    },
    {
        title: 'Activity',
        description: 'Displays number of superchats, more saturated colors correspond with a higher count',
        domain: maxRange,
        processor: dailyCount,
        normalizer: domain => scaleLinear().domain(domain).range([0, 1]),
        toColor: withInterpolator(interpolateGreens)
    }
];
