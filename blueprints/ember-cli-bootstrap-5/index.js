/* eslint-env node */
'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  normalizeEntityName(entityName) {
    return entityName || "ember-cli-bootstrap-5";
  },

  afterInstall() {
    const importStatement = '\n@import "ember-cli-bootstrap-5/bootstrap";\n';
    const stylePath = path.join('app', 'styles');
    const file = path.join(stylePath, `app.scss`);

    if (!fs.existsSync(stylePath)) {
      fs.mkdirSync(stylePath);
    }

    if (fs.existsSync(file)) {
      this.ui.writeLine(`Added import statement to ${file}`);
      this.insertIntoFile(file, importStatement, {});
    } else {
      fs.writeFileSync(file, importStatement);
      this.ui.writeLine(`Created ${file}`);
    }

    return this.addPackagesToProject([
      { name: 'bootstrap', target: '^5.0.0-beta1' },
      { name: 'popper.js', target: '^2.0.0' },
      { name: 'ember-cli-sass', target: '^10.0.0' },
      { name: 'sass', target: '^1.23.0' },
    ]);
  }
};
