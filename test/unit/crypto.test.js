import { weakHash, symmetricEncrypt } from '../../src/utils/crypto.js';

console.log('Testing weak crypto...');
console.log('MD5 Hash:', weakHash('test'));
