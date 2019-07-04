const inquirer = require('inquirer');
const fs = require('fs');
const YAML = require('yaml-js');
const chalk = require('chalk');
const mergeJSON = require('merge-json');
const Loader = require('../../utils/loader');
const getFilesInFolder = require('../../utils/getFilesInFolder');
const putI18nContentToVueFile = require('../../utils/putI18nContentToVueFile');
const getI18nContentInVueFile = require('../../utils/getI18nContentInVueFile');

module.exports = format => new Promise((resolve, reject) => {
  const loader = Loader(`Apply vue-i18n-file ${format} file in progress \n`);
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'file',
        message: 'Select file to be merged',
        choices: getFilesInFolder('.', format),
      },
    ])
    .then((answer) => {
      loader.start();
      let file = fs.readFileSync(answer.file).toString();
      if (format === 'yaml') file = JSON.stringify(YAML.load(file), null, 2);
      try {
        const fileContent = JSON.parse(file);
        let total = 0; let merged = 0; let failed = 0;
        Object.keys(fileContent).forEach((component) => {
          total += 1;
          try {
            const i18n = getI18nContentInVueFile(component);
            const merge = mergeJSON.merge(i18n, fileContent[component]);
            try {
              putI18nContentToVueFile(component, JSON.stringify(merge, null, 2));
              merged += 1;
              console.log(`merging ${component} : ${chalk.green('Success')}`);
            } catch (e) {
              failed += 1;
              console.log(`merging ${component} : ${chalk.red(e.toString())}`);
            }
          } catch (e) {
            failed += 1;
            console.log(`merging ${component} : ${chalk.red(e.toString())}`);
          }
        });
        loader.stop();
        console.log(`${chalk.blue('Total')} : ${total}  ${chalk.green('Merged')} : ${merged}  ${chalk.green('Failed')} : ${failed} `);
        resolve();
      } catch (e) {
        console.log(e);
        reject(`Please check your ${format} file`);
      }
    });
});
