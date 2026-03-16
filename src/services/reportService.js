import { getStats } from './analyticsService.js';
import { sendEmail } from './emailService.js';

export async function generateAndSendReport(toEmail) {
    const stats = await getStats();
    const body = `Report: ${stats.totalUsers} users, ${stats.totalOrders} orders.`;
    await sendEmail(toEmail, 'System Report', body);
}
