const fs = require('fs');
const path = require('path');

// Helper functions
const readJSONFile = (filename) => {
  return JSON.parse(fs.readFileSync(path.resolve(filename)).toString());
};

const writeJSONFile = (filename, content) => {
  fs.writeFileSync(path.resolve(filename), JSON.stringify(content));
};

module.exports = { readJSONFile, writeJSONFile };