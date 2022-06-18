import styles from './main-app.module.css';
import { useState, useEffect } from 'react';
import { useIpLocation } from 'utils/use-ip-location';
import { ChallengeAttribution } from 'components/challenge-attribution';
import { Search } from 'components/search';
import { LocationInfo } from 'components/location-info';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('components/map').then((module) => module.Map), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'hsl(0,0%,90%)' }}></div>
  ),
});

export const MainApp = () => {
  const [ipLocation, setIpLocation] = useState({});
  const [searchIp, setSearchIp] = useState('');
  const { isLoading, error, data } = useIpLocation(searchIp);

  useEffect(() => {
    if (!isLoading && !error) {
      setIpLocation(data);
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
