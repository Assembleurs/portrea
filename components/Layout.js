import React, { useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    textDecoration: isHovered ? 'underline' : 'none',
  };

  return (
    <div style={{ margin: '0 0%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0px solid lightgrey', padding: '20px 0', marginBottom: '0rem' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Portrea Hauts-de-France</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Link href="/">
            <a
              style={linkStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              🔎 Rechercher un territoire
            </a>
          </Link>
        </div>
      </div>
      <main>
        {children}
      </main>
    </div>
  );
};
