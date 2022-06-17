import { isValidIP } from './helpers';

describe('isValidIP with IP v4', () => {
  it('returns true when valid address', () => {
    expect(isValidIP('11.22.33.44')).toBeTruthy();
    expect(isValidIP('0.0.0.0')).toBeTruthy();
    expect(isValidIP('255.255.255.255')).toBeTruthy();
  });

  it('returns false when there are not only numeric characters and 3 dots', () => {
    expect(isValidIP('11.22.33.44.55')).toBeFalsy();
    expect(isValidIP('11.22.3344')).toBeFalsy();
    expect(isValidIP('a.22.33.44')).toBeFalsy();
    expect(isValidIP('-1.22.33.44')).toBeFalsy();
    expect(isValidIP('11 .22.33.44')).toBeFalsy();
  });

  it('returns false when there are not 4 numbers between 0 and 255', () => {
    expect(isValidIP('11.22.33.256')).toBeFalsy();
    expect(isValidIP('11.22.256.44')).toBeFalsy();
    expect(isValidIP('11.256.33.44')).toBeFalsy();
    expect(isValidIP('256.22.33.44')).toBeFalsy();
    expect(isValidIP('11.22.33.')).toBeFalsy();
  });
});
