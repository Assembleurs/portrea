import React, { useState } from 'react';
import Link from 'next/link';

const GoButton = ({ commune }) => {
  const [hover, setHover] = useState(false);
  
  const baseStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '20px 0',
    color: '#fff',
    background: hover ? '#df7373' : '#13315c',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    fontSize: '24px' // Modifiez la taille du texte ici
  };
  
  return (
    commune && (
      <Link href={`/diagnostic/${commune.code}`}>
        <a style={baseStyle} 
           onMouseEnter={() => setHover(true)}
           onMouseLeave={() => setHover(false)}>
          <b>Accéder au diagnostic pour {commune.nom}</b>
        </a>
      </Link>
    )
  );
};

export default GoButton;
