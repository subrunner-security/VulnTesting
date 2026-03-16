import fs from 'fs';
import path from 'path';

export function readFile(filePath) {
    /**
     * VULNERABILITY: Path Traversal
     * No validation on filePath.
     */
    const absolutePath = path.resolve('/var/www/data', filePath);
    return fs.readFileSync(absolutePath, 'utf8');
}
