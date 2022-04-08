let handlers = {
    saveScore: async function (data) {
        await browser.storage.local.set({ results: data });
    },
    getScore: async function (_, _) {
        return await browser.storage.local.get('results');
    },
    fingerprint: async function (data, _) {
        let res = await browser.storage.local.get('fingerprint');
        let newFingerprint = JSON.stringify(data).slice(0, 1024);
        let val = newFingerprint === res.fingerprint;

        if (!val) browser.storage.local.set({ fingerprint: newFingerprint });

        return val;
    }
}

browser.runtime.onMessage.addListener(async function (msg) {
    let { id, data } = msg;

    if (id in handlers) return await handlers[id](data);
    else console.error("Handler with id " + id + " unknown.");
});