export function formatRupiah(num) {
    return 'Rp ' + num.toLocaleString('id-ID');
}
export function parseRupiah(str) {
    return Number(str.replace(/[^0-9]/g, ''));
}
