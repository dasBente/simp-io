import {startProcessing, endProcessing} from "./checkProgress";

const fingerprint = async data => {
    let res = await browser.storage.local.get('fingerprint');
    let newFingerprint = JSON.stringify(data).slice(0, 1024);
    let val = false; //newFingerprint === res.fingerprint;

    if (!val) {
        browser.storage.local.set({ fingerprint: newFingerprint });
        startProcessing();
    }
    else endProcessing();

    return val;
}

export default fingerprint;
