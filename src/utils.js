/**
 * Wait for a certain amount of time.
 * @param {Number} ms wait time (in ms)
 * @returns promise
 */
export async function wait(ms) {
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
        node = node.childNodes[idx];

        if (!node) {
            console.error(`Descend ${i+1} yields empty child from node ${source.tagName}, previous path: ${childIndices.slice(i)}, failing child: ${idx}`);
            return;
        }
    });

    return node;
}