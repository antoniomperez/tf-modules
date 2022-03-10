"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var create = function () {
    var program = new commander_1.Command('create');
    program
        .description('Create a new Terraform Assets')
        .command('provider [command]', 'Create a new provider folder to store its modules')
        .executableDir(__dirname)
        .command('module [command]', 'Create a new module bolierplate')
        .executableDir(__dirname);
    return program;
};
exports["default"] = create;
