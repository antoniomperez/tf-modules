import { Command } from 'commander';
import * as inquirer from 'inquirer';
import { QuestionCollection, Answers } from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

import { providersDescription, checkFolderExist } from '../helpers';

interface Module {
  name: string;
  provider: string;
}

const createModule = (module: Module) => {
  if (!checkFolderExist(module.provider)) {
    console.log(
      'You need to create a provider first. Use the cli to create a provider'
    );
    process.exit(1);
  }

  const destinationFolder = path.join(
    process.cwd(),
    `${module.provider}/${module.name}`
  );

  const sourceFolder = path.join(__dirname, '../../templates/tf-module');

  if (!checkFolderExist(`${module.provider}/${module.name}`)) {
    fs.mkdirSync(destinationFolder);
    fs.copySync(sourceFolder, destinationFolder);
  }
};

const moduleQuestions = () => {
  const questions: QuestionCollection = [
    {
      type: 'input',
      name: 'name',
      message: 'Type the module name',
    },
    {
      type: 'list',
      name: 'provider',
      message: 'Choose the terraform provider',
      choices: providersDescription(),
      filter(val) {
        return val.toLowerCase();
      },
    },
  ];

  inquirer.prompt(questions).then((answers: Answers) => {
    createModule({ name: answers.name, provider: answers.provider });
  });
};

const program = new Command();

program
  .name('module')
  .description('Create a new module')
  .action(() => moduleQuestions());

program.parse(process.argv);
