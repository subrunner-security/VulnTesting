import fs from 'fs';

export function logToFile(message) {
    fs.appendFileSync('system.log', `[${new Date().toISOString()}] ${message}\n`);
}
