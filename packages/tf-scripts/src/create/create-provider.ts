import { Command } from 'commander';
import * as inquirer from 'inquirer';
import { Answers, QuestionCollection } from 'inquirer';
import fs from 'fs-extra';
// import path from 'path';

import {
  rootPackagePath,
  lernaConfigPath,
  checkFolderExist,
  yarnWorkspace,
  lernaConfig,
  checkLernaWorkspace,
  providersDescription,
} from '../helpers';

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
