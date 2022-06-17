import styles from './search.module.css';
import iconArrow from './icon-arrow.svg';
import Image from 'next/image';
import { useRef } from 'react';
import { isValidIP } from 'utils/helpers';

export const Search = ({ onSearch = () => {} }) => {
  const input = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.current.value?.trim();
    if (isValidIP(value)) {
      input.current.value = '';
      onSearch(value);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input ref={input} type="search" placeholder="Search for any IP address" />
      <button>
        <Image src={iconArrow} alt="Submit" />
      </button>
    </form>
  );
};
