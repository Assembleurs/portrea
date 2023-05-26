import React, { useState, useEffect } from 'react';
import Dataviz from '../nav/Dataviz';

const MenagesPauvres = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/inseedata?id=${id}`);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <p>Chargement des données...</p>;
  }

  const menages = parseFloat(data.men) || 0;
  const menagesPauvres = parseFloat(data.men_pauv) || 0;

  const pauvrete = ((menagesPauvres / menages) * 100).toFixed(1);

  // Définition de la taille de la police en fonction du taux de pauvreté
  let fontSize;
  if (pauvrete < 10) {
    fontSize = '30px';
  } else if (pauvrete < 20) {
    fontSize = '40px';
  } else if (pauvrete < 30) {
    fontSize = '50px';
  } else {
    fontSize = '60px';
  }

  // Définition de la couleur en fonction du taux de pauvreté
  let color;
  if (pauvrete < 10) {
    color = '#F2AE2E';
  } else if (pauvrete < 20) {
    color = '#F27405';
  } else if (pauvrete < 30) {
    color = '#8C4303';
  } else {
    color = '#591902';
  }

  return (
    <Dataviz
      title="Ménages pauvres"
      description="Part des ménages pauvres par rapport au nombre total de ménages"
      visualization={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ fontSize, color }}><br></br>{pauvrete}%</h2>
        </div>
      }
    />
  );
};

export default MenagesPauvres;
