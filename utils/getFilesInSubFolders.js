const path = require('path');
const getFolders = require('./getFolders');
const getFilesInFolder = require('./getFilesInFolder');

const getSubFolders = (baseFolder, folderList = []) => {
  const folders = getFolders(baseFolder);
  folders.forEach((folder) => {
    folderList.push(path.join(baseFolder, folder));
    getSubFolders(path.join(baseFolder, folder), folderList);
  });
  return folderList;
};

module.exports = function getFilesInSubFolders(dir, extension) {
  const subFolders = getSubFolders(dir);
  const allFiles = subFolders.map(folder => getFilesInFolder(folder, extension));
  return [].concat.apply([], allFiles);
};
