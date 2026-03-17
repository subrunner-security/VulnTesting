// Intentional SQL injection vulnerability

async function getUserByEmail(db, email) {
  const query = "SELECT * FROM users WHERE email = '" + email + "'";
  return db.query(query);
}

async function searchProducts(db, query) {
  const sql = `SELECT * FROM products WHERE name LIKE '%${query}%'`;
  return db.query(sql);
}

module.exports = { getUserByEmail, searchProducts };
