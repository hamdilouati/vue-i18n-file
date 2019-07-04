const fs = require('fs');
const path = require('path');
const getFileExtension = require('./getFileExtension');

module.exports = function getFilesInFolder(dir, extension) {
  return fs
    .readdirSync(dir)
    .filter(
      filePath => !fs.statSync(path.join(dir, filePath)).isDirectory()
                && getFileExtension(filePath) === extension,
    )
    .map(filePath => path.normalize(path.join(dir, filePath)));
};
