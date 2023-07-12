import React from 'react';

const CommuneList = ({ communes, onSelect }) => (
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {communes.map((commune) => (
      <li key={commune.code} onClick={() => onSelect(commune)} 
          style={{ padding: '8px', cursor: 'pointer', borderBottom: '0px solid #ddd' }}>
        {commune.nom}
      </li>
    ))}
  </ul>
);

export default CommuneList;
