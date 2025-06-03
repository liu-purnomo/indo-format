export declare function validateNIK(nik: string): boolean;
export type ParsedNIK = {
    provinceCode: string;
    regencyCode: string;
    districtCode: string;
    gender: 'male' | 'female';
    birthDate: string;
};
export declare function parseNIK(nik: string): ParsedNIK | null;
