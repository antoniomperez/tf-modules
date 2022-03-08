import { Command } from 'commander';
import create from './create'

const program = new Command();

program
  .name('tf')
  .description('Terraform CLI to improve functionality')
  .version('1.0.0');

program.addCommand(create());

program.parse(process.argv);

/*  program
  .command('create', 'Create modules')
  .parse(process.argv);
  
  .description('Create a new Terraform Module')
  .usage('--name <module-name> --provider <provider-name>')
  .option('-N, --name <string>', 'Module name')
  .option('-P, --provider <string>', 'Provider name')
  .action(cmd => console.log(cmd))*/
  



