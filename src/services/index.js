const API_PROVIDER = 'ipgeolocation';

let apiProviderFetchLocation;
if (API_PROVIDER === 'ipgeolocation') {
  import('./ipgeolocation-api').then((module) => {
    apiProviderFetchLocation = module.fetchLocation;
  });
} else {
  import('./geo-ipify-api').then((module) => {
    apiProviderFetchLocation = module.fetchLocation;
  });
}

export const fetchLocation = (ip) => apiProviderFetchLocation(ip);
