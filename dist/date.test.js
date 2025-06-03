import { describe, expect, it } from 'vitest';
import { formatTanggal, waktuRelative } from './date';
describe('formatTanggal', () => {
    it('formats date without day name', () => {
        const date = new Date('2024-08-17');
        expect(formatTanggal(date)).toBe('17 Agustus 2024');
    });
    it('formats date with day name', () => {
        const date = new Date('2024-08-17'); // Sabtu
        expect(formatTanggal(date, { includeDay: true })).toBe('Sabtu, 17 Agustus 2024');
    });
});
describe('waktuRelative', () => {
    const now = new Date();
    it('shows "baru saja" for < 60 sec diff', () => {
        expect(waktuRelative(new Date(now.getTime() - 30 * 1000), now)).toBe('baru saja');
    });
    it('handles minutes ago / future', () => {
        expect(waktuRelative(new Date(now.getTime() - 5 * 60 * 1000), now)).toBe('5 menit yang lalu');
        expect(waktuRelative(new Date(now.getTime() + 5 * 60 * 1000), now)).toBe('dalam 5 menit');
    });
    it('handles hours ago / future', () => {
        expect(waktuRelative(new Date(now.getTime() - 2 * 60 * 60 * 1000), now)).toBe('2 jam yang lalu');
        expect(waktuRelative(new Date(now.getTime() + 2 * 60 * 60 * 1000), now)).toBe('dalam 2 jam');
    });
    it('handles "kemarin" and "besok"', () => {
        expect(waktuRelative(new Date(now.getTime() - 24 * 60 * 60 * 1000), now)).toBe('kemarin');
        expect(waktuRelative(new Date(now.getTime() + 24 * 60 * 60 * 1000), now)).toBe('besok');
    });
    it('handles months and years', () => {
        expect(waktuRelative(new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000), now)).toBe('3 bulan yang lalu');
        expect(waktuRelative(new Date(now.getTime() + 730 * 24 * 60 * 60 * 1000), now)).toBe('dalam 2 tahun');
    });
});
import { parseTanggal } from './date';
describe('parseTanggal', () => {
    it('parses basic Indo date string', () => {
        const result = parseTanggal('17 Agustus 2024');
        expect(result?.getFullYear()).toBe(2024);
        expect(result?.getMonth()).toBe(7); // Agustus = 7
        expect(result?.getDate()).toBe(17);
    });
    it('parses Indo date with day name', () => {
        const result = parseTanggal('Sabtu, 17 Agustus 2024');
        expect(result?.getDate()).toBe(17);
    });
    it('returns null for invalid input', () => {
        expect(parseTanggal('17 BulanAneh 2024')).toBeNull();
        expect(parseTanggal('Bla bla bla')).toBeNull();
    });
});
import { diffTanggal } from './date';
describe('diffTanggal', () => {
    it('calculates difference in days', () => {
        expect(diffTanggal(new Date('2024-08-17'), new Date('2024-08-20'))).toBe(3);
        expect(diffTanggal(new Date('2024-08-20'), new Date('2024-08-17'))).toBe(-3);
    });
    it('calculates difference in months', () => {
        expect(diffTanggal(new Date('2024-01-01'), new Date('2024-04-01'), 'bulan')).toBe(3);
    });
    it('calculates difference in years', () => {
        expect(diffTanggal(new Date('2020-01-01'), new Date('2024-01-01'), 'tahun')).toBe(4);
    });
    it('uses auto unit', () => {
        expect(diffTanggal(new Date('2020-01-01'), new Date('2023-01-01'), 'auto')).toBe('3 tahun');
        expect(diffTanggal(new Date('2023-01-01'), new Date('2023-10-01'), 'auto')).toBe('9 bulan');
        expect(diffTanggal(new Date('2023-01-01'), new Date('2023-01-10'), 'auto')).toBe('9 hari');
    });
});
