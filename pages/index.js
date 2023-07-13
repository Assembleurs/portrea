import React, { useState, useCallback } from 'react';
import SearchCommune from '../components/nav/SearchCommune';
import CommuneList from '../components/nav/CommuneList';
import GoButton from '../components/nav/GoButton';
import Layout from '../components/Layout'

const Recherche = () => {
  const [communes, setCommunes] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState(null);

  const handleSearch = useCallback((searchTerm) => {
    fetch(`https://geo.api.gouv.fr/communes?nom=${searchTerm}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`)
      .then((res) => res.json())
      .then(setCommunes);
  }, []);

  return (
    <Layout>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #caf0f8, #fde2e4)'
      }}
    >
      <h1 style={{ fontSize: '70px', fontWeight: 'bold', marginBottom: '0px' }}>Portrea</h1>
      <p style={{ fontSize: '40px', marginBottom: '30px' }}>Portrait territorialisé de la relation e-administrative</p>
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
    </Layout>
  );
};

export default Recherche;
