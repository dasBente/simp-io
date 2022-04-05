setInterval(function () {
    browser.tabs.query({ currentWindow: true, active: true }).then(function (tabs) {
        document.getElementById("text").innerText = tabs[0].url;
    })
}, 1000)