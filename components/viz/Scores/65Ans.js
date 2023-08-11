import { color } from 'd3';
import React, { useEffect, useState } from 'react';

const Age = ({ comcode }) => {
  const [score, setScore] = useState(null);
  const [difference, setDifference] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (comcode) {
      fetch(`/api/iris/comcode2pop?comcode=${comcode}`)
        .then((res) => res.json())
        .then((data) => {
          const pop65p = data.reduce((total, item) => total + item.inseepopData.p19_pop65p, 0);
          const p19_pop = data.reduce((total, item) => total + item.inseepopData.p19_pop, 0);
          const proportionValue = (pop65p / p19_pop) * 100;
          const diff = proportionValue - 20; 
          setScore(pop65p);
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
    padding: '10px',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold'
  };

  const messageStyle = difference > 0 ? { backgroundColor: '#ffa69e' } : { backgroundColor: '#d9ed92' };

  return (
    <div style={boxStyle}>
      <div style={titleStyle}>🧓🏼 Personnes âgées de plus de 65 ans</div>
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

export default Age;
