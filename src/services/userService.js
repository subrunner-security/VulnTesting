import * as models from '../db/models/index.js';
import { audit } from './loggingService.js';

export async function getUserProfile(id) {
    const user = await models.findUserById(id);
    if (user) {
        await audit(id, 'Viewed Profile');
    }
    return user;
}

export async function registerUser(username, password, email) {
    await models.createUser(username, password, 'user', email);
    const user = await models.findUserByUsername(username);
    await audit(user.id, 'Registered');
    return user;
}
