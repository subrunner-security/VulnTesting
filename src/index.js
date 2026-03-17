// Entry point - imports all vuln-dependent modules
const api = require("./api");
const auth = require("./auth");
const search = require("./search");
const backup = require("./backup");
const expr = require("./expr");

module.exports = { api, auth, search, backup, expr };
