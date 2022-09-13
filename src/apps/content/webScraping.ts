import {flatten, some, identity} from "underscore";
import {fromDate, toDate} from "../../data/dataProcessing";
import {Payment} from "../../model/PaymentParser";

const findButton = (): HTMLButtonElement => {
    const elem = document.getElementById('more-contents-button');

    if (!elem.children || elem.children.length == 0 || !("click" in elem.children[0]))
        throw new Error("Button not found");

    return elem.children[0] as HTMLButtonElement;
}

/** Returns all elements that contain the data of one specific payment. */
const paymentElements = (): Element[] => {
    const contList = document.getElementById("continuation-section");
    const baseList = contList.previousElementSibling;
    const elements = [
        ...Array.from(baseList.children),
        ...flatten(Array.from(contList.children).map(e => Array.from(e.children[2].children)))
    ];

    return elements.filter(e => e.tagName == "YT-ACTIVITY-ITEM-RENDERER");
}

class ExpandOpts {
    interval: number = 100;
    timeout: number = 5000;

    public tries() {
        return Math.floor(this.timeout / this.interval);
    }
}

const expand = async (cont: () => boolean = () => true): Promise<void> => {
    let opts = new ExpandOpts(); // TODO: make parameter somehow
    const button = findButton();

    while (cont()) {
        let tries = opts.tries();

        while (tries > 0 && cont) {
            if (button.parentElement.offsetParent) {
                button.click();
                break;
            }
            await wait(opts.interval);
            tries--;
        }

        if (tries <= 0) break;
    }
};

const findOlder = async (date: Date, cont: () => boolean): Promise<void> => {
    const contList = document.getElementById("continuation-section");
    const baseList = contList.previousElementSibling;

    while (cont()) {
        const data = Array.from(contList.childElementCount == 0
            ? baseList.children
            : contList.children[contList.childElementCount - 1].children[2].children
        );

        const dates = data.map(elemToDate).filter(identity).map(fromDate).filter(d => d < date);
        if (dates.length > 0) return;

        await wait(250);
    }
};

// expands the list up until the last day in the list
const expandUntil = async (date: Date = new Date(0)): Promise<void> => {
    let expanding = true, searching = true;

    const pExpand = expand(() => expanding).then(() => searching = false);
    const pSearch = findOlder(date, () => searching).then(() => expanding = false);

    await Promise.all([pExpand, pSearch]);
}

export const scrapePayments = async (date: string | Date): Promise<Payment<any>[]> => {
    if (typeof date == "string") date = fromDate(date);
    await expandUntil(date);

    let lastDate = undefined;

    const propagate = (p: Payment<any>): Payment<any> => {
        lastDate = p.date || lastDate;
        p.date = lastDate;
        return p;
    }

    return paymentElements().map(e => Payment.fromElem(e)).map(propagate).filter(p => p.asDate() >= date);
}

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
export function descendDOM(source, childIndices: number[] = []) {
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
        node = node.childNodes[idx]; // fixme: replace with `node.children`
    });

    return node;
}

export const elemToDate = (elem: Element): string => toDate(elem.children[0].children[0].textContent);
