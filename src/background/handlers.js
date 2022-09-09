let inProgress = false;

const startProcessing = () => {
    inProgress = true;
    return browser.runtime.sendMessage({id: 'startProcessing'});
}

const endProcessing = () => {
    inProgress = false;
    return browser.runtime.sendMessage({id: 'endProcessing'});
}

export const checkProgress = async () => inProgress;

export const getScore = async () => await browser.storage.local.get('results');

export const fingerprint = async data => {
    const res = await browser.storage.local.get('fingerprint');
    const newFingerprint = JSON.stringify(data).slice(0, 1024);
    const val = false; //newFingerprint === res.fingerprint;

    if (!val) await browser.storage.local.set({ fingerprint: newFingerprint });
    await (val ? endProcessing : startProcessing)();
}

export const saveScore = data => {
    endProcessing();
    return browser.storage.local.set({ results: data });
}
