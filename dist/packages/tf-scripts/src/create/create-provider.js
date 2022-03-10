"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var inquirer = require("inquirer");
var fs_extra_1 = require("fs-extra");
// import path from 'path';
var helpers_1 = require("../helpers");
var createProvider = function (provider) {
    if ((0, helpers_1.checkLernaWorkspace)(provider)) {
        console.log("The provider: \"".concat(provider, "\" was configured before"));
        process.exit(1);
    }
    if (!(0, helpers_1.checkFolderExist)(provider)) {
        fs_extra_1["default"].mkdirSync(provider);
    }
    if (!(0, helpers_1.yarnWorkspace)().includes("".concat(provider, "/*"))) {
        var packageObj = fs_extra_1["default"].readJSONSync(helpers_1.rootPackagePath);
        packageObj.workspaces.push("".concat(provider, "/*"));
        fs_extra_1["default"].writeFileSync(helpers_1.rootPackagePath, JSON.stringify(packageObj, null, 2));
    }
    if (!(0, helpers_1.lernaConfig)().packages.includes("".concat(provider, "/*"))) {
        var lernaObj = fs_extra_1["default"].readJSONSync(helpers_1.lernaConfigPath);
        lernaObj.packages.push("".concat(provider, "/*"));
        fs_extra_1["default"].writeFileSync(helpers_1.lernaConfigPath, JSON.stringify(lernaObj, null, 2));
    }
};
var setProvider = function () {
    (0, helpers_1.providersDescription)();
    var questions = [
        {
            type: 'list',
            name: 'providerList',
            message: 'Choose the terraform provider',
            choices: (0, helpers_1.providersDescription)(),
            filter: function (val) {
                return val.toLowerCase();
            }
        },
    ];
    inquirer.prompt(questions).then(function (answers) {
        createProvider(answers.providerList);
    });
};
var program = new commander_1.Command();
program
    .name('provider')
    .description('Create a new Terraform Provider')
    .action(function () { return setProvider(); });
program.parse(process.argv);
