import React, { useEffect, useState } from 'react';

const Diplomes = ({ comcode }) => {
  const [score, setScore] = useState(null);
  const [difference, setDifference] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (comcode) {
      fetch(`/api/iris/comcode2diplome?comcode=${comcode}`)
        .then((res) => res.json())
        .then((diplomeData) => {
          const p19_nscol15p_diplmin = diplomeData.reduce(
            (total, item) => total + item.inseediplomeData.p19_nscol15p_diplmin, 
            0
          );
          const p19_nscol15p = diplomeData.reduce(
            (total, item) => total + item.inseediplomeData.p19_nscol15p,
            0
          );
          const proportionValue = (p19_nscol15p_diplmin / p19_nscol15p) * 100;
          const diff = proportionValue - 21.86;
          setScore(p19_nscol15p_diplmin);
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
      <div style={titleStyle}>👩‍🎓 Personnes sans diplomes ou CEP</div>
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

export default Diplomes;
