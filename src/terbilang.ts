export function terbilang(num: number): string {
  if (num === 0) return 'nol';

  const satuan = [
    '',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
  ];
  const ribuan = ['', 'ribu', 'juta', 'miliar', 'triliun'];

  let i = 0;
  let result = '';

  while (num > 0) {
    const group = num % 1000;
    if (group > 0) {
      const groupStr = convertThreeDigits(group, satuan);

      let prefix = '';
      let suffix = ribuan[i];

      if (group === 1 && i === 1) {
        prefix = 'seribu';
        suffix = '';
      } else {
        prefix = groupStr;
      }

      result = `${prefix} ${suffix} ${result}`.trim();
    }

    num = Math.floor(num / 1000);
    i++;
  }

  return result.trim();
}

function convertThreeDigits(num: number, satuan: string[]): string {
  const ratus = Math.floor(num / 100);
  const puluh = Math.floor((num % 100) / 10);
  const satu = num % 10;

  let str = '';

  if (ratus > 0) {
    str += ratus === 1 ? 'seratus' : `${satuan[ratus]} ratus`;
    str += ' ';
  }

  if (puluh === 1) {
    if (satu === 0) str += 'sepuluh';
    else if (satu === 1) str += 'sebelas';
    else str += `${satuan[satu]} belas`;
  } else if (puluh > 1) {
    str += `${satuan[puluh]} puluh`;
    if (satu > 0) str += ` ${satuan[satu]}`;
  } else {
    if (satu > 0) str += satuan[satu];
  }

  return str.trim();
}
