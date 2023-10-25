
export function formatNumber(num) {
    let rounded = Math.round(num * 10000) / 10000;
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    }).format(rounded);
}

