const { parseComponent } = require('vue-sfc-parser');
const fs = require('fs');

module.exports = function getI18nContentInVueFile(path) {
  try {
    const file = fs.readFileSync(path).toString();
    try {
      const component = parseComponent(file);
      if (component) {
        const i18nBlock = component.customBlocks
          .filter(block => block.type === 'i18n').map((block) => {
            try {
              return JSON.parse(block.content);
            } catch (e) {
              return {};
            }
          });
        return i18nBlock[0] || {};
      }
      return {};
    } catch (e) {
      throw new Error('component can\'t be paresed ');
    }
  } catch (e) {
    throw new Error('file not found');
  }
};
