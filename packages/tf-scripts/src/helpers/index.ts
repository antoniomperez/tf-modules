import fs from 'fs-extra';
import path from 'path';

export interface Provider {
  name: string;
  description: string;
}

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

export const providersDescription = (): string[] => {
  const providerDescription: string[] = [];
  const providersList = fs.readJSONSync(providerListPath);
  providersList.map((provider: Provider) =>
    providerDescription.push(provider.description)
  );
  return providerDescription;
};

export default {
  rootPackagePath,
  lernaConfigPath,
  providerListPath,
  checkFolderExist,
  yarnWorkspace,
  lernaConfig,
  checkLernaWorkspace,
  providersDescription,
};
