export const handleOwnIp = async (searchIp) => {
  let ip = searchIp ?? '';
  if (!ip && (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_REAL_GEO_API)) {
    const response = await fetch('https://api.ipify.org/');
    if (response.ok) {
      ip = await response.text();
    }
  }
  return ip;
};
