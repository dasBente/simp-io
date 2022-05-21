const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const extension = path.join('extension');
const manifest = path.join(extension, 'manifest.json')

function updateManifest(update = {}) {
    const manifestJson = JSON.parse(fs.readFileSync(manifest, {encoding:'utf8', flag:'r'}));
    let updated = {...manifestJson, version: process.env.npm_package_version, ...update}
    fs.writeFileSync(manifest, JSON.stringify(updated));
}

function exportBuild(target) {
    if (fs.existsSync(target)) fs.rmSync(target, { recursive: true });
    fse.copySync(extension, target);
}

module.exports = {updateManifest, exportBuild}
