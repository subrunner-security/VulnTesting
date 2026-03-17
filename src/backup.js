// Usees commandInjection - Subrunner should pull in vuln-test/commandInjection.js
const { runBackup, pingHost } = require("../vuln-test/commandInjection");

function doBackup(filename) {
  runBackup(filename);
}

module.exports = { doBackup, pingHost };
