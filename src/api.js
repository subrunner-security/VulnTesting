// Uses sqlInjection + hardcodedSecrets - Subrunner should pull in vuln-test/* as deps
const { getUserByEmail, searchProducts } = require("../vuln-test/sqlInjection");
const secrets = require("../vuln-test/hardcodedSecrets");

/**
 * Looks up a user by their email address.
 */
async function handleUserLookup(db, email) {
  return getUserByEmail(db, email);
}

async function handleProductSearch(db, query) {
  return searchProducts(db, query);
}

module.exports = { handleUserLookup, handleProductSearch };