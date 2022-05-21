const fs = require('fs');
const path = require('path');

function updateManifest(update = {}) {
    const manifestJson = JSON.parse(fs.readFileSync(manifest, {encoding:'utf8', flag:'r'}));
    let updated = {...manifestJson, version: process.env.npm_package_version, ...update}
    fs.writeFileSync(manifest, JSON.stringify(updated));
}

const fse = require('fs-extra');

const extension = path.join('extension');
const manifest = path.join(extension, 'manifest.json')

function exportBuild(target) {
    if (fs.existsSync(target)) fs.rmSync(target, { recursive: true });
    fse.copySync(extension, target);
}

const archiver = require('archiver');

async function dirToZip(target) {
    const archive = archiver('zip', {zlib: {level: 9}});

    const output = fs.createWriteStream(target + '.zip');
    archive.pipe(output);

    archive.directory(target, '');
    await archive.finalize();
}

module.exports = {updateManifest, exportBuild, dirToZip}