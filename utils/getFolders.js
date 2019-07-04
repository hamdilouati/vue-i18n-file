const fs = require('fs');
const path = require('path');

module.exports = function getFolders(baseDir) {
  return fs.readdirSync(baseDir).filter(
    file => fs.statSync(path.join(baseDir, file)).isDirectory(),
  );
};
