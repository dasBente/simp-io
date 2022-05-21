console.log("Content Script is alive");

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

/**
 * @returns header element of superchat section
 */
function getHeader() {
    return descendDOM(getContent(), [0])
}

function getScData() {
    let scList = getSCs();

    // flatten nodes
    let scs = Array.from(scList.childNodes[1].childNodes);

    scs = Array.from(scList.childNodes[3].childNodes)
        .map(elems => Array.from(elems.childNodes[5].childNodes))
        .reduce((res, nodes) => res.concat(nodes), scs)
        .filter(sc => sc.getAttribute('aria-label'))
        .map(toData)
        .map(spreadDate())
        .map(obj => ({ ...obj, price: breakDownCurrency(obj.price) }))
        .reduce(addToJson, {});

    return objToArray(scs);
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

function toData(elem) {
    let date = descendDOM(elem, [1, 1]);
    let profile = descendDOM(elem, [1, 3, 3]);

    return {
        date: date.childElementCount > 0 && descendDOM(date, [0, 1, 0]).textContent,
        icon: descendDOM(profile.parentElement, [1, 0, 1, 1]).getAttribute('src'),
        channel: descendDOM(profile, [1, 1, 0, 1, 0]).textContent,
        type: descendDOM(profile, [1, 3, 0, 1, 0]).textContent,
        price: descendDOM(profile, [3, 0, 1, 0, 1, 0]).textContent
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

/**
 * Truncate string-representation of number down to `n` trailing decimals.
 * @param {number} num number to truncate
 * @param {number} n maximal allowed trailing decimals
 * @returns respective string representation of `num`
 */
function trunc(num, n) {
    num = "" + num;
    let point = num.indexOf(".");

    return point >= 0 ? num.slice(0, point + 1 + n) : num;
}

/**
 * Summs over a array of numbers.
 * @param {array} nums
 * @returns sum over `nums`
 */
function sum(nums) {
    return nums.reduce((acc, next) => acc + next, 0);
}

/**
 * Arrithmetic mean over the numbers in `nums`.
 * @param {array} nums
 * @returns arrithmetic mean
 */
function mean(nums) {
    sum(nums) / nums.length;
}
