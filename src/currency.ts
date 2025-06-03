export function formatRupiah(num: number): string {
  return 'Rp ' + num.toLocaleString('id-ID');
}

export function parseRupiah(str: string): number {
  return Number(str.replace(/[^0-9]/g, ''));
}
