import { Command } from 'commander';
import * as inquirer from 'inquirer';
import { Answers, QuestionCollection } from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

interface Provider {
  name: string;
  description: string;
}

const rootPackagePath = path.join(process.cwd(), 'package.json');
const lernaConfigPath = path.join(process.cwd(), 'lerna.json');
const providerListPath = path.join(process.cwd(), 'config/providers.json');

const providersDescription = (): string[] => {
  const providerDescription: string[] = [];
  const providersList = fs.readJSONSync(providerListPath);
  providersList.map((provider: Provider) =>
    providerDescription.push(provider.description)
  );
  return providerDescription;
};

const checkFolderExist = (folder: string) => {
  if (fs.existsSync(path.join(process.cwd(), folder))) {
    return true;
  }
  return false;
};

const yarnWorkspace = () => {
  const packageObj = fs.readJSONSync(rootPackagePath);
  return packageObj.workspaces;
};

const lernaConfig = () => {
  return fs.readJSONSync(lernaConfigPath);
};

const checkLernaWorkspace = (folder: string) => {
  if (
    checkFolderExist(folder) &&
    yarnWorkspace().includes(`${folder}/*`) &&
    lernaConfig().packages.includes(`${folder}/*`)
  ) {
    return true;
  }
  return false;
};

const createProvider = (provider: string) => {
  if (checkLernaWorkspace(provider)) {
    console.log(`The provider: "${provider}" was configured before`);
    process.exit(1);
  }

  if (!checkFolderExist(provider)) {
    fs.mkdirSync(provider);
  }

  if (!yarnWorkspace().includes(`${provider}/*`)) {
    const packageObj = fs.readJSONSync(rootPackagePath);
    packageObj.workspaces.push(`${provider}/*`);
    fs.writeFileSync(rootPackagePath, JSON.stringify(packageObj, null, 2));
  }

  if (!lernaConfig().packages.includes(`${provider}/*`)) {
    const lernaObj = fs.readJSONSync(lernaConfigPath);
    lernaObj.packages.push(`${provider}/*`);
    fs.writeFileSync(lernaConfigPath, JSON.stringify(lernaObj, null, 2));
  }
};

const setProvider = () => {
  providersDescription();
  const questions: QuestionCollection = [
    {
      type: 'list',
      name: 'providerList',
      message: 'Choose the terraform provider',
      choices: providersDescription(),
      filter(val) {
        return val.toLowerCase();
      },
    },
  ];

  inquirer.prompt(questions).then((answers: Answers) => {
    createProvider(answers.providerList);
  });
};

const program = new Command();

program
  .name('provider')
  .description('Create a new Terraform Provider')
  .action(() => setProvider());

program.parse(process.argv);
