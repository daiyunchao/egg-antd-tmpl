
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const buildDirectory = fs.realpathSync(path.join(process.cwd(), '../', 'app/public/'));

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const resolveBuild = relativePath => path.resolve(buildDirectory, relativePath);
module.exports = {
    appDist: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appSrc: resolveApp('src'),
    appHtml: resolveApp('public/index.html'),
    appIndex: resolveApp('src/index.js'),
    appNodeModules: resolveApp('node_modules'),
    appUtils: resolveApp('src/utils'),
    appPages: resolveApp('src/pages'),
    appComponents: resolveApp('src/components'),
    appPackageJson: resolveApp('package.json'),
    buildDist: resolveBuild('')
};