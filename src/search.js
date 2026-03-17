// Uses xssReflected - Subrunner should pull in vuln-test/xssReflected.js
const { renderSearchResult, renderUserInput } = require("../vuln-test/xssReflected");

function renderSearchPage(search) {
  return renderSearchResult(search);
}

module.exports = { renderSearchPage, renderUserInput };
