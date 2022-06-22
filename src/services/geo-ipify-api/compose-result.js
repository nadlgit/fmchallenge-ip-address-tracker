export const composeResult = (json) => {
  const ip = json?.ip ?? '';
  const city = json?.location?.city ?? '';
  const region = json?.location?.region ?? '';
  const postalCode = json?.location?.postalCode ?? '';
  const timezone = json?.location?.timezone ?? '';
  const isp = json?.isp ?? '';
  const latitude = json?.location?.lat ?? 0;
  const longitude = json?.location?.lng ?? 0;

  const location = (city + (city && region ? ', ' : '') + region + ` ${postalCode}`).trim();

  return { ip, location, timezone, isp, latitude, longitude };
};
