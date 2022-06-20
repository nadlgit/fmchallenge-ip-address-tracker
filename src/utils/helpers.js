export const isValidIP = (ipAddress) => {
  if (typeof ipAddress !== 'string') {
    return false;
  }

  // Only IP v4 is handled
  const ipParts = ipAddress?.trim()?.split('.');
  return (
    ipParts?.length === 4 &&
    ipParts?.every((item) => /^\d+$/.test(item) && item >= 0 && item <= 255)
  );
};
