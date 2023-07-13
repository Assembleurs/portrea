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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Recherchez votre commune</h1>
      <SearchCommune onSearch={handleSearch} />
      {communes.length > 0 && (
        <div style={{ marginTop: '20px', width: '50%', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
          <CommuneList communes={communes} onSelect={setSelectedCommune} />
        </div>
      )}
      {selectedCommune && (
        <div style={{ marginTop: '20px' }}>
          <GoButton commune={selectedCommune} />
        </div>
      )}
    </div>
  );
};

export default Recherche;
