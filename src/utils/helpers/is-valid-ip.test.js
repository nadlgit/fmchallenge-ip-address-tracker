import { isValidIP } from './is-valid-ip';

describe('isValidIP()', () => {
  it('should return false when param is not a string', () => {
    expect(isValidIP({})).toBeFalsy();
  });

  it('should return false for empty string', () => {
    expect(isValidIP('')).toBeFalsy();
  });

  it('should ignore trailing spaces', () => {
    const testValues = ['', '124.54.1.24', 'abcd'];
    testValues.forEach((item) => expect(isValidIP(`  ${item}  `)).toBe(isValidIP(item)));
  });
});

describe('isValidIP() for IP v4', () => {
  it.each(['11.22.33.44', '0.0.0.0', '255.255.255.255'])('should return true for "%s"', (val) => {
    expect(isValidIP(val)).toBeTruthy();
  });

  it.each([
    '11.22.33.256',
    '11.22.256.44',
    '11.256.33.44',
    '256.22.33.44',
    '11.22.33.',
    '11.22.33.44.55',
    '11.22.3344',
    'a.22.33.44',
    '-1.22.33.44',
    '11 .22.33.44',
  ])('should return false for "%s"', (val) => {
    expect(isValidIP(val)).toBeFalsy();
  });
});
