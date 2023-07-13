import React, { useState } from 'react';
import Link from 'next/link';

const GoButton = ({ commune }) => {
  const [hover, setHover] = useState(false);
  
  const baseStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '20px 0',
    color: '#fff',
    background: hover ? '#0056b3' : '#000',
    borderRadius: '5px',
    textDecoration: 'none',
    textAlign: 'center',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  };
  
  return (
    commune && (
      <Link href={`/diagnostic/${commune.code}`}>
        <a style={baseStyle} 
           onMouseEnter={() => setHover(true)}
           onMouseLeave={() => setHover(false)}>
          Accéder au diagnostic pour {commune.nom}
        </a>
      </Link>
    )
  );
};

export default GoButton;
