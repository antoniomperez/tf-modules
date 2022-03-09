import * as inquirer from 'inquirer';
import { Answers, QuestionCollection } from 'inquirer';

const questions: QuestionCollection = [
  {
    type: 'input',
    name: 'terraformModuleName',
    message: 'Enter de Terraform Module Name',
  },
  {
    type: 'list',
    name: 'providerList',
    message: 'Choose the terraform provider',
    choices: ['AWS', 'Azure'],
    filter(val) {
      return val.toLowerCase();
    },
  },
];

export default inquirer.prompt(questions).then((answers: Answers) => {
  console.log(JSON.stringify(answers, null, ' '));
});
