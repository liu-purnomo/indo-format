
# 🇮🇩 indo-format

[![npm version](https://img.shields.io/npm/v/indo-format.svg)](https://www.npmjs.com/package/indo-format)
[![CI](https://github.com/liu-purnomo/indo-format/actions/workflows/ci.yml/badge.svg)](https://github.com/liu-purnomo/indo-format/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Utility functions for Indonesian-specific formatting: Rupiah, NIK, tanggal, terbilang, hari libur nasional.

---

indo-format adalah sebuah pustaka utilitas TypeScript modern yang dirancang khusus untuk kebutuhan pengembangan aplikasi di Indonesia. Library ini menyediakan fungsi-fungsi penting seperti format Rupiah, terbilang angka ke teks Bahasa Indonesia, validasi dan parsing NIK, pemrosesan tanggal dalam format lokal, hingga pengecekan hari libur nasional berdasarkan data JSON.

Dengan indo-format, kamu bisa membangun aplikasi keuangan, administrasi, kependudukan, HRIS, ERP, atau dashboard publik yang localized dengan standar Indonesia — tanpa perlu repot bikin helper-function sendiri dari nol.

Library ini ringan, modular, dan ditulis dengan TypeScript murni. Cocok untuk backend (Node.js), frontend (React/Vue/Next.js), maupun hybrid apps.

## 📦 Install

```bash
npm install indo-format
````

---

Berikut adalah **Table of Contents (ToC)** yang cocok untuk README tersebut. Bisa kamu letakkan di bawah bagian `## 📦 Install`.

---

## 📚 Daftar Isi

* [🚀 Fitur](#-fitur)
* [✍️ Contoh Penggunaan](#️-contoh-penggunaan)

  * [💰 formatRupiah & parseRupiah](#-formatrupiah--parserupiah)
  * [🔢 terbilang](#-terbilang)
  * [🆔 validateNIK & parseNIK](#-validatenik--parsenik)
  * [🗓️ Modul Tanggal (date)](#️-modul-tanggal-date)

    * [✅ formatTanggal](#✅-formattanggaldate-options-include-day-boolean--string)
    * [✅ waktuRelative](#✅-wakturelativefrom-date-to-date--date-string)
    * [✅ parseTanggal](#✅-parsetanggalinput-string-date--null)
    * [✅ diffTanggal](#✅-difftanggalfrom-date-to-date-unit-hari--bulan--tahun--auto)
  * [🎉 isHariLiburNasional](#-ishariliburnasional)
* [👤 Author](#-author)
* [📄 License](#-license)

---

## 💰 Currency Utilities

### ✅ `formatRupiah(value: number, options?: { withSpace?: boolean }): string`

Mengubah angka menjadi string mata uang Rupiah sesuai format lokal Indonesia (`id-ID`), dengan opsi untuk menyisipkan spasi antara `"Rp"` dan angkanya.

#### 🔧 Implementasi:

```ts
export function formatRupiah(
  value: number,
  options?: { withSpace?: boolean }
): string {
  const num = Number(value);
  const space = options?.withSpace ? ' ' : '';
  return 'Rp' + space + num.toLocaleString('id-ID');
}
```

#### 📦 Contoh Penggunaan:

```ts
formatRupiah(1000);                       // "Rp1.000"
formatRupiah(25000000.5);                // "Rp25.000.000,5"
formatRupiah(1000, { withSpace: true }); // "Rp 1.000"
```

#### 📌 Catatan:

* **Default-nya tanpa spasi** (`"Rp1.000"`) sesuai dengan Pedoman Umum Ejaan Bahasa Indonesia (PUEBI).
* Gunakan `withSpace: true` jika tampilan antarmuka memerlukan `"Rp 1.000"`.

---

### ✅ `parseRupiah(str: string): number`

Mengubah string dalam format Rupiah (misal: `"Rp25.000,75"`) menjadi angka (`number`), menangani pemisah ribuan dan desimal (koma).

#### 🔧 Implementasi:

```ts
export function parseRupiah(str: string): number {
  const cleaned = str.replace(/[^0-9,]/g, '').replace(',', '.');
  return Number(cleaned);
}
```

#### 📦 Contoh Penggunaan:

```ts
parseRupiah('Rp25.000.000');     // 25000000
parseRupiah('Rp 5.000,50');      // 5000.5
parseRupiah('1.000.000');        // 1000000
parseRupiah('Rpabc123.456xyz');  // 123456
```

#### 📌 Catatan:

* Cocok untuk parsing input dari form pengguna, termasuk hasil salinan dari e-wallet atau bank statement.
* Format desimal dengan koma (`','`) otomatis diubah menjadi titik (`'.'`).

---

### 🧠 Use Case Umum

* Menampilkan harga produk di e-commerce
* Parsing input dari form pembayaran
* Membaca data keuangan dari spreadsheet
* Validasi nominal pajak, gaji, atau invoice
* Format saldo dompet digital atau transaksi bank

---

### 📦 Contoh Integrasi di React/Next.js

```tsx
<span>{formatRupiah(250000)}</span>

<input
  value={formatRupiah(formData.nominal)}
  onChange={e => setFormData({
    ...formData,
    nominal: parseRupiah(e.target.value)
  })}
/>
```

---


## 🔢 `terbilang()`

### 📖 Deskripsi

Fungsi `terbilang(num: number): string` mengubah angka menjadi bentuk teks dalam Bahasa Indonesia sesuai dengan kaidah sistem bilangan lokal. Cocok untuk keperluan pembuatan dokumen resmi, faktur/invoice, bukti pembayaran, formulir perbankan, dan aplikasi finansial yang memerlukan penyebutan angka dalam huruf.

Fungsi ini mendukung:

* Penulisan angka dari **nol hingga triliunan**
* Penanganan **angka istimewa** seperti:

  * `seribu` (bukan "satu ribu")
  * `seratus` (bukan "satu ratus")
  * `sebelas`, `dua belas`, hingga `sembilan belas`

---

### ✅ Implementasi Singkat

```ts
import { terbilang } from 'indo-format';

terbilang(0);             // "nol"
terbilang(5);             // "lima"
terbilang(15);            // "lima belas"
terbilang(100);           // "seratus"
terbilang(101);           // "seratus satu"
terbilang(1000);          // "seribu"
terbilang(1200);          // "seribu dua ratus"
terbilang(1250000);       // "satu juta dua ratus lima puluh ribu"
terbilang(999999999);     // "sembilan ratus sembilan puluh sembilan juta sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan"
```

---

### 🧠 Penjelasan Logika

* Fungsi akan membagi angka ke dalam kelompok 3 digit (ratusan)
* Setiap kelompok diproses lewat `convertThreeDigits()`
* Kelompok diberi label ribuan (`ribu`, `juta`, `miliar`, `triliun`)
* Khusus angka 1000, akan diubah menjadi `"seribu"` secara otomatis
* Fungsi mendukung hingga 15 digit (999 triliun)

---

### 💼 Use Case Umum

| Kasus                               | Keterangan                                             |
| ----------------------------------- | ------------------------------------------------------ |
| 🧾 **Invoice dan kwitansi**         | Mencetak total dalam huruf (misal: "lima juta rupiah") |
| 🏦 **Aplikasi perbankan**           | Validasi nominal transfer                              |
| 📄 **Surat resmi / legal**          | Penyebutan angka hukum secara lengkap                  |
| 📋 **Form penggajian / honorarium** | Penyebutan nominal dalam slip gaji                     |
| 📱 **Mobile app donasi / e-wallet** | Verifikasi pembacaan saldo atau nilai donasi           |

---

### 🔧 Integrasi Tambahan (Opsional)

Ingin hasil akhir seperti:

```ts
`${terbilang(2500000)} rupiah`.toUpperCase(); 
// "DUA JUTA LIMA RATUS RIBU RUPIAH"
```

Atau dibungkus:

```ts
const formatTerbilangRupiah = (num: number) =>
  `${terbilang(num)} rupiah`.replace(/\b\w/g, (c) => c.toUpperCase());
```

---

## 🆔 `validateNIK()` & `parseNIK()`

### 📖 Deskripsi

Fungsi `validateNIK` dan `parseNIK` berfungsi untuk **memverifikasi dan mengambil informasi dari NIK (Nomor Induk Kependudukan)** yang terdiri dari 16 digit dan diterbitkan oleh Dukcapil Indonesia. Fitur ini berguna dalam berbagai aplikasi kependudukan, e-KTP, registrasi, HRIS, hingga verifikasi dokumen.

---

### ✅ `validateNIK(nik: string): boolean`

Mengecek apakah sebuah string NIK valid secara **struktur**:

* Harus 16 digit
* Bulan valid: 01–12
* Tanggal valid: 01–31 (atau 41–71 untuk perempuan)

#### 📦 Contoh Penggunaan:

```ts
validateNIK("3201010209980003"); // true
validateNIK("1234567890123456"); // false (bisa salah tanggal/bulan)
```

#### 🔍 Penjelasan:

* Perempuan memiliki `tanggal lahir + 40` (contoh: `02` → `42`)
* Format standar NIK:

  ```
  AABBCCDDMMYYXXXX
   |  |  |  |  |
   |  |  |  |  └── 4 digit unik
   |  |  |  └────── Tahun lahir (YY)
   |  |  └────────── Bulan lahir (MM)
   |  └────────────── Tanggal lahir (DD / DD + 40 untuk perempuan)
   └───────────────── Kode wilayah (provinsi, kabupaten, kecamatan)
  ```

---

### ✅ `parseNIK(nik: string): ParsedNIK | null`

Mengambil **informasi terstruktur** dari NIK yang valid:

* Kode provinsi, kabupaten, kecamatan
* Gender (`'male'` / `'female'`)
* Tanggal lahir (`YYYY-MM-DD`)

#### 📦 Contoh Penggunaan:

```ts
parseNIK("3201014509980003");
```

Hasil:

```ts
{
  provinceCode: '32',
  regencyCode: '01',
  districtCode: '01',
  gender: 'female',
  birthDate: '1998-09-05'
}
```

---

### 🧠 Penjelasan Internal

* Tahun lahir: jika 00–21 → diasumsikan 2000-an, lainnya 1900-an.
* Kode `32` = Jawa Barat (bisa dihubungkan ke data referensi regional untuk lookup wilayah)
* Hasil fungsi sudah dalam format `ISO date (YYYY-MM-DD)` yang siap diproses di DB atau ditampilkan.

---

### 💼 Use Case

| Kasus                      | Manfaat                                                     |
| -------------------------- | ----------------------------------------------------------- |
| 🔐 Verifikasi Registrasi   | Pastikan NIK valid secara struktur sebelum kirim ke backend |
| 📋 Form Admin Kependudukan | Otomatis isi tanggal lahir dan gender dari input NIK        |
| 👩‍💼 HRIS/Payroll         | Otomatis kategorikan data berdasarkan wilayah/gender/umur   |
| 📊 Analitik Demografis     | Kelompokkan user berdasarkan asal wilayah NIK               |
| 📦 E-commerce/Fintech      | Validasi dan parsing dokumen KYC (Know Your Customer)       |

---

### 🔒 Catatan Keamanan

* Fungsi ini **tidak memverifikasi ke Dukcapil**, hanya mengecek struktur dan pola umum
* Untuk validasi resmi, gunakan API dari Disdukcapil atau pihak ketiga yang terintegrasi

---

## 🗓️ Modul Tanggal (date)

Pustaka `indo-format` menyediakan berbagai fungsi untuk menangani tanggal dalam konteks lokal Indonesia, termasuk format human-readable, parsing string tanggal, selisih waktu, dan penulisan waktu relatif ("5 menit yang lalu").

---

### ✅ `formatTanggal(date: Date, options?: { includeDay?: boolean }): string`

Mengubah `Date` menjadi string format Bahasa Indonesia, seperti `"3 Juni 2025"` atau `"Selasa, 3 Juni 2025"`.

#### 📦 Contoh:

```ts
formatTanggal(new Date('2025-06-03'));
// "3 Juni 2025"

formatTanggal(new Date('2025-06-03'), { includeDay: true });
// "Selasa, 3 Juni 2025"
```

---

### ✅ `waktuRelative(from: Date, to?: Date): string`

Memberikan string waktu relatif seperti:

* `"baru saja"`
* `"2 jam yang lalu"`
* `"dalam 5 hari"`

#### 📦 Contoh:

```ts
waktuRelative(new Date(Date.now() - 5 * 60 * 1000)); // "5 menit yang lalu"
waktuRelative(new Date(Date.now() + 86400000));      // "besok"
```

---

### ✅ `parseTanggal(input: string): Date | null`

Menerima string dalam format lokal seperti `"3 Juni 2025"` atau `"Selasa, 3 Juni 2025"` dan mengubahnya menjadi objek `Date`.

#### 📦 Contoh:

```ts
parseTanggal("3 Juni 2025");           // → new Date("2025-06-03")
parseTanggal("Selasa, 3 Juni 2025");   // → new Date("2025-06-03")
```

#### ⚠️ Validasi:

* Akan mengembalikan `null` jika format tidak dikenali atau tidak valid.

---

### ✅ `diffTanggal(from: Date, to: Date, unit: 'hari' | 'bulan' | 'tahun' | 'auto')`

Menghitung selisih antara dua tanggal:

* Dalam hari, bulan, tahun
* Jika `'auto'`, akan memilih unit yang paling signifikan

#### 📦 Contoh:

```ts
diffTanggal(new Date('2023-01-01'), new Date('2025-01-01'), 'tahun'); // 2
diffTanggal(new Date('2025-01-01'), new Date('2025-03-01'), 'bulan'); // 2
diffTanggal(new Date('2025-01-01'), new Date('2025-01-10'), 'hari');  // 9

diffTanggal(new Date('2024-06-01'), new Date('2025-06-01'), 'auto'); // "1 tahun"
diffTanggal(new Date('2025-06-01'), new Date('2025-06-15'), 'auto'); // "14 hari"
```

---

### 🔧 Manfaat & Use Case

| Fungsi          | Manfaat                                              |
| --------------- | ---------------------------------------------------- |
| `formatTanggal` | Tampilkan tanggal user-friendly di UI                |
| `waktuRelative` | Untuk notifikasi, waktu komentar, atau log aktivitas |
| `parseTanggal`  | Parsing input dari pengguna dalam Bahasa Indonesia   |
| `diffTanggal`   | Hitung umur, lama kerja, sisa waktu, dll             |


---

## 🎉 `isHariLiburNasional()`

### 📖 Deskripsi

Fungsi `isHariLiburNasional(date, type)` digunakan untuk **mengecek apakah suatu tanggal adalah hari libur nasional atau cuti bersama** di Indonesia berdasarkan data JSON lokal per tahun.

Ini sangat berguna dalam:

* Aplikasi kehadiran (absensi)
* Kalender perusahaan
* Penjadwalan kerja
* Validasi form cuti atau operasional

---

### ✅ Tipe Parameter

```ts
type LiburItem = {
  tanggal: string; // format: "YYYY-MM-D" atau "YYYY-MM-DD"
  keterangan: string;
};

type LiburType = 'libur' | 'cuti' | 'semua';
```

### ✅ Fungsi

```ts
isHariLiburNasional(date: Date, type?: LiburType): Promise<boolean>
```

* `date`: Tanggal yang ingin dicek
* `type`:

  * `'libur'`: Hanya hari libur nasional (default)
  * `'cuti'`: Hanya cuti bersama
  * `'semua'`: Termasuk keduanya

---

### 📦 Contoh Penggunaan

```ts
const tanggal = new Date('2025-04-1');

const isLibur = await isHariLiburNasional(tanggal); // true
const isCuti = await isHariLiburNasional(tanggal, 'cuti'); // true jika termasuk cuti bersama
const semua = await isHariLiburNasional(tanggal, 'semua'); // true jika cuti atau libur
```

---

### 🧠 Cara Kerja

1. Fungsi membaca file JSON sesuai tahun, misalnya: `data/libur/2025.json`
2. Format input (`Date`) diubah ke string `YYYY-M-D`
3. Setiap tanggal dalam file JSON akan dibandingkan dengan tanggal input
4. Fungsi mengembalikan `true` jika cocok, dan cocok dengan tipe (`libur`, `cuti`, atau `semua`)

#### 📁 Contoh isi file `2025.json`:

```json
[
  { "tanggal": "2025-04-1", "keterangan": "Hari Raya Idul Fitri 1446H" },
  { "tanggal": "2025-04-2", "keterangan": "Cuti Bersama Hari Raya Idul Fitri 1446H" }
]
```

---

### 🧩 Tips Integrasi

* Gunakan bersama fungsi `formatTanggal()` atau `waktuRelative()` untuk UI kalender
* Bisa digabung dengan komponen React `DatePicker` untuk men-disable tanggal libur

---

### ⚠️ Catatan

* Data libur harus tersedia dalam folder `data/libur/` sesuai tahun
* Fungsi ini **tidak bergantung pada API eksternal**, jadi aman dan cepat


---

## 👤 Author

Made with ❤️ by [liupurnomo.com](https://liupurnomo.com)
📩 Contact: [hi@liupurnomo.com](mailto:hi@liupurnomo.com)

---

## 📄 License

[MIT](LICENSE)
