import React, { useEffect, useState } from 'react';

const Diplomes = ({ comcode }) => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (comcode) {
      Promise.all([
        fetch(`/api/iris/comcode2diplome?comcode=${comcode}`).then((res) => res.json()),
        fetch(`/api/iris/comcode2pop?comcode=${comcode}`).then((res) => res.json()),
      ]).then(([diplomeData, popData]) => {
        const p19_nscol15p_diplmin = diplomeData.reduce(
          (total, item) => total + item.inseediplomeData.p19_nscol15p_diplmin, 
          0
        );
        const pop65p = popData.reduce(
          (total, item) => total + item.inseepopData.p19_pop65p, 
          0
        );
        setScore(p19_nscol15p_diplmin - pop65p);
      });
    }
  }, [comcode]);

  const boxStyle = {
    backgroundColor: '#F0F0F0',
    borderRadius: '5px',
    padding: '20px',
    marginTop: '15px'
  };

  const scoreStyle = {
    fontSize: '32px',
    fontWeight: 'bold'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold'
  };

  return (
    <div style={boxStyle}>
      <div style={titleStyle}>Nombre de personnes sans diplomes âgés de moins de 65 ans</div>
      {score !== null ? (
        <div style={scoreStyle}>{score}</div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Diplomes;
