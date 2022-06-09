import styles from './page-layout.module.css';
import { ChallengeAttribution } from 'components/challenge-attribution';

export const PageLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
      <footer>
        <ChallengeAttribution />
      </footer>
    </div>
  );
};
