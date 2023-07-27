import React, { useEffect, useState } from 'react';

const Age = ({ comcode }) => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (comcode) {
      fetch(`/api/iris/comcode2pop?comcode=${comcode}`)
        .then((res) => res.json())
        .then((data) => {
          const pop65p = data.reduce((total, item) => total + item.inseepopData.p19_pop65p, 0);
          setScore(pop65p);
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
      <div style={titleStyle}>Nombre de personnes âgées de plus de 65 ans</div>
      {score !== null ? (
        <div style={scoreStyle}>{score}</div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Age;
