const fs = require('fs');
const YAML = require('json2yaml');
const chalk = require('chalk');
const inquirer = require('inquirer');
const Loader = require('../../utils/loader');
const getFilesInSubFolders = require('../../utils/getFilesInSubFolders');
const getI18nContentInVueFile = require('../../utils/getI18nContentInVueFile');
const getFolders = require('../../utils/getFolders');

module.exports = format => new Promise((resolve) => {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'folders',
        message: 'Choise Vue components folders',
        choices: getFolders('.'),
        validate: function validate(folders) {
          return folders.length > 0;
        },
      },
    ])
    .then((answer) => {
      const { folders } = answer;
      const loader = Loader(`Generate vue-i18n-file ${format} file in progress`);
      loader.start();
      let files = folders.map(folder => getFilesInSubFolders(folder, 'vue'));
      files = [].concat.apply([], files);
      let i18ns = files.map(file => ({ [file]: getI18nContentInVueFile(file) }));
      i18ns = Object.assign({}, ...i18ns);
      if (format === 'json') fs.writeFileSync('vue-i18n-file.json', JSON.stringify(i18ns, null, 2));
      if (format === 'yaml') fs.writeFileSync('vue-i18n-file.yaml', YAML.stringify(i18ns));
      loader.stop();
      console.log(chalk.blue(`\n File vue-i18n-file.${format} has been successfully generated at root project directory`));
      resolve();
    });
});
