const path = require('path');

module.exports = function getFileExtension(filename) {
  const ext = path.extname(filename || '').split('.');
  return ext[ext.length - 1];
};
