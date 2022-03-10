"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createVersion = void 0;
var standard_version_1 = require("standard-version");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var version_1 = require("../helpers/version");
var releaseFileName = 'release.json';
var releaseFile = function (repository) {
    var releaseFileLocation = "".concat(repository.location, "/").concat(releaseFileName);
    if (!fs_extra_1["default"].existsSync(releaseFileLocation)) {
        console.log("Relase file does not exist in repo: \"".concat(repository.name, "\""));
    }
    var file = fs_extra_1["default"].readJSONSync(releaseFileLocation);
    return file;
};
var resolveVersion = function (name) {
    var ALLOWED_RELEASE_TYPES = ['stable', 'rc', 'beta', 'alpha'];
    var repository = (0, version_1.verifyRepoExist)(name);
    /* const releaseFileLocation = `${repository.location}/${releaseFileName}`;
  
    if (!fs.existsSync(releaseFileLocation)) {
      console.log(`Relase file does not exist in repo: "${repository.name}"`);
    }
  
    const releaseFile: ReleaseFile = fs.readJSONSync(releaseFileLocation); */
    var releaseType = releaseFile(repository).releaseType;
    if (!releaseType) {
        throw new Error("\"releaseType\" must be defined in ".concat(releaseFile));
    }
    if (!ALLOWED_RELEASE_TYPES.includes(releaseType)) {
        throw new Error("releaseType=".concat(releaseType, " is not allowed. Allowed values: ").concat(ALLOWED_RELEASE_TYPES.join(',')));
    }
    // Resolve and check that we have a version file
    var versionFile = 'package.json';
    var versionFileLocation = "".concat(repository.location, "/").concat(versionFile);
    if (!fs_extra_1["default"].existsSync(versionFileLocation)) {
        throw new Error("unable to find version file ".concat(versionFile));
    }
    var currentVersion = fs_extra_1["default"].readJSONSync(versionFileLocation).version;
    return {
        version: currentVersion,
        versionFilepath: versionFileLocation,
        changelogFile: path_1["default"].join(repository.location, 'CHANGELOG.md'),
        prerelease: releaseType !== 'stable' ? releaseType : undefined
    };
};
var changeReleaseType = function (type, name) {
    var repo = (0, version_1.verifyRepoExist)(name);
    var release = releaseFile(repo);
    release.releaseType = type;
    var versionFileLocation = "".concat(repo.location, "/").concat(releaseFileName);
    console.log('version file ', versionFileLocation);
    fs_extra_1["default"].writeFileSync(versionFileLocation, JSON.stringify(release, null, 2));
};
// eslint-disable-next-line import/prefer-default-export
function createVersion(version) {
    return __awaiter(this, void 0, void 0, function () {
        var ver, opts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if ((0, version_1.verifyRepoExist)(version.name) === undefined) {
                        console.error("This repository does not exist ".concat(version.name));
                        process.exit(1);
                    }
                    if (version.beta) {
                        changeReleaseType('beta', version.name);
                    }
                    ver = resolveVersion(version.name);
                    opts = {
                        firstRelease: version.firstRelease || undefined,
                        dryRun: version.dryRun || undefined,
                        tagPrefix: "".concat(version.name, "-v"),
                        packageFiles: [ver.versionFilepath],
                        bumpFiles: [ver.versionFilepath],
                        infile: ver.changelogFile,
                        prerelease: ver.prerelease
                    };
                    return [4 /*yield*/, (0, standard_version_1["default"])(opts)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createVersion = createVersion;
