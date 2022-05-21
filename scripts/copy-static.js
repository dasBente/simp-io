const fs = require('fs');
const fse = require('fs-extra');

if (fs.existsSync('dist')) fs.rmSync('dist', { recursive: true });
fse.copySync('extension', 'dist');
