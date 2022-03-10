"use strict";
exports.__esModule = true;
exports.verifyRepoExist = exports.repoList = exports.changedRepos = void 0;
var child_process_1 = require("child_process");
var lodash_1 = require("lodash");
var changedRepos = function () {
    return (0, child_process_1.execSync)('lerna changed --json --all', {
        stdio: 'pipe'
    }).toString();
};
exports.changedRepos = changedRepos;
var repoList = function () {
    var list = (0, child_process_1.execSync)('lerna list --json --all', {
        stdio: 'pipe'
    }).toString();
    return JSON.parse(list);
};
exports.repoList = repoList;
var verifyRepoExist = function (repo) {
    var repos = (0, exports.repoList)();
    return lodash_1["default"].find(repos, function (r) {
        return r.name === repo;
    });
};
exports.verifyRepoExist = verifyRepoExist;
exports["default"] = { changedRepos: exports.changedRepos, repoList: exports.repoList, verifyRepoExist: exports.verifyRepoExist };
