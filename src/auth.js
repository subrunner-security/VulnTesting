// Uses authBypass - Subrunner should pull in vuln-test/authBypass.js
const { checkAdmin, isAuthenticated } = require("../vuln-test/authBypass");

function requireAdmin(req, res, next) {
  if (!checkAdmin(req)) return res.status(403).send("Forbidden");
  next();
}

function requireAuth(req, res, next) {
  if (!isAuthenticated(req)) return res.status(401).send("Unauthorized");
  next();
}

module.exports = { requireAdmin, requireAuth };
