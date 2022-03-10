"use strict";
exports.__esModule = true;
exports.providersDescription = exports.checkLernaWorkspace = exports.lernaConfig = exports.yarnWorkspace = exports.checkFolderExist = exports.providerListPath = exports.lernaConfigPath = exports.rootPackagePath = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
exports.rootPackagePath = path_1["default"].join(process.cwd(), 'package.json');
exports.lernaConfigPath = path_1["default"].join(process.cwd(), 'lerna.json');
exports.providerListPath = path_1["default"].join(process.cwd(), 'config/providers.json');
var checkFolderExist = function (folder) {
    if (fs_extra_1["default"].existsSync(path_1["default"].join(process.cwd(), folder))) {
        return true;
    }
    return false;
};
exports.checkFolderExist = checkFolderExist;
var yarnWorkspace = function () {
    var packageObj = fs_extra_1["default"].readJSONSync(exports.rootPackagePath);
    return packageObj.workspaces;
};
exports.yarnWorkspace = yarnWorkspace;
var lernaConfig = function () {
    return fs_extra_1["default"].readJSONSync(exports.lernaConfigPath);
};
exports.lernaConfig = lernaConfig;
var checkLernaWorkspace = function (folder) {
    if ((0, exports.checkFolderExist)(folder) &&
        (0, exports.yarnWorkspace)().includes("".concat(folder, "/*")) &&
        (0, exports.lernaConfig)().packages.includes("".concat(folder, "/*"))) {
        return true;
    }
    return false;
};
exports.checkLernaWorkspace = checkLernaWorkspace;
var providersDescription = function () {
    var providerDescription = [];
    var providersList = fs_extra_1["default"].readJSONSync(exports.providerListPath);
    providersList.map(function (provider) {
        return providerDescription.push(provider.description);
    });
    return providerDescription;
};
exports.providersDescription = providersDescription;
exports["default"] = {
    rootPackagePath: exports.rootPackagePath,
    lernaConfigPath: exports.lernaConfigPath,
    providerListPath: exports.providerListPath,
    checkFolderExist: exports.checkFolderExist,
    yarnWorkspace: exports.yarnWorkspace,
    lernaConfig: exports.lernaConfig,
    checkLernaWorkspace: exports.checkLernaWorkspace,
    providersDescription: exports.providersDescription
};
