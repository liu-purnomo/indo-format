import { describe, expect, it, vi } from 'vitest';
import { isHariLiburNasional } from './holiday';

describe('isHariLiburNasional', () => {
  it('returns true for national holiday (non-cuti)', async () => {
    const result = await isHariLiburNasional(new Date('2025-08-17'));
    expect(result).toBe(true); // Hari Kemerdekaan
  });

  it('returns true for cuti bersama with type "cuti"', async () => {
    const result = await isHariLiburNasional(new Date('2025-12-26'), 'cuti');
    expect(result).toBe(true); // Cuti Bersama Natal
  });

  it('returns false for cuti bersama with type "libur"', async () => {
    const result = await isHariLiburNasional(new Date('2025-12-26'), 'libur');
    expect(result).toBe(false);
  });

  it('returns true for cuti bersama with type "semua"', async () => {
    const result = await isHariLiburNasional(new Date('2025-12-26'), 'semua');
    expect(result).toBe(true);
  });

  it('returns false for non-holiday date', async () => {
    const result = await isHariLiburNasional(new Date('2025-08-18'));
    expect(result).toBe(false);
  });

  it('returns false and logs warning for missing year', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const result = await isHariLiburNasional(new Date('2099-01-01'));
    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('2099'));
    consoleSpy.mockRestore();
  });
});
