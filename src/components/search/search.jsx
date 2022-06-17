import styles from './search.module.css';
import iconArrow from './icon-arrow.svg';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { isValidIP } from 'utils/helpers';

export const Search = ({ onSearch = () => {} }) => {
  const inputControl = useRef();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputControl.current.value?.trim();
    if (value === '' || isValidIP(value)) {
      inputControl.current.value = '';
      value && onSearch(value);
    } else {
      setError('Please enter a valid IP v4 address');
    }
  };

  const handleCHange = (e) => {
    if (error && inputControl.current.value !== '') {
      setError('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputControl}
        type="search"
        placeholder="Search for any IP address"
        onChange={handleCHange}
        className={error ? styles.error : ''}
      />
      <button>
        <Image src={iconArrow} alt="Submit" />
      </button>
    </form>
  );
};
