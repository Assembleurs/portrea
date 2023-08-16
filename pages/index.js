import React, { useState, useCallback } from 'react';
import SearchCommune from '../components/nav/SearchCommune';
import CommuneList from '../components/nav/CommuneList';
import GoButton from '../components/nav/GoButton';
import Layout from '../components/Layout'

const Recherche = () => {
  const [hovered, setHovered] = useState(false);
  const [communes, setCommunes] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState(null);

  const handleSearch = useCallback((searchTerm) => {
    fetch(`https://geo.api.gouv.fr/communes?nom=${searchTerm}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`)
      .then((res) => res.json())
      .then(setCommunes);
  }, []);

  const linkStyle = {
    textDecoration: 'none',
    color: hovered ? '#0077b6' : 'inherit', 
    transition: 'color 0.1s ease' 
  };

  return (
    <Layout>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '12rem',
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
    <div style={{ marginTop: '60px', width: '50%', padding: '20px', background: '#fafcfc', borderRadius: '8px', boxShadow: '0px 0px 2px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>
          <a 
            href="/docs/demarche" 
            style={linkStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            En savoir plus sur la démarche
          </a>
          </h2>
        <p style={{ fontSize: '16px' }}>
          Portrea est une initiative pilotée par Les Assembleurs et dédiée aux communes des Hauts-de-France. Son objectif est de faciliter la lutte contre le non recours aux droits, en permettant de mieux diagnostiquer la vulnérabilité des populations en matière d'e-administration. 
          <br />
          <br />
          📊 Explorez les indicateurs, 📕 consultez les guides, et découvrez comment cette démarche peut améliorer votre stratégie de médiation numérique.
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default Recherche;
