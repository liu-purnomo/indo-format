const { parseRupiah, formatRupiah } = require('../dist/index');

console.log(parseRupiah('Rp12.500,50')); // → 12500.5
console.log(formatRupiah(12500.5));      // → Rp12.500,50
