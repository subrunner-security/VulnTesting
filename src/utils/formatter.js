export function formatResponse(data, status = 'success') {
    return {
        status,
        timestamp: new Date().toISOString(),
        data
    };
}
