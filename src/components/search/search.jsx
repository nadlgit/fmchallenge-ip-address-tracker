import styles from './search.module.css';
import iconArrow from './icon-arrow.svg';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { isValidIP } from 'utils/helpers';

export const Search = ({ onSearch = () => {} }) => {
  const input = useRef();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.current.value?.trim();
    if (value === '' || isValidIP(value)) {
      setError('');
      input.current.value = '';
      value && onSearch(value);
    } else {
      setError('Please enter a valid IP v4 address');
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
