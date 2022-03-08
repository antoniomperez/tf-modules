import { Command } from 'commander';

const program = new Command();

program
  .name('tf')
  .description('Terraform CLI to improve functionality')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new Terraform Module')
  .usage('--name <module-name> --provider <provider-name>')
  .option('-N, --name <string>', 'Module name')
  .option('-P, --provider <string>', 'Provider name')
  .action((name, provider) => {
    console.log('NAME: ', name);
    console.log('PROVIDER: ', provider);
  });

program.parse();
