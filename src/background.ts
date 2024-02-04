const handlers = {};

browser.runtime.onMessage.addListener(async ({ id, data }) => {
    if (!(id in handlers)) throw new Error(`No handlers for id ${id}`);

    return await handlers[id](data);
})