import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

export function initDB() {
    db.serialize(() => {
        db.run("CREATE TABLE users (id INT, username TEXT, password TEXT, role TEXT)");
        db.run("INSERT INTO users VALUES (1, 'admin', 'admin123', 'admin')");
        db.run("INSERT INTO users VALUES (2, 'user', 'pass123', 'user')");
    });
}

/**
 * VULNERABILITY: SQL Injection
 * This function concatenates user input directly into the query.
 */
export function getUser(userId, callback) {
    const query = "SELECT * FROM users WHERE id = " + userId;
    db.get(query, (err, row) => {
        callback(err, row);
    });
}

export function getAllUsers(callback) {
    db.all("SELECT id, username, role FROM users", (err, rows) => {
        callback(err, rows);
    });
}
