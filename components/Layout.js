import React, { useState } from 'react';
import Link from 'next/link';


<style>
  @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;800&display=swap');
</style>

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
          fontWeight: '400'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '2rem', fontWeight: '400'}}>
          <img src="/images/logo-assembleurs.png" alt="Portrea Logo" style={{ marginRight: '0px', height: '40px', width: 'auto' }} />
        </div>
        <div style={{ fontSize: '2rem', fontWeight: '400' }}>
          <Link href="/">
            <a
              style={searchLinkStyle}
              onMouseEnter={() => setIsSearchHovered(true)}
              onMouseLeave={() => setIsSearchHovered(false)}
              rel="preload" 
              href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;800&display=swap"           
              as="style"
            >
              🔎 Rechercher un territoire
            </a>
          </Link>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: '400' }}>
          <Link href="/docs">
            <a
              style={docsLinkStyle}
              onMouseEnter={() => setIsDocsHovered(true)}
              onMouseLeave={() => setIsDocsHovered(false)}
              rel="preload" 
              href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;800&display=swap"           
              as="style"
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
