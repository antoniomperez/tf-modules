import fs from 'fs-extra';
import path from 'path';

export const rootPackagePath = path.join(process.cwd(), 'package.json');
export const lernaConfigPath = path.join(process.cwd(), 'lerna.json');
export const providerListPath = path.join(
  process.cwd(),
  'config/providers.json'
);

export const checkFolderExist = (folder: string) => {
  if (fs.existsSync(path.join(process.cwd(), folder))) {
    return true;
  }
  return false;
};

export const yarnWorkspace = () => {
  const packageObj = fs.readJSONSync(rootPackagePath);
  return packageObj.workspaces;
};

export const lernaConfig = () => {
  return fs.readJSONSync(lernaConfigPath);
};

export const checkLernaWorkspace = (folder: string) => {
  if (
    checkFolderExist(folder) &&
    yarnWorkspace().includes(`${folder}/*`) &&
    lernaConfig().packages.includes(`${folder}/*`)
  ) {
    return true;
  }
  return false;
};

export default {
  rootPackagePath,
  lernaConfigPath,
  providerListPath,
  checkFolderExist,
  yarnWorkspace,
  lernaConfig,
  checkLernaWorkspace,
};
