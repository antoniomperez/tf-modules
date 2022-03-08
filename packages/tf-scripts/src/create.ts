import { Command } from 'commander';

const create = () => {
  const program = new Command('create');

  program
    .description('Create a new Terraform Module')
    .usage('--name <module-name> --provider <provider-name>')
    .option('-N, --name <string>', 'Module name')
    .option('-P, --provider <string>', 'Provider name')
    .action(cmd => console.log(cmd))
  
  return program;
}

export default create;