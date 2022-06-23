const API_PROVIDER = 'geo-ipify';

let apiProviderFetchLocation;
if (API_PROVIDER === 'ipgeolocation') {
  import('services/ipgeolocation-api').then((module) => {
    apiProviderFetchLocation = module.fetchLocation;
  });
} else {
  import('services/geo-ipify-api').then((module) => {
    apiProviderFetchLocation = module.fetchLocation;
  });
}

export const fetchLocation = (ip) => apiProviderFetchLocation(ip);
