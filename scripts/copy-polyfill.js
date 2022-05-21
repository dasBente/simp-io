const fs = require('fs');
const path = require('path');

let nodeModules = path.join('.', 'node_modules')

if (fs.existsSync(nodeModules)) {
    let build = path.join('.', 'dist', 'build');

    if (!fs.existsSync(build)) fs.mkdirSync(build);

    fs.copyFileSync(
        path.join(nodeModules, 'webextension-polyfill', 'dist', 'browser-polyfill.min.js'),
        path.join(build, 'browser-polyfill.min.js')
    );
} else {
    console.error("No node_modules, run `npm install` first!");
}
