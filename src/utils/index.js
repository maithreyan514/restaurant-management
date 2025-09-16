

// --- UTILITY FUNCTIONS ---
export const cryptoId = () => crypto.randomUUID?.() || Math.random().toString(36).slice(2, 10);
export const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

