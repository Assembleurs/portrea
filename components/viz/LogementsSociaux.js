import React, { useState, useEffect } from 'react';
import Dataviz from '../nav/Dataviz';

const LogementsSociaux = ({ id }) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/inseedata?id=${id}`);
        const responseData = await response.json();
        setApiData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!apiData) {
    return <p>Chargement des données...</p>;
  }

  const menages = parseFloat(apiData.men) || 0;
  const logementsSociaux = parseFloat(apiData.log_soc) || 0;

  const percentage = (logementsSociaux / menages) * 100;

  // Définition de la taille de la police en fonction du pourcentage
  let fontSize;
  if (percentage < 20) {
    fontSize = '30px';
  } else if (percentage < 40) {
    fontSize = '40px';
  } else if (percentage < 60) {
    fontSize = '50px';
  } else if (percentage < 80) {
    fontSize = '60px';
  } else {
    fontSize = '70px';
  }

  // Définition de la couleur en fonction du pourcentage
  let color;
  if (percentage < 20) {
    color = '#F2AE2E';
  } else if (percentage < 40) {
    color = '#F27405';
  } else if (percentage < 60) {
    color = '#8C4303';
  } else if (percentage < 80) {
    color = '#591902';
  } else {
    color = '#0D0D0D';
  }

  return (
    <Dataviz
      title="Logements sociaux"
      description="Nombre de logements sociaux pour 100 ménages"
      visualization={
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize, color }}>
          <br></br>{percentage.toFixed(1)}%
          </p>
        </div>
      }
    />
  );
};

export default LogementsSociaux;
