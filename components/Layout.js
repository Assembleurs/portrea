import React, { useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isDocsHovered, setIsDocsHovered] = useState(false);

  const searchLinkStyle = {
    textDecoration: isSearchHovered ? 'underline' : 'none',
  };

  const docsLinkStyle = {
    textDecoration: isDocsHovered ? 'underline' : 'none',
  };

  return (
    <div style={{ margin: '0 0%' }}>
        <div style={{ 
          display: 'flex', 
          backgroundColor: '#f8f9fa', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '8px solid #252d80', 
          padding: '20px 0', 
          marginBottom: '0rem', 
          fontFamily: 'Big Shoulders Display',
          fontWeight: '800'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem', fontWeight: '800' }}>
          <img src="/images/logo-assembleurs.png" alt="Portrea Logo" style={{ marginRight: '0px', height: '40px', width: 'auto' }} />
          PORTREA HAUTS-DE-FRANCE
        </div>
        <div style={{ fontSize: '2rem', fontWeight: '800' }}>
          <Link href="/">
            <a
              style={searchLinkStyle}
              onMouseEnter={() => setIsSearchHovered(true)}
              onMouseLeave={() => setIsSearchHovered(false)}
            >
              🔎 Rechercher un territoire
            </a>
          </Link>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          <Link href="/docs/indicateurs">
            <a
              style={docsLinkStyle}
              onMouseEnter={() => setIsDocsHovered(true)}
              onMouseLeave={() => setIsDocsHovered(false)}
            >
              📖 Documentation
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
