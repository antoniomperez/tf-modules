import { Command } from 'commander';

import { Version } from '../types';

import { createVersion } from './bump';

const version = () => {
  const program = new Command('version');

  program
    .description('Create a version')
    .option('-f, --first-release', 'Create the first release')
    .option('-d, --dry-run', 'Allow to see what version is going to be bumped')
    .option('-b --beta', 'Change release type to "beta"')
    .option('-n, --name <repo>', 'name of the repository')
    .action((options: Version) => {
      console.log(options);
      createVersion(options);
    });

  return program;
};

export default version;
