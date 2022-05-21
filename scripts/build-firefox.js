const path = require('path');
const {updateManifest, exportBuild} = require("./build-functions");

updateManifest({manifest_version: '2'});
exportBuild(path.join('dist', 'firefox'))
