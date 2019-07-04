const { Spinner } = require('cli-spinner');

module.exports = (message) => {
  const spinner = new Spinner(message);
  spinner.setSpinnerString('|/-\\');

  return spinner;
};
