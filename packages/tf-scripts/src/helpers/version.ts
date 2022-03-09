import { execSync } from 'child_process';
import _ from 'lodash';

import { LernaRepository } from '../types';

export const changedRepos = () => {
  return execSync('lerna changed --json --all', {
    stdio: 'pipe',
  }).toString();
};

export const repoList = () => {
  const list = execSync('lerna list --json --all', {
    stdio: 'pipe',
  }).toString();
  return JSON.parse(list);
};

export const verifyRepoExist = (repo: string): LernaRepository => {
  const repos = repoList();
  return _.find(repos, (r) => {
    return r.name === repo;
  });
};

export default { changedRepos, repoList, verifyRepoExist };
