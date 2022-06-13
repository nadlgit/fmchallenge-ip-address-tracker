import styles from './main-app.module.css';
import { ChallengeAttribution } from 'components/challenge-attribution';
import { Search } from 'components/search';
import { LocationInfo } from 'components/location-info';

import dynamic from 'next/dynamic';
const Map = dynamic(() => import('components/map').then((module) => module.Map), {
  ssr: false,
  loading: () => <p>Loading map ...</p>,
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
          <Map longitude={51.505} latitude={-0.09} />
        </div>
      </main>
      <footer>
        <ChallengeAttribution />
      </footer>
    </div>
  );
};
