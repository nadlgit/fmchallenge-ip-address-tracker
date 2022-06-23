import { formatTimezone } from './format-timezone';

const invalidOffset = [
  { offset: undefined, is_dst: false, dst_savings: 0 },
  { offset: 'abcd', is_dst: false, dst_savings: 0 },
  { offset: -12.1, is_dst: false, dst_savings: 0 },
  { offset: 14.1, is_dst: false, dst_savings: 0 },
];

const invalidIsDst = [
  { offset: 0, is_dst: undefined, dst_savings: 0 },
  { offset: 0, is_dst: 'abcd', dst_savings: 0 },
];

const invalidDstSavings = [
  { offset: 0, is_dst: false, dst_savings: undefined },
  { offset: 0, is_dst: false, dst_savings: 'abcd' },
];

const validData = [
  { offset: -4, is_dst: false, dst_savings: 1, expected: '-04:00' },
  { offset: -4, is_dst: true, dst_savings: 1, expected: '-03:00' },
  { offset: 1, is_dst: false, dst_savings: 0, expected: '+01:00' },
  { offset: 1.5, is_dst: false, dst_savings: 0, expected: '+01:30' },
  { offset: 9.75, is_dst: true, dst_savings: 2, expected: '+11:45' },
  { offset: -12, is_dst: true, dst_savings: 2, expected: '-10:00' },
  { offset: 14, is_dst: true, dst_savings: 1, expected: '+15:00' },
  { offset: 0, is_dst: false, dst_savings: 0, expected: '+00:00' },
];

describe('formatTimezone()', () => {
  it.each([...invalidOffset, ...invalidIsDst, ...invalidDstSavings])(
    'shoud return empty string for ($offset, $is_dst, $dst_savings)',
    (val) => {
      expect(formatTimezone(val.offset, val.is_dst, val.dst_savings)).toBe('');
    }
  );

  it.each(validData)('shoud return "$expected" for ($offset, $is_dst, $dst_savings)', (val) => {
    expect(formatTimezone(val.offset, val.is_dst, val.dst_savings)).toBe(val.expected);
  });
});
