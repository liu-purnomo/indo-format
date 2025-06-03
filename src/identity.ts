export function validateNIK(nik: string): boolean {
  if (!/^\d{16}$/.test(nik)) return false;

  const dayPart = parseInt(nik.slice(6, 8), 10);
  const month = parseInt(nik.slice(8, 10), 10);
  const year = parseInt(nik.slice(10, 12), 10);

  if (month < 1 || month > 12) return false;

  const isFemale = dayPart > 40;
  const day = isFemale ? dayPart - 40 : dayPart;

  if (day < 1 || day > 31) return false;

  return true;
}

export type ParsedNIK = {
  provinceCode: string;
  regencyCode: string;
  districtCode: string;
  gender: 'male' | 'female';
  birthDate: string;
};

export function parseNIK(nik: string): ParsedNIK | null {
  if (!validateNIK(nik)) return null;

  const provinceCode = nik.slice(0, 2);
  const regencyCode = nik.slice(2, 4);
  const districtCode = nik.slice(4, 6);

  const dayPart = parseInt(nik.slice(6, 8), 10);
  const month = parseInt(nik.slice(8, 10), 10);
  const year = parseInt(nik.slice(10, 12), 10);

  const isFemale = dayPart > 40;
  const day = isFemale ? dayPart - 40 : dayPart;

  const fullYear = year >= 0 && year <= 21 ? 2000 + year : 1900 + year;

  const birthDate = `${fullYear.toString().padStart(4, '0')}-${month
    .toString()
    .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  return {
    provinceCode,
    regencyCode,
    districtCode,
    gender: isFemale ? 'female' : 'male',
    birthDate,
  };
}
