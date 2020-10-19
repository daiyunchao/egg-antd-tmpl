
const egg = require('egg');
const argv = require('minimist')(process.argv.slice(2));

egg.startCluster({
    baseDir:__dirname,
    workers:argv.workers||1,
    port:argv.port||7001,
    env:argv.env||"local"
});
