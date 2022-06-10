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
        <LocationInfo />
        <Map />
      </main>
      <footer>
        <ChallengeAttribution />
      </footer>
    </div>
  );
};
