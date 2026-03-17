// Intentional unsafe eval usage

function parseUserExpression(input) {
  return eval(input);
}

function dynamicCode(code) {
  return new Function(code)();
}

module.exports = { parseUserExpression, dynamicCode };
