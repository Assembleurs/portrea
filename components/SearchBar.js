import React, { useState } from 'react';
import styles from '../styles/styles.module.css'; 

const SearchBar = ({ onSearch }) => {
  const [postalCode, setPostalCode] = useState('');

  const handleSearch = () => {
    onSearch(postalCode);
  };

  return (
    <div>
      <input
        type="text"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Entrez un code postal"
      />
    <button className={styles.searchButton} onClick={handleSearch}>
    Rechercher
    </button>
    </div>
  );
};

export default SearchBar;
