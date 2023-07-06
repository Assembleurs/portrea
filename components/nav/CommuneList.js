import React from 'react';

const CommuneList = ({ communes, onSelect }) => (
  <ul>
    {communes.map((commune) => (
      <li key={commune.code} onClick={() => onSelect(commune)}>
        {commune.nom}
      </li>
    ))}
  </ul>
);

export default CommuneList;
