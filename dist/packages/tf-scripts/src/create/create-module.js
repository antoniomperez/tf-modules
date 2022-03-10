"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var inquirer = require("inquirer");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var helpers_1 = require("../helpers");
var createModule = function (module) {
    if (!(0, helpers_1.checkFolderExist)(module.provider)) {
        console.log('You need to create a provider first. Use the cli to create a provider');
        process.exit(1);
    }
    var destinationFolder = path_1["default"].join(process.cwd(), "".concat(module.provider, "/").concat(module.name));
    var sourceFolder = path_1["default"].join(__dirname, '../../templates/tf-module');
    if (!(0, helpers_1.checkFolderExist)("".concat(module.provider, "/").concat(module.name))) {
        fs_extra_1["default"].mkdirSync(destinationFolder);
        fs_extra_1["default"].copySync(sourceFolder, destinationFolder);
    }
};
var moduleQuestions = function () {
    var questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Type the module name'
        },
        {
            type: 'list',
            name: 'provider',
            message: 'Choose the terraform provider',
            choices: (0, helpers_1.providersDescription)(),
            filter: function (val) {
                return val.toLowerCase();
            }
        },
    ];
    inquirer.prompt(questions).then(function (answers) {
        createModule({ name: answers.name, provider: answers.provider });
    });
};
var program = new commander_1.Command();
program
    .name('module')
    .description('Create a new module')
    .action(function () { return moduleQuestions(); });
program.parse(process.argv);
