export const formatTimezone = (offset, is_dst, dst_savings) => {
  if (
    typeof offset !== 'number' ||
    offset < -12 ||
    offset > 14 ||
    typeof is_dst !== 'boolean' ||
    typeof dst_savings !== 'number'
  ) {
    return '';
  }

  const offsetWithDst = is_dst ? offset + dst_savings : offset;
  const sign = offsetWithDst >= 0 ? '+' : '-';
  const hours = Math.trunc(Math.abs(offsetWithDst)).toString().padStart(2, '0');
  const minutes = Math.round((Math.abs(offsetWithDst) - hours) * 60)
    .toString()
    .padStart(2, '0');
  return `${sign}${hours}:${minutes}`;
};
