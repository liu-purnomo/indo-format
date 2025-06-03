const namaBulan = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const namaHari = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

export function formatTanggal(
  date: Date,
  options?: { includeDay?: boolean }
): string {
  const tgl = date.getDate();
  const bulan = namaBulan[date.getMonth()];
  const tahun = date.getFullYear();

  if (options?.includeDay) {
    const hari = namaHari[date.getDay()];
    return `${hari}, ${tgl} ${bulan} ${tahun}`;
  }

  return `${tgl} ${bulan} ${tahun}`;
}

export function waktuRelative(from: Date, to: Date = new Date()): string {
  const diffMilliseconds = to.getTime() - from.getTime();
  const diffSeconds = Math.floor(Math.abs(diffMilliseconds) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const isFuture = diffMilliseconds < 0;

  if (diffSeconds < 60) return 'baru saja';
  if (diffMinutes < 60)
    return isFuture
      ? `dalam ${diffMinutes} menit`
      : `${diffMinutes} menit yang lalu`;

  if (diffHours < 24)
    return isFuture ? `dalam ${diffHours} jam` : `${diffHours} jam yang lalu`;

  if (diffDays === 1) return isFuture ? 'besok' : 'kemarin';

  if (diffDays < 30)
    return isFuture ? `dalam ${diffDays} hari` : `${diffDays} hari yang lalu`;

  if (diffMonths < 12)
    return isFuture
      ? `dalam ${diffMonths} bulan`
      : `${diffMonths} bulan yang lalu`;

  return isFuture ? `dalam ${diffYears} tahun` : `${diffYears} tahun yang lalu`;
}

const bulanMap: Record<string, number> = {
  januari: 0,
  februari: 1,
  maret: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  agustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  desember: 11,
};

export function parseTanggal(input: string): Date | null {
  const clean = input.toLowerCase().replace(/,/g, '').trim();
  const parts = clean.split(' ');

  let dayStr: string, monthStr: string, yearStr: string;

  if (parts.length === 3) {
    [dayStr, monthStr, yearStr] = parts;
  } else if (parts.length === 4) {
    [, dayStr, monthStr, yearStr] = parts;
  } else {
    return null;
  }

  const day = parseInt(dayStr, 10);
  const month = bulanMap[monthStr];
  const year = parseInt(yearStr, 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

  const date = new Date(year, month, day);
  return isNaN(date.getTime()) ? null : date;
}

export type DiffUnit = 'hari' | 'bulan' | 'tahun' | 'auto';

export function diffTanggal(
  from: Date,
  to: Date,
  unit: DiffUnit = 'hari'
): number | string {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = to.getTime() - from.getTime();
  const absDiffDays = Math.floor(Math.abs(diffMs) / msPerDay);

  const fromYear = from.getFullYear();
  const toYear = to.getFullYear();
  const fromMonth = from.getFullYear() * 12 + from.getMonth();
  const toMonth = to.getFullYear() * 12 + to.getMonth();

  const yearDiff = Math.abs(toYear - fromYear);
  const monthDiff = Math.abs(toMonth - fromMonth);

  if (unit === 'hari') return diffMs >= 0 ? absDiffDays : -absDiffDays;
  if (unit === 'bulan') return diffMs >= 0 ? monthDiff : -monthDiff;
  if (unit === 'tahun') return diffMs >= 0 ? yearDiff : -yearDiff;

  // auto
  if (yearDiff >= 1) return `${yearDiff} tahun`;
  if (monthDiff >= 1) return `${monthDiff} bulan`;
  return `${absDiffDays} hari`;
}
