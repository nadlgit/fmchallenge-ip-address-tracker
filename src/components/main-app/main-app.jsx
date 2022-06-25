import styles from './main-app.module.css';
import { useState, useEffect } from 'react';
import { useIpLocation } from 'utils/use-ip-location';
import { ChallengeAttribution } from 'components/challenge-attribution';
import { Search } from 'components/search';
import { LocationInfo } from 'components/location-info';
import { Map } from 'components/map';
import { toast } from 'react-toastify';

export const MainApp = () => {
  const [ipLocation, setIpLocation] = useState({
    ip: '',
    location: '',
    timezone: '',
    isp: '',
    latitude: 0,
    longitude: 0,
  });
  const [searchIp, setSearchIp] = useState('');
  const { isLoading, error, data } = useIpLocation(searchIp);
  const loadingToastId = 'toast-id-loading';
  const successToastId = 'toast-id-success';
  const errorToastId = 'toast-id-error';

  useEffect(() => {
    if (!isLoading && !error) {
      setIpLocation(data);
    }

    if (isLoading) {
      toast.loading('Searching location...', { toastId: loadingToastId });
    } else {
      if (toast.isActive(loadingToastId)) {
        toast.dismiss(loadingToastId);
      }
      error
        ? toast.error('Something went wrong!', { toastId: errorToastId, autoClose: 2000 })
        : toast.success('Done!', { toastId: successToastId, autoClose: 500 });
    }
  }, [isLoading, error, data]);

  return (
    <div className={styles.container}>
      <main>
        <h1>IP Address Tracker</h1>
        <Search onSearch={setSearchIp} />
        <LocationInfo
          ip={ipLocation?.ip}
          location={ipLocation?.location}
          timezone={ipLocation?.timezone}
          isp={ipLocation?.isp}
        />
        <div className={styles.map}>
          <Map latitude={ipLocation?.latitude} longitude={ipLocation?.longitude} />
        </div>
      </main>
      <footer>
        <ChallengeAttribution />
      </footer>
    </div>
  );
};
