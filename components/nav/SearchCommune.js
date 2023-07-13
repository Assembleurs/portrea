import React, { useState, useEffect } from 'react';

const SearchCommune = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.length > 2) {
      onSearch(searchTerm);
    }
  }, [searchTerm, onSearch]);

  return (
    <input
      type="text"
      placeholder="Recherchez une commune"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: '40%',
        height: '60px',
        padding: '10px',
        fontSize: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}    />
  );
};

export default SearchCommune;
