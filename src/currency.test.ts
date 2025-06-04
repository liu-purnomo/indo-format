import { describe, expect, it } from 'vitest';
import { formatRupiah, parseRupiah } from './currency';

describe('formatRupiah', () => {
  it('formats correctly without space by default', () => {
    expect(formatRupiah(5000)).toBe('Rp5.000');
    expect(formatRupiah(1500000)).toBe('Rp1.500.000');
  });

  it('formats with space when withSpace is true', () => {
    expect(formatRupiah(5000, { withSpace: true })).toBe('Rp 5.000');
    expect(formatRupiah(1500000, { withSpace: true })).toBe('Rp 1.500.000');
  });

  it('handles zero value', () => {
    expect(formatRupiah(0)).toBe('Rp0');
  });

  it('handles decimal values', () => {
    expect(formatRupiah(5000.75)).toBe('Rp5.000,75');
  });
});

describe('parseRupiah', () => {
  it('parses plain string correctly', () => {
    expect(parseRupiah('Rp5.000')).toBe(5000);
  });

  it('parses with space correctly', () => {
    expect(parseRupiah('Rp 5.000')).toBe(5000);
  });

  it('parses with decimals using comma', () => {
    expect(parseRupiah('Rp5.000,75')).toBe(5000.75);
  });

  it('parses large number correctly', () => {
    expect(parseRupiah('Rp1.500.000')).toBe(1500000);
  });

  it('parses malformed input gracefully', () => {
    expect(parseRupiah('Rpabc123.456xyz')).toBe(123456);
  });
});

