// Uses unsafeEval - Subrunner should pull in vuln-test/unsafeEval.js
const { parseUserExpression, dynamicCode } = require("../vuln-test/unsafeEval");

function evalUserInput(input) {
  return parseUserExpression(input);
}

module.exports = { evalUserInput, dynamicCode };
