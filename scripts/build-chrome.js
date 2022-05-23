const fs = require('fs');
const path = require('path');
const {buildPlugin} = require('./build-functions');

const nodeModules = path.join('node_modules');
const polyfillTarget = path.join('dist', 'chrome', 'build');

buildPlugin('chrome', function () {
    if (fs.existsSync(nodeModules)) {
        fs.copyFileSync(
            path.join(nodeModules, 'webextension-polyfill', 'dist', 'browser-polyfill.min.js'),
            path.join(polyfillTarget, 'browser-polyfill.min.js')
        );
    } else {
        console.error("No node_modules, run `npm install` first!");
    }
})
