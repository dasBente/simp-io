const path = require('path');
const {updateManifest, exportBuild, dirToZip} = require("./build-functions");

const target = path.join('dist', 'firefox');

updateManifest({manifest_version: '2'});
exportBuild(target);
dirToZip(target);
