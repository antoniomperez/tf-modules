"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var bump_1 = require("./bump");
var version = function () {
    var program = new commander_1.Command('version');
    program
        .description('Create a version')
        .option('-f, --first-release', 'Create the first release')
        .option('-d, --dry-run', 'Allow to see what version is going to be bumped')
        .option('-b, --beta', 'Change release type to "beta"')
        .option('-n, --name <repo>', 'name of the repository')
        .action(function (options) {
        (0, bump_1.createVersion)(options);
    });
    return program;
};
exports["default"] = version;
