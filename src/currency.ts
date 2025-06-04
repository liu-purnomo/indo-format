export function formatRupiah(
  value: number,
  options?: { withSpace?: boolean }
): string {
  const num = Number(value);
  const space = options?.withSpace ? ' ' : '';
  return 'Rp' + space + num.toLocaleString('id-ID');
}

export function parseRupiah(str: string): number {
  const cleaned = str.replace(/[^0-9,]/g, '').replace(',', '.');
  return Number(cleaned);
}