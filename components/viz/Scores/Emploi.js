import React, { useEffect, useState } from 'react';

const Emploi = ({ comcode }) => {
  const [score, setScore] = useState(null);
  const [difference, setDifference] = useState(null);
  const [message, setMessage] = useState('');
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (comcode) {
      Promise.all([
        fetch(`/api/iris/comcode2emploi?comcode=${comcode}`).then((res) => res.json()),
        fetch(`/api/iris/comcode2pop?comcode=${comcode}`).then((res) => res.json()),
      ]).then(([emploiData, popData]) => {
        if (emploiData.length === 0 || !emploiData[0].inseeemploiData) {
          setNoData(true);
        } else {
          const ABCDE = emploiData.reduce((total, item) => {
            // vérifie que la valeur est un nombre
            if (item.inseeemploiData && typeof item.inseeemploiData.ABCDE === 'number') {
              return total + item.inseeemploiData.ABCDE;
            } else {
              return total;
            }
          }, 0);
          const c19_pop15p = popData.reduce(
            (total, item) => total + item.inseepopData.c19_pop15p,
            0
          );
          const proportionValue = (ABCDE / c19_pop15p) * 100;
          const diff = proportionValue - 11.69;  // assuming national average is 11.69%
          setScore(ABCDE);
          setDifference(diff.toFixed(2));

          if (diff > 0) {
            setMessage(`+${diff.toFixed(2)}pts au-dessus de la moyenne nationale`);
          } else {
            setMessage(`${diff.toFixed(2)}pts en dessous de la moyenne nationale`);
          }
        }
      });
    }
  }, [comcode]);

  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '20px',
    marginTop: '15px'
  };

  const scoreStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    backgroundColor: 'white',  
    padding: '10px'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold'
  };

  const messageStyle = difference > 0 ? { backgroundColor: '#ffa69e' } : { backgroundColor: '#d9ed92' };

  return (
    <div style={boxStyle}>
      <div style={titleStyle}>💼 Demandeurs d'emploi</div>
      {noData ? (
        <p>Données manquantes</p>
      ) : score !== null && difference !== null ? (
        <>
          <div style={scoreStyle}>{score}</div>
          <div style={messageStyle}>{message}</div>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Emploi;
