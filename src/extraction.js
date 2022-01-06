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
        node = node.childNodes[idx];

        if (!node) {
            console.error(`Descend ${i+1} yields empty child from node ${source.tagName}, previous path: ${childIndices.slice(i)}, failing child: ${idx}`);
            return;
        }
    });

    return node;
}

const getContent = () => descendDOM(document.getElementById('primary'), [0, 3, 0, 5]);

/**
 * @returns header element of superchat section
 */
export const getHeader = () => descendDOM(getContent(), [0]);

const getSuperChatSection = () => descendDOM(getContent(), [3, 5, 1]);


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