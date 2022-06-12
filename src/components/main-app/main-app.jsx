import styles from './main-app.module.css';
import { ChallengeAttribution } from 'components/challenge-attribution';
import { Search } from 'components/search';
import { LocationInfo } from 'components/location-info';
import { Map } from 'components/map';

export const MainApp = () => {
  return (
    <div className={styles.container}>
      <main>
        <h1>IP Address Tracker</h1>
        <Search />
        <LocationInfo
          ip={'192.212.174.101'}
          location={'Brooklyn, NY 10001'}
          timezone={'-05:00'}
          isp={'SpaceX Starlink'}
        />
        <Map />
      </main>
      <footer>
        <ChallengeAttribution />
      </footer>
    </div>
  );
};
