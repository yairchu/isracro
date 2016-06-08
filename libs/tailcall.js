var log = require('npmlog');
var semver = require('semver');
var child_process = require('child_process');
var path = require('path');
var pkg = require(path.resolve(path.dirname(module.parent.filename), 'package'));

log.heading = pkg.name;
log.level = process.env.LOG_LEVEL || 'info';

module.exports = function () {
    if (!~process.execArgv.indexOf('--harmony-tailcalls')) {
        var child = child_process.spawn(process.execPath,
            [ "--harmony-tailcalls" ].concat(process.argv.slice(1)),
            {
                cwd: process.cwd(),
                stdio: 'inherit'
            });
        console.log('Restarting with tailcalls!')
        while(1);
    }
};
