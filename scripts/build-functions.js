const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const archiver = require('archiver');

const templatePath = path.join('extension_template');
const defaultPath = path.join(templatePath, 'default');
const distPath = path.join('dist');

async function buildPlugin(target, preZipHook) {
    // Copy default template to target location
    let distTarget = path.join(distPath, target);
    if (fs.existsSync(distTarget)) fs.rmSync(distTarget, {recursive: true});
    fse.copySync(defaultPath, distTarget, {});

    // Copy over non-default templates
    if (target !== 'default') fse.copySync(path.join(templatePath, target), distTarget, {overwrite: true});

    // update version in manifest
    let manifest = path.join(distTarget, 'manifest.json');
    const manifestJson = JSON.parse(fs.readFileSync(manifest, {encoding:'utf8', flag:'r'}));
    manifestJson.version = process.env.npm_package_version;
    fs.writeFileSync(manifest, JSON.stringify(manifestJson));

    if (preZipHook) preZipHook();

    const archive = archiver('zip', {zlib: {level: 9}});

    const output = fs.createWriteStream(distTarget + '.zip');
    archive.pipe(output);

    archive.directory(distTarget, '');
    await archive.finalize();
}

module.exports = {buildPlugin}
