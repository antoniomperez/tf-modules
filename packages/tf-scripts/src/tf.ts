import { Command } from 'commander';
import fs from 'fs';
import create from './create/create';
import version from './version/version';

const isRootFolder = () => {
  if (fs.existsSync('lerna.json')) {
    return true;
  }
  return false;
};

const cli = () => {
  const program = new Command();

  program
    .name('tf')
    .description('Terraform CLI to improve functionality')
    .version('1.0.0');

  program.addCommand(create());
  program.addCommand(version());

  program.parse(process.argv);
};

if (isRootFolder()) {
  cli();
} else {
  console.error('This CLI only work on root folder of the repository');
}
