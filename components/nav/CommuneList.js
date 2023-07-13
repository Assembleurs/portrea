import React from 'react';

const CommuneList = ({ communes, onSelect }) => {
  if (communes.length === 0) {
    return <p>Aucun résultat trouvé</p>;
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
      {communes.map((commune) => (
        <li
          key={commune.code}
          onClick={() => onSelect(commune)}
          style={{
            padding: '8px',
            cursor: 'pointer',
            fontSize: '22px',
            borderBottom: '1px solid #ddd',
            backgroundColor: 'white'
          }}
        >
          {commune.nom}
        </li>
      ))}
    </ul>
  );
};

export default CommuneList;
