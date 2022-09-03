import {addToJson, breakDownCurrency, objToArray, spreadDate} from "../data/dataProcessing.js";
import {ChannelStats} from "../model/ChannelStats.js";

export async function expand() {
    let button = document.getElementById('more-contents-button');
    let limit = 0;

    while (limit < 50) {
        if (button.offsetParent) {
            limit = 0;
            button.childNodes[0].click();
        } else {
            limit++;
        }
        await wait(100);
    }
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
    const channels = new ChannelStats();
    elems.forEach(channels.addPaymentFromElement);
    return channels;
}

// Returns content root
function getContent() {
    let parent = document.getElementById('primary');

    if (parent.offsetParent) {
        return descendDOM(parent, [0, 3, 0, 5]);
    }

    parent = document.getElementById('page-manager');
    return descendDOM(parent, [3, 15, 1, 0, 3, 0, 5]);
}

function getSCs() {
    return descendDOM(getContent(), [1, 1, 5]);
}

/**
 * Wait for a certain amount of time.
 * @param {Number} ms wait time (in ms)
 * @returns promise
 */
async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Returns the node achieved by descending from a source node by a list of child indices.
 * @param {Element} source initial node
 * @param {array} childIndices list of n-th child to descend
 * @returns resulting node
 */
export function descendDOM(source, childIndices = []) {
    if (!source) {
        console.error("Can't descend a undefined node!")
        return;
    }

    let node = source;
    childIndices.forEach((idx, i) => {
        if (!node) {
            console.error(`Descend ${i} yields empty child from node ${source.tagName}, previous path: ${childIndices.slice(i)}, failing child: ${idx}`);
            return;
        }
        node = node.childNodes[idx];
    });

    return node;
}
