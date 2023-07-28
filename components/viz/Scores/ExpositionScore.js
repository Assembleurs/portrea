import React, { useEffect, useState } from 'react';

const ExpositionScore = ({ comcode }) => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (comcode) {
      Promise.all([
        fetch(`/api/iris/comcode2caf?comcode=${comcode}`).then((res) => res.json()),
        fetch(`/api/iris/comcode2emploi?comcode=${comcode}`).then((res) => res.json()),
      ]).then(([cafData, emploiData]) => {
        const allocationSum = cafData.reduce((total, item) => {
          // vérifie que les valeurs sont des nombres
          if (typeof item?.inseecafData?.aaah === 'number' && typeof item?.inseecafData?.appa === 'number' && typeof item?.inseecafData?.arsas === 'number') {
            return total + item.inseecafData.aaah + item.inseecafData.appa + item.inseecafData.arsas;
          } else {
            return total;
          }
        }, 0);

        const ABCDE = emploiData.reduce((total, item) => {
          // vérifie que la valeur est un nombre
          if (item.inseeemploiData && typeof item.inseeemploiData.ABCDE === 'number') {
            return total + item.inseeemploiData.ABCDE;
          } else {
            return total;
          }
        }, 0);

        // Somme de allocationSum et ABCDE
        const scoreExposition = allocationSum + ABCDE;
        setScore(scoreExposition);
      });
    }
  }, [comcode]);

  const boxStyle = {
    backgroundColor: '#304d6d',
    borderRadius: '5px',
    padding: '20px',
    color: 'white'
  };

  const scoreStyle = {
    fontSize: '45px',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '10px',
    color: '#304d6d',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold'
  };

  return (
    <div style={boxStyle}>
      <div style={titleStyle}>Score d'exposition aux exigences numériques</div>
      {score !== null ? (
        <div style={scoreStyle}>{score}</div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ExpositionScore;
