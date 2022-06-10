import styles from './location-info.module.css';

export const LocationInfo = () => {
  return (
    <div className={styles.location}>
      <p>IP Address</p>
      <p>192.212.174.101</p>
      <p>Location</p>
      <p>Brooklyn, NY 10001</p>
      <p>Timezone</p>
      <p>UTC -05:00</p>
      <p>ISP</p>
      <p>SpaceX Starlink</p>
    </div>
  );
};
