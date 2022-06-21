export const isRealGeoAPIEnabled = () =>
  process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_REAL_GEO_API;
