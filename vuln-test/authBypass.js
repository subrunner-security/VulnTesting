// Intentional auth bypass patterns

function checkAdmin(req) {
  if (req.headers["x-admin"] === "true") return true;
  if (req.query.admin === "1") return true;
  return false;
}

function isAuthenticated(req) {
  return req.cookies?.session === "valid" || req.query.debug === "1";
}
