import { wait, descendDOM } from './utils';

// Returns content root
const getContent = () => descendDOM(document.getElementById('primary'), [0, 3, 0, 5]);

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

const getSCs = () => descendDOM(getContent(), [3, 5, 1]);


function findRemainingSCs(i = 0) {
    let rem = findContent().childNodes[3].childNodes[5].childNodes[3].childNodes[i]
    return rem === undefined ? rem : rem.childNodes[5];
}

function dateFromElement(elem) {
    return elem.childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].data;
}

function elementData(elem) {
    return elem.childNodes[1].childNodes[3].childNodes[3];
}

function channelFromElement(elem) {
    return elementData(elem).childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[0].data;
}

function typeFromElement(elem) {
    return elementData(elem).childNodes[1].childNodes[3].childNodes[0].childNodes[1].childNodes[0].data
}

function totalFromElement(elem) {
    return elementData(elem).childNodes[3].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].data;
}