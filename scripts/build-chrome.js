const fs = require('fs');
const path = require('path');
const {updateManifest, exportBuild} = require('./build-functions');

updateManifest({manifest_version: '3'});

const dist = path.join('dist');
const target = path.join(dist, 'chrome');

// Copy over polyfill
const nodeModules = path.join('node_modules')
const polyfillTarget = path.join(target, 'build');

if (fs.existsSync(nodeModules)) {
    fs.copyFileSync(
        path.join(nodeModules, 'webextension-polyfill', 'dist', 'browser-polyfill.min.js'),
        path.join(polyfillTarget, 'browser-polyfill.min.js')
    );
} else {
    console.error("No node_modules, run `npm install` first!");
}

exportBuild(target);
