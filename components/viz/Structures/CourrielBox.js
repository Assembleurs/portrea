import React, { useState, useEffect } from 'react';

const CourrielBox = ({ code }) => {
  const [courriels, setCourriels] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    fetch(`/api/structures/courriel-commune?codeinsee=${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.courriels) {
          setCourriels(data.courriels.split(','));
        }
      });
  }, [code]);

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(courriels.join(', '));
  };

  return (
    <div>
        <br></br>
      <button 
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          background: isButtonHovered ? '#df7373' : '#13315c',
          color: '#fff',
          transition: 'background-color 0.3s',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        onClick={handleClick}
      >
        Voir les adresses e-mail des structures
      </button>
      {isButtonClicked && (
        <div style={{backgroundColor: 'white', padding: '10px', borderRadius: '5px', marginTop: '10px', position: 'relative'}}>
          <button 
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              background: '#0074de',
              color: '#fff',
              fontSize: '14px',
              borderRadius: '5px',
              padding: '5px'
            }}
            onClick={handleCopy}
          >
            Copier
          </button>
          <ul>
            {courriels.map((courriel, index) => (
              <li key={index}>{courriel}</li>
            ))}
          </ul>
        </div>
      )}
      <br></br>
      <br></br>
      <i>Il manque des adresses e-mail ?</i>
      <br></br>
      <a 
        href="https://solen1.enquetes.social.gouv.fr/cgi-9/HE/SF?P=76z14z2z-1z-1z2747C6FAAF"
        target="_blank"
        rel="noopener noreferrer"
      >
              <br></br>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            background: '#69778c',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          Ajouter l'adresse mail d'une structure
        </button>
      </a>
    </div>
  );
};

export default CourrielBox;
