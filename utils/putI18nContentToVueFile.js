const { parseComponent } = require('vue-sfc-parser');
const fs = require('fs');

module.exports = function putI18nContentToVueFile(path, content) {
  try {
    const file = fs.readFileSync(path).toString();
    try {
      const component = parseComponent(file);
      if (component) {
        component.customBlocks.forEach((i18n) => {
          fs.writeFileSync(path, `${file.substring(0, i18n.start)}\n${content}\n${file.substring(i18n.end)}`);
        });
      }
    } catch (e) {
      throw new Error('component can\'t be paresed ');
    }
  } catch (e) {
    throw new Error('file not found');
  }
};
