import { formatTimezone } from './format-timezone';

export const composeResult = (json) => {
  const ip = json?.ip ?? '';
  const city = json?.city ?? '';
  const state_prov = json?.state_prov ?? '';
  const country_name = json?.country_name ?? '';
  const zipcode = json?.zipcode ?? '';
  const isp = json?.isp ?? '';
  const latitude = json?.latitude ? Number(json?.latitude) : 0;
  const longitude = json?.longitude ? Number(json?.longitude) : 0;
  const timezone =
    formatTimezone(
      json?.time_zone?.offset,
      json?.time_zone?.is_dst,
      json?.time_zone?.dst_savings
    ) ?? '';
  const region = state_prov ? state_prov : country_name;
  const location = (city + (city && region ? ', ' : '') + region + ` ${zipcode}`).trim();
  return { ip, location, timezone, isp, latitude, longitude };
};
