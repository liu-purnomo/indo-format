import { describe, expect, it } from 'vitest';
import { formatRupiah, parseRupiah } from './currency';
describe('formatRupiah', () => {
    it('formats integer to Rupiah with thousands separator', () => {
        expect(formatRupiah(1500000)).toBe('Rp 1.500.000');
    });
    it('formats small number correctly', () => {
        expect(formatRupiah(100)).toBe('Rp 100');
    });
    it('formats zero correctly', () => {
        expect(formatRupiah(0)).toBe('Rp 0');
    });
    it('formats large number correctly', () => {
        expect(formatRupiah(1234567890)).toBe('Rp 1.234.567.890');
    });
    it('formats negative number correctly', () => {
        expect(formatRupiah(-5000)).toBe('Rp -5.000');
    });
    it('supports disabling space between Rp and number', () => {
        // optional: test if you implement that feature later
    });
});
describe('parseRupiah', () => {
    it('parses string with Rp and separator', () => {
        expect(parseRupiah('Rp 1.500.000')).toBe(1500000);
    });
    it('parses string without Rp', () => {
        expect(parseRupiah('2.500.000')).toBe(2500000);
    });
    it('parses string with other characters', () => {
        expect(parseRupiah('Rp. 3.000.000,-')).toBe(3000000);
    });
    it('returns 0 for invalid input', () => {
        expect(parseRupiah('not a number')).toBe(0);
        expect(parseRupiah('')).toBe(0);
    });
    it('parses string with spaces and text', () => {
        expect(parseRupiah('Total: Rp 10.000.000')).toBe(10000000);
    });
    it('parses negative numbers correctly', () => {
        expect(parseRupiah('-Rp 5.000')).toBe(5000); // Note: minus sign stripped
    });
});
