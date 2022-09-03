import {addToJson, breakDownCurrency, objToArray, spreadDate} from "../data/dataProcessing.js";
import {Payment} from "../model/Payment.js";
import {Channel} from "../model/Channel.js";

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

    // filter out any frames that do not contain data we're interested in (separators)
    const validFrames = dataFrames
        .filter(sc => sc.tagName === "yt-activity-item-renderer".toUpperCase());

    // convert frames to simple JSON data
    const dataJson = validFrames.map(Payment.fromElement);

    // propagate dates, process currency, combine into JSON object
    const withDates = dataJson.map(spreadDate())
        .map(obj => ({ ...obj, price: breakDownCurrency(obj.price) }))
        .reduce(addToJson, {});

    return objToArray(withDates);
}

function parseElements(elems) {
    const channels = {};

    elems.forEach(e => {
        const {name, payment} = Payment.fromElement(e);
        if (!name in channels) channels[name] = new Channel(name);
        channels[name].addPayment(payment);

    })
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

