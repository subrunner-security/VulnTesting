import * as models from '../db/models/index.js';

export async function getStats() {
    // In a real app, this would be complex aggregation
    return {
        totalUsers: 2,
        totalOrders: 0
    };
}
