"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .command('create')
    .description('Create a new Terraform Module')
    .usage('--name <module-name> --provider <provider-name>')
    .option('-N, --name <string>', 'Module name')
    .option('-P, --provider <string>', 'Provider name');
//.action(cmd => console.log(cmd))
program.parse(process.argv);
exports.default = program;
