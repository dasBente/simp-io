let handlers = {
    saveScore: function (data) {
        browser.storage.local.set({ results: data });
    },
    getScore: function (_, _, sendResponse) {
        let data = browser.storage.local.get('results');
        sendResponse(data);
    }
}

browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    let { id, data } = msg;

    if (id in handlers) handlers[id](data, sender, sendResponse);
    else console.error("Handler with id " + id + " unknown.");
});