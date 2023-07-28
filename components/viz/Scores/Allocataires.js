import React, { useEffect, useState } from 'react';

const Allocataires = ({ comcode }) => {
  const [score, setScore] = useState(null);
  const [difference, setDifference] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (comcode) {
      Promise.all([
        fetch(`/api/iris/comcode2caf?comcode=${comcode}`).then((res) => res.json()),
        fetch(`/api/iris/comcode2pop?comcode=${comcode}`).then((res) => res.json()),
      ]).then(([cafData, popData]) => {
        const a = cafData.reduce((total, item) => {
          // vérifie que les valeurs sont des nombres
          if (typeof item?.inseecafData?.aaah === 'number' && typeof item?.inseecafData?.appa === 'number' && typeof item?.inseecafData?.arsas === 'number') {
            return total + item.inseecafData.aaah + item.inseecafData.appa + item.inseecafData.arsas;
          } else {
            return total;
          }
        }, 0);
        const p19_pop = popData.reduce(
          (total, item) => total + item.inseepopData.p19_pop,
          0
        );
        const proportionValue = (a / p19_pop) * 100;
        const diff = proportionValue - 9.22; 
        setScore(a);
        setDifference(diff.toFixed(2));

        if (diff > 0) {
          setMessage(`+${diff.toFixed(2)}pts au-dessus de la moyenne nationale`);
        } else {
          setMessage(`${diff.toFixed(2)}pts en dessous de la moyenne nationale`);
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
      <div style={titleStyle}>📄 Bénéficiaires des minima sociaux</div>
      {score !== null && difference !== null ? (
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

export default Allocataires;
