import { useState } from 'react';
import styles from '../../styles/styles.module.css';

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearch = event => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input type="text" placeholder="Rechercher par nom, commune, ou code postal" value={search} onChange={handleSearch} />
      <button type="submit" className={styles.searchButton}>Rechercher</button>
    </form>
  );
}
