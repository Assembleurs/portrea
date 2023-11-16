import React, { useState } from 'react';
import Link from 'next/link';


<style>
  @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;800&display=swap');
</style>

export default function Layout({ children }) {
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isDocsHovered, setIsDocsHovered] = useState(false);
  const [isCompareHovered, setIsCompareHovered] = useState(false);

  const searchLinkStyle = {
    textDecoration: isSearchHovered ? 'underline' : 'none',
  };

  const docsLinkStyle = {
    textDecoration: isDocsHovered ? 'underline' : 'none',
  };

  const compareLinkStyle = {
    textDecoration: isCompareHovered ? 'underline' : 'none',
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
          <Link href="/comparateur">
            <a
              style={compareLinkStyle}
              onMouseEnter={() => setIsCompareHovered(true)}
              onMouseLeave={() => setIsCompareHovered(false)}
              rel="preload" 
              href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;800&display=swap"           
              as="style"
            >
              📊 Comparateur
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
      <footer style={{
        marginTop :'2rem',
        background: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 0'
      }}>
        <img src="/images/ue1.png" alt="Logo Union Européenne FEDER" style={{ marginRight: '0px', height: '80px' }} />
      </footer>
    </div>
  );
};
