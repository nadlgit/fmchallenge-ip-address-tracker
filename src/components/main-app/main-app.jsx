import styles from './main-app.module.css';
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
  return (
    <div className={styles.container}>
      <main>
        <h1>IP Address Tracker</h1>
        <Search onSearch={() => {}} />
        <LocationInfo
          ip={'192.212.174.101'}
          location={'Brooklyn, NY 10001'}
          timezone={'-05:00'}
          isp={'SpaceX Starlink'}
        />
        <div className={styles.map}>
          <Map latitude={40.65} longitude={-73.95} />
        </div>
      </main>
      <footer>
        <ChallengeAttribution />
      </footer>
    </div>
  );
};
