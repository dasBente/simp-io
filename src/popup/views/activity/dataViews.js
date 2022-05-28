import currency from "currency.js";
import {scaleLog, scaleSequential, scaleLinear} from "d3-scale";
import {interpolatePlasma} from "d3-scale-chromatic";
import {colors, scStepsByCode, symToCode} from "../../lib/superchats";
import {max} from 'd3-array';

const dailySum = data => data.reduce((acc, next) => currency(acc).add(currency(next.price)), currency(0)).value;
const dailyCount = data => data.length;

const monochrome = color => scaleLinear().domain([0, 1]).range(['#eeeeee', color]);
const withInterpolator = interpolator => scaleSequential().domain([0, 1]).interpolator(interpolator);

const fixedRange = (min, max) => _ => [min, max];
const maxRange = data => [0, max(data)]

const fiveSteps = ([start, end]) => [0, .25, .5, .75, 1].map(v => start + v * (end - start));

export const applyView = (data, view) => {
    let values = data.map(view.processor);
    let domain = view.domain(values);

    let normalizer = view.normalizer(domain);
    let colors = values.map(v => view.toColor(normalizer(v)));

    let keys = view.key(domain);
    let keyColors = keys.map(k => view.toColor(normalizer(k)));

    return {values, domain, colors, keys, keyColors};
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
            return val => val === -1 ? '#eeeeee' : scaler(val);
        })(),
        key: _ => [0, ...scStepsByCode[symToCode('USD')]]
    },
    {
        title: 'Activity',
        description: 'Displays number of superchats, more saturated colors correspond with a higher count.',
        domain: maxRange,
        processor: dailyCount,
        normalizer: domain => scaleLinear().domain(domain).range([0, 1]),
        toColor: monochrome('orangered'),
        key: fiveSteps
    },
    {
        title: 'Superchat Colors',
        description: 'Squares are colored by the color of the superchat the total sum of daily activities are worth.',
        domain: fixedRange(0, 500),
        processor: dailySum,
        normalizer: _ => sum => [0, ...scStepsByCode[symToCode('USD')]].reverse().findIndex(v => sum >= v),
        toColor: i => ['#eeeeee', ...colors].reverse()[i],
        key: _ => [0, ...scStepsByCode[symToCode('USD')]]
    }
];
