import moment from "moment/moment";

setTimeout(run, 2000);

async function run() {
    let res = await browser.runtime.sendMessage({ id: 'fingerprint', data: getScData() });
    if (res) return;

    await expand();

    let data = getScData();
    browser.runtime.sendMessage({ id: 'saveScore', data });
}

async function expand() {
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

function toDate(str) {
    const dateStr = str.replace("\n", "");

    const date = str.split(" ").length === 2
        ? moment(dateStr, 'MMM DD')
        : moment(dateStr, 'MMM DD, YYYY');

    return date.format('YYYY-MM-DD');
}

function processByType(elem) {
    const label = elem.getAttribute('aria-label');

    if (label === null) {
        console.error("Label of element is null, which is not allowed!");
        return;
    }

    if (label === "") {
        return membershipGiftToData(elem);
    } else if (label.includes("Super Chat")) {
        return superchatToData(elem);
    } else {
        console.error("Unknown label " + label)
    }
}

function getScData() {
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
    const dataJson = validFrames.map(processByType);

    // propagate dates, process currency, combine into JSON object
    const withDates = dataJson.map(spreadDate())
        .map(obj => ({ ...obj, price: breakDownCurrency(obj.price) }))
        .reduce(addToJson, {});

    return objToArray(withDates);
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

function superchatToData(elem) {
    let date = descendDOM(elem, [1, 1]);
    let profile = descendDOM(elem, [1, 3, 3]);

    return {
        date: date.childElementCount > 0 && toDate(descendDOM(date, [0, 1, 0]).textContent),
        icon: descendDOM(profile.parentElement, [1, 0, 1, 1]).getAttribute('src'),
        channel: descendDOM(profile, [1, 1, 0, 1, 0]).textContent,
        type: "Super Chat",
        price: descendDOM(profile, [3, 0, 1, 0, 1, 0]).textContent
    }
}

function membershipGiftToData(elem) {
    const date = descendDOM(elem, [1, 1]);
    const profile = descendDOM(elem, [1, 3]);

    return {
        date: toDate(date.textContent),
        icon: descendDOM(profile, [1, 0, 1, 1]).getAttribute('src'),
        channel: descendDOM(profile, [3, 1, 1]).textContent.split(" ").reverse().slice(2).reverse().join(" "),
        type: "Gifted Membership",
        price: descendDOM(profile, [3, 3, 0, 1]).textContent,
        numGifted: descendDOM(profile, [3, 1, 3]).textContent.split(" ")[0]
    }
}

function breakDownCurrency(price) {
    return {
        amount: Number(price.replace(/[^0-9.-]+/g, '')),
        symbol: price.replace(/[0-9.-]+/g, '')
    };
}

function spreadDate() {
    // generate closure to keep information from previous elements
    let date;

    return elem => {
        date = elem.date ? elem.date : date;
        return { ...elem, date: date };
    }
}

function addToJson(json, data) {
    let { channel, icon, price, date, type } = data;

    let ch = channel in json ? { ...json[channel] } : { name: channel, icon, data: [] };
    ch.data.push({ type, date, price });

    return { ...json, [channel]: ch };
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
function descendDOM(source, childIndices = []) {
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

/**
 * Turns input object into a array based on keys.
 * @param {object} obj input object
 * @returns array of object items in order of keys
 */
function objToArray(obj) {
    return Object.keys(obj).map(k => obj[k]);
}
