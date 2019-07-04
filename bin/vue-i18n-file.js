#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const inquirer = require('inquirer');
const Service = require('../lib/Service');

const { log } = console;
const service = new Service();
const command = argv._[0];

log(chalk.green(
  'vue-i18n-file',
));

if (!service.available(command) || !command) {
  log(chalk.red('command not found'));
  log('Usage: vue-i18n-file <command> / Availble commands:');
  service.scripts.forEach((script) => {
    log(chalk.blue(script.name));
  });
  process.exit(1);
}

inquirer.prompt([
  {
    type: 'list',
    name: 'format',
    message: `Select file format to ${command}`,
    choices: ['json', 'yaml'],
  },
]).then((formatAnswer) => {
  service.execute(command, formatAnswer.format).then(
    () => { process.exit(1); },
    (err) => {
      log(chalk.red(err)); process.exit(1);
    },
  );
});
