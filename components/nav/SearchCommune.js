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
    />
  );
};

export default SearchCommune;
