import React, { useEffect, useState } from 'react';

const FragiliteScore = ({ comcode }) => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (comcode) {
      Promise.all([
        fetch(`/api/iris/comcode2pop?comcode=${comcode}`).then((res) => res.json()),
        fetch(`/api/iris/comcode2diplome?comcode=${comcode}`).then((res) => res.json()),
      ]).then(([popData, diplomeData]) => {
        const p19_pop65p = popData.reduce(
          (total, item) => total + item.inseepopData.p19_pop65p,
          0
        );
        const p19_nscol15p_diplmin = diplomeData.reduce(
          (total, item) => total + item.inseediplomeData.p19_nscol15p_diplmin,
          0
        );
        const c19_pop15p = popData.reduce(
          (total, item) => total + item.inseepopData.c19_pop15p,
          0
        );

        // New calculation
        const fragiliteScore = p19_pop65p + (p19_nscol15p_diplmin * ((c19_pop15p - p19_pop65p) / c19_pop15p));

        // Round the score
        const roundedScore = Math.round(fragiliteScore);

        setScore(roundedScore);
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
      <div style={titleStyle}>Score de fragilité socio-numérique</div>
      {score !== null ? (
        <div style={scoreStyle}>{score}</div> // This will display the rounded score
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default FragiliteScore;
