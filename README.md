# indo-format

**indo-format** adalah kumpulan utilitas JavaScript/TypeScript khusus untuk kebutuhan format data di Indonesia. Termasuk format dan parsing Rupiah, tanggal Indonesia, validasi dan parsing NIK, serta pengecekan hari libur nasional.

## ✨ Fitur

- `formatRupiah`, `parseRupiah`, `terbilang`
- `validateNIK`, `parseNIK`
- `formatTanggal`, `parseTanggal`, `relativeTime`, `diffTanggal`
- `isHariLiburNasional()` dinamis berdasarkan data per tahun
- Bahasa Indonesia full (lokal & ringan)

## 📦 Instalasi

```bash
npm install indo-format
```

## 🧪 Contoh Penggunaan

```ts
import { formatRupiah, validateNIK, formatTanggal } from 'indo-format';

formatRupiah(1500000); // "Rp 1.500.000"
validateNIK("3201010209980003"); // true
formatTanggal(new Date('2025-08-17'), { includeDay: true }); // "Minggu, 17 Agustus 2025"
```

## 📂 Struktur Ekspor

```ts
export * from './currency';
export * from './date';
export * from './holiday';
export * from './identity';
export * from './terbilang';
```

## 📧 Kontak

- Author: [liupurnomo.com](https://liupurnomo.com)
- Email: hi@liupurnomo

## 📄 Lisensi

Lihat file [LICENSE](./LICENSE)
