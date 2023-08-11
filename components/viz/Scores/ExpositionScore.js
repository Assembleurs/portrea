import React, { useEffect, useState } from 'react';

<style>
  @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800&display=swap');
</style>

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

        const scoreExposition = allocationSum + ABCDE;
        setScore(scoreExposition);
      });
    }
  }, [comcode]);

  const boxStyle = {
    backgroundColor: '#252d80',
    borderRadius: '5px',
    padding: '20px',
    color: 'white',
  };

  const scoreStyle = {
    fontSize: '45px',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '10px',
    color: '#304d6d',
  };

  const titleStyle = {
    fontSize: '32px',
    fontFamily: "'Big Shoulders Display', sans-serif"
  };

  const infoBoxStyle = {
    marginTop: '10px',
    display: 'inline-block',
    backgroundColor: '#252d80',
    borderRadius: '5px',
    color: '#ebebed',
    textDecoration: 'underline',
    cursor: 'pointer'
};
  

  return (
    <div style={boxStyle}>
      <div style={titleStyle}>Score d'exposition aux exigences numériques</div>
      {score !== null ? (
        <div style={scoreStyle}>{score}</div>
      ) : (
        <p>Chargement...</p>
      )}
    💬 <a href="/docs/indicateurs#indicateurs-strategiques" style={infoBoxStyle} target="_blank">
      Plus d'informations sur le calcul des scores
    </a>
    </div>
  );
};

export default ExpositionScore;
