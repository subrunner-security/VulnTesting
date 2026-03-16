import { sendEmail } from './emailService.js';
import { getUserProfile } from './userService.js';

export async function notifyUser(userId, message) {
    const user = await getUserProfile(userId);
    if (user && user.email) {
        await sendEmail(user.email, 'Notification', message);
    }
}
