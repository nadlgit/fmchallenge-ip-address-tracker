import styles from './search.module.css';
import IconArrow from 'assets/images/icon-arrow.svg';
import Image from 'next/image';

export const Search = () => {
  return (
    <form className={styles.form}>
      <input type="search" placeholder="Search for any IP address or domain" />
      <button>
        <Image src={IconArrow} alt="Submit" />
      </button>
    </form>
  );
};
