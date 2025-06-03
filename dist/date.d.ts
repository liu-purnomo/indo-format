export declare function formatTanggal(date: Date, options?: {
    includeDay?: boolean;
}): string;
export declare function waktuRelative(from: Date, to?: Date): string;
export declare function parseTanggal(input: string): Date | null;
export type DiffUnit = 'hari' | 'bulan' | 'tahun' | 'auto';
export declare function diffTanggal(from: Date, to: Date, unit?: DiffUnit): number | string;
