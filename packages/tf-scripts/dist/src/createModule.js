"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const questions = [
    {
        type: 'input',
        name: 'terraformModuleName',
        message: 'Enter de Terraform Module Name',
    },
    {
        type: 'list',
        name: 'providerList',
        message: 'Choose the terraform provider',
        choices: ['AWS', 'Azure'],
        filter(val) {
            return val.toLowerCase();
        },
    },
];
exports.default = inquirer_1.default.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, ' '));
});
