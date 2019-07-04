const path = require('path');

module.exports = class Service {
  constructor() {
    this.scripts = this.loadScripts();
  }

  loadScripts() {
    const createScript = scriptPath => (
      { name: path.basename(scriptPath).split('.')[0], command: require(scriptPath) }
    );
    const files = ['./scripts/replace.js', './scripts/generate.js', './scripts/merge.js', './scripts/diff.js'];
    const resolver = files.map(path => createScript(path));
    return resolver;
  }

  execute(name, format) {
    const { command } = this.find(name);
    return command(format);
  }

  available(name) {
    return this.find(name) || null;
  }

  find(name) {
    return this.scripts.find(script => script.name === name);
  }
};
