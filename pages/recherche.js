import React, { useState, useCallback } from 'react';
import SearchCommune from '../components/nav/SearchCommune';
import CommuneList from '../components/nav/CommuneList';
import GoButton from '../components/nav/GoButton';

const Recherche = () => {
  const [communes, setCommunes] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState(null);

  const handleSearch = useCallback((searchTerm) => {
    fetch(`https://geo.api.gouv.fr/communes?nom=${searchTerm}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`)
      .then((res) => res.json())
      .then(setCommunes);
  }, []);

  return (
    <div>
      <h1>Recherchez votre commune</h1>
      <SearchCommune onSearch={handleSearch} />
      {communes.length > 0 && (
        <CommuneList communes={communes} onSelect={setSelectedCommune} />
      )}
      {selectedCommune && <GoButton commune={selectedCommune} />}
    </div>
  );
};

export default Recherche;
