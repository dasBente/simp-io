import {expand} from './webScraping.js';
import {addToJson, breakDownCurrency, objToArray, spreadDate} from "../data/dataProcessing.js";
import {PaymentParser} from "../model/PaymentParser.js";

setTimeout(run, 2000);

console.log("Running?");

async function run() {
    await expand();

    let data = getScData();
    browser.runtime.sendMessage({ id: 'saveScore', data });
}


export function getScData() {
    const scList = getSCs();

    // flatten nodes
    const scs = Array.from(scList.childNodes[1].childNodes);

    // extracts the list of elements that carry data we are interested in
    const dataFrames = Array.from(scList.childNodes[3].childNodes)
        .map(elems => Array.from(elems.childNodes[5].childNodes))
        .reduce((res, nodes) => res.concat(nodes), scs)
        .filter(sc => sc.tagName === "yt-activity-item-renderer".toUpperCase());

    // convert frames to simple JSON data
    //const dataJson = dataFrames.map(PaymentParser.fromElement);

    const channels = parseElements(dataFrames);
    console.log(channels);

    // propagate dates, process currency, combine into JSON object
    const withDates = dataJson.map(spreadDate())
        .map(obj => ({ ...obj, price: breakDownCurrency(obj.price) }))
        .reduce(addToJson, {});

    return objToArray(withDates);
}

function parseElements(elems) {
    const parser = new PaymentParser();
    elems.forEach(parser.parseNext);
    return parser.channels;
}
