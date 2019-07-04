const inquirer = require('inquirer');
const fs = require('fs');
const YAML = require('yaml-js');
const chalk = require('chalk');
const Loader = require('../../utils/loader');
const getFilesInFolder = require('../../utils/getFilesInFolder');
const putI18nContentToVueFile = require('../../utils/putI18nContentToVueFile');

module.exports = format => new Promise((resolve, reject) => {
  const loader = Loader(`Apply vue-i18n-file ${format} file in progress \n`);
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'file',
        message: 'Select file to be applied',
        choices: getFilesInFolder('.', format),
      },
    ])
    .then((answer) => {
      loader.start();
      let file = fs.readFileSync(answer.file).toString();
      let total = 0; let replaced = 0; let failed = 0;
      if (format === 'yaml') file = JSON.stringify(YAML.load(file), null, 4);
      try {
        const fileContent = JSON.parse(file);
        Object.keys(fileContent).forEach((component) => {
          total += 1;
          try {
            putI18nContentToVueFile(component, JSON.stringify(fileContent[component], null, 2));
            replaced += 1;
            console.log(`updating ${component} : ${chalk.green('Success')}`);
          } catch (e) {
            failed += 1;
            console.log(`merging ${component} : ${chalk.red(e.toString())}`);
          }
        });
        loader.stop();
        console.log(`${chalk.blue('Total')} : ${total}  ${chalk.green('Replaced')} : ${replaced}  ${chalk.green('Failed')} : ${failed} `);
        resolve();
      } catch (e) {
        reject(`Please check your ${format} file`);
      }
    });
});
