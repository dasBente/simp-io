import { wait, descendDOM, objToArray } from './utils';

/**
 * @returns header element of superchat section
 */
export const getHeader = () => descendDOM(getContent(), [0]);

/**
 * Repeatedly click a button element to expand the SC section.
 * @param {Element} button 
 */
export async function expand(button) {
    let counter = 0;

    while (counter < 10) {
        if (button.offsetParent) {
            button.childNodes[0].click();
            counter = 0;
        } else counter++;

        await wait(100);
    }
}

export function getScData() {
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
const getContent = () => {
    let parent = document.getElementById('primary');

    if (parent.offsetParent) {
        return descendDOM(parent, [0, 3, 0, 5]);
    }
    
    parent = document.getElementById('page-manager');
    return descendDOM(parent, [3, 15, 1, 0, 3, 0, 5]);
};

const getSCs = () => descendDOM(getContent(), [1, 1, 5]);

const toData = elem => {
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

const breakDownCurrency = price => ({
    amount: Number(price.replace(/[^0-9.-]+/g, '')),
    symbol: price.replace(/[0-9.-]+/g, '')
});

const spreadDate = () => {
    // generate closure to keep information from previous elements
    let date;

    return elem => {
        date = elem.date ? elem.date : date;
        return { ...elem, date: date };
    }
}

const addToJson = (json, data) => {
    let { channel, icon, price, date, type } = data;

    let ch = channel in json ? { ...json[channel] } : { name: channel, icon, data: [] };
    ch.data.push({ type, date, price });

    return { ...json, [channel]: ch };
}
