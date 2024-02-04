browser.runtime.onMessage.addListener(async function({ id, data }: Record<string, unknown>): Promise<unknown> {
    switch (id) {
        case 'fingerprint':
            return compareFingerprint(data as string);

        case 'get-score':
            return browser.storage.local.get('results');

        case 'save-score':
            endProcessing();
            return browser.storage.local.set({ results: data })

        default:
            throw new Error(`No handlers for id ${id}`);
    }
})

function endProcessing() {
    browser.runtime.sendMessage({id: "endProcessing" });
}

async function compareFingerprint(fingerprint: string) {
    const result = await browser.storage.local.get('fingerprint');
    const stored: string = result["fingerprint"] as string; 

    const val = stored != fingerprint; 
    if (val) {
        browser.storage.local.set({ fingerprint });
        browser.runtime.sendMessage({ id: "start-processing "});
    } else {
        endProcessing();
    }

    return val
}