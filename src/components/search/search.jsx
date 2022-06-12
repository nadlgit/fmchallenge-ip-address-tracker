import styles from './search.module.css';
import IconArrow from 'assets/images/icon-arrow.svg';
import Image from 'next/image';
import { useRef } from 'react';

export const Search = ({ onSearch = () => {} }) => {
  const input = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.current.value;
    input.current.value = '';
    onSearch(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input ref={input} type="search" placeholder="Search for any IP address or domain" />
      <button>
        <Image src={IconArrow} alt="Submit" />
      </button>
    </form>
  );
};
