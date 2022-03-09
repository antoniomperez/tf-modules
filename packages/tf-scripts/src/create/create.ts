import { Command } from 'commander';

const create = () => {
  const program = new Command('create');

  program
    .description('Create a new Terraform Assets')
    .command(
      'provider [command]',
      'Create a new provider folder to store its modules'
    )
    .executableDir(__dirname)
    .command('module [command]', 'Create a new module bolierplate')
    .executableDir(__dirname);

  return program;
};

export default create;
