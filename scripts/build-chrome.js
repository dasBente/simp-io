const fs = require('fs');
const path = require('path');
const {updateManifest, exportBuild, dirToZip} = require('./build-functions');

updateManifest(manifest => {
    manifest.manifest_version = 3;
    manifest.background.scripts.push('build/browser-polyfill.min.js');
    manifest.content_scripts.js.push('build/browser-polyfill.min.js');
});

const dist = path.join('dist');
const target = path.join(dist, 'chrome');

exportBuild(target);

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

dirToZip(target);
