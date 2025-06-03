import { describe, expect, it } from 'vitest';
import { parseNIK } from './identity';

describe('parseNIK', () => {
  it('parses a valid male NIK', () => {
    const result = parseNIK('3201010209980003');
    expect(result).toEqual({
      provinceCode: '32',
      regencyCode: '01',
      districtCode: '01',
      gender: 'male',
      birthDate: '1998-09-02',
    });
  });

  it('parses a valid female NIK', () => {
    const result = parseNIK('3201014509980003');
    expect(result).toEqual({
      provinceCode: '32',
      regencyCode: '01',
      districtCode: '01',
      gender: 'female',
      birthDate: '1998-09-05',
    });
  });

  it('returns null for invalid NIK', () => {
    expect(parseNIK('123')).toBeNull();
  });
});
