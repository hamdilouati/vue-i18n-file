const inquirer = require('inquirer');
const fs = require('fs');
const YAML = require('yaml-js');
const chalk = require('chalk');
const mergeJSON = require('merge-json');
const Loader = require('../../utils/loader');
const getFilesInFolder = require('../../utils/getFilesInFolder');
const putI18nContentToVueFile = require('../../utils/putI18nContentToVueFile');
const getI18nContentInVueFile = require('../../utils/getI18nContentInVueFile');
const jsonDiff = require('json-diff');

module.exports = format => new Promise((resolve, reject) => {
  const loader = Loader(`Apply vue-i18n-file ${format} file in progress \n`);
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'file',
        message: 'Select file to show diff',
        choices: getFilesInFolder('.', format),
      },
    ])
    .then((answer) => {
      loader.start();
      let file = fs.readFileSync(answer.file).toString();
      if (format === 'yaml') file = JSON.stringify(YAML.load(file), null, 2);
      let allDiff= {};
      try {
        const fileContent = JSON.parse(file);
        Object.keys(fileContent).forEach((component) => {
          try {
            const i18n = getI18nContentInVueFile(component);
            const diff = jsonDiff.diff(i18n, fileContent[component]);
            console.log(`diff ${component} : ${chalk.green((!diff)?'no diff found' : `total diff : ${Object.keys(diff).length}`)}`);
            if(diff) allDiff[component] =  diff;
          } catch (e) {
            console.log(`diff ${component} : ${chalk.red(e.toString())}`);
          }
        });
        if(Object.keys(allDiff).length>0){
          if (format === 'json') fs.writeFileSync('vue-i18n-file_diff.json', JSON.stringify(allDiff, null, 2));
          if (format === 'yaml') fs.writeFileSync('vue-i18n-file_diff.yaml', YAML.stringify(allDiff));
          console.log(chalk.blue(`\n File vue-in18ns_diff.${format} has been successfully created at root project directory`));
        }else {
          console.log(chalk.blue(`\n No diff found`));
        }
        loader.stop();
        resolve();
      } catch (e) {
        console.log(e);
        reject(`Please check your ${format} file`);
      }
    });
});
