import {expand, getScData} from './webScraping.js';

setTimeout(run, 2000);

console.log("Running?");

async function run() {
    //let res = await browser.runtime.sendMessage({ id: 'fingerprint', data: getScData() });
    //if (res) return;

    await expand();

    let data = getScData();
    browser.runtime.sendMessage({ id: 'saveScore', data });
}
