import styles from './location-info.module.css';

export const LocationInfo = ({ ip = '', location = '', timezone = '', isp = '' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>IP Address</h3>
        <p>{ip}</p>
      </div>
      <div className={styles.section}>
        <h3>Location</h3>
        <p>{location}</p>
      </div>
      <div className={styles.section}>
        <h3>Timezone</h3>
        <p>{timezone ? `UTC ${timezone}` : ''}</p>
      </div>
      <div className={styles.section}>
        <h3>ISP</h3>
        <p>{isp}</p>
      </div>
    </div>
  );
};
