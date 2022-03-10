import { Command } from 'commander';

// eslint-disable-next-line import/no-unresolved
import { Version } from '../types';

import { createVersion } from './bump';

const version = () => {
  const program = new Command('version');

  program
    .description('Create a version')
    .option('-f, --first-release', 'Create the first release')
    .option('-d, --dry-run', 'Allow to see what version is going to be bumped')
    .option('-a, --alpha', 'Inititate teh first alpha release')
    .option('-b, --beta', 'Change release type to "beta"')
    .option('-r, --rc', 'Change release type to "rc" Release Candidate')
    .option('-s, --stable', 'Change release type to "stable"')
    .option('-p, --release-as <semver>', 'Force release version')
    .requiredOption('-n, --name <repo>', 'name of the repository')
    .action((options: Version) => {
      createVersion(options);
    });

  return program;
};

export default version;
