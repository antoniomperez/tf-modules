"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var fs_1 = require("fs");
var create_1 = require("./create/create");
var version_1 = require("./version/version");
var isRootFolder = function () {
    if (fs_1["default"].existsSync('lerna.json')) {
        return true;
    }
    return false;
};
var cli = function () {
    var program = new commander_1.Command();
    program
        .name('tf')
        .description('Terraform CLI to improve functionality')
        .version('1.0.0');
    program.addCommand((0, create_1["default"])());
    program.addCommand((0, version_1["default"])());
    program.parse(process.argv);
};
if (isRootFolder()) {
    cli();
}
else {
    console.error('This CLI only work on root folder of the repository');
}
