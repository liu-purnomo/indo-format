import { describe, expect, it } from 'vitest';
import { terbilang } from './terbilang';

describe('terbilang', () => {
  it('returns nol for 0', () => {
    expect(terbilang(0)).toBe('nol');
  });

  it('handles small numbers', () => {
    expect(terbilang(1)).toBe('satu');
    expect(terbilang(11)).toBe('sebelas');
    expect(terbilang(25)).toBe('dua puluh lima');
  });

  it('handles hundreds', () => {
    expect(terbilang(100)).toBe('seratus');
    expect(terbilang(321)).toBe('tiga ratus dua puluh satu');
  });

  it('handles thousands', () => {
    expect(terbilang(1000)).toBe('seribu');
    expect(terbilang(32000)).toBe('tiga puluh dua ribu');
  });

  it('handles millions', () => {
    expect(terbilang(1000000)).toBe('satu juta');
    expect(terbilang(1234567)).toBe(
      'satu juta dua ratus tiga puluh empat ribu lima ratus enam puluh tujuh'
    );
  });

  it('handles billions and trillions', () => {
    expect(terbilang(1000000000)).toBe('satu miliar');
    expect(terbilang(1000000000000)).toBe('satu triliun');
  });
});
