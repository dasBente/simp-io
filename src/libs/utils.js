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
export const objToArray = obj => Object.keys(obj).map(k => obj[k]);

/**
 * Truncate string-representation of number down to `n` trailing decimals.
 * @param {number} num number to truncate
 * @param {number} n maximal allowed trailing decimals
 * @returns respective string representation of `num`
 */
export const trunc = (num, n) => {
    num = "" + num;
    let point = num.indexOf(".");

    return point >= 0 ? num.slice(0, point + 1 + n) : num;
}

/**
 * Summs over a array of numbers.
 * @param {array} nums
 * @returns sum over `nums`
 */
export const sum = nums => nums.reduce((acc, next) => acc + next, 0);

/**
 * Arrithmetic mean over the numbers in `nums`.
 * @param {array} nums 
 * @returns arrithmetic mean
 */
export const mean = nums => sum(nums) / nums.length;
