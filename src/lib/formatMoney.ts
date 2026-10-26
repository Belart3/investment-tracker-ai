// Formats a number as money with thousands separators, e.g. 167345.4 → "$167,345.40"
export function formatMoney(value: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(value);
}
