import sqlite3 from 'sqlite3';
import { config } from '../config/index.js';

class DBConnector {
    constructor() {
        this.db = new sqlite3.Database(config.db.connectionString);
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT, email TEXT)");
                this.db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL)");
                this.db.run("CREATE TABLE orders (id INTEGER PRIMARY KEY, userId INTEGER, productId INTEGER, quantity INTEGER, status TEXT)");
                this.db.run("CREATE TABLE audit_logs (id INTEGER PRIMARY KEY, event TEXT, timestamp DATETIME, userId INTEGER)");
                this.db.run("CREATE TABLE sessions (id TEXT PRIMARY KEY, userId INTEGER, expires DATETIME)");
                
                // Seed data
                this.db.run("INSERT INTO users (username, password, role, email) VALUES ('admin', 'admin123', 'admin', 'admin@example.com')");
                this.db.run("INSERT INTO products (name, description, price) VALUES ('Vulnerable Widget', 'A very shaky widget', 19.99)");
                
                this.initialized = true;
                resolve();
            });
        });
    }

    getHandle() {
        return this.db;
    }
}

export const connector = new DBConnector();
