import { useState, useEffect } from 'react';
import Dataviz from '../nav/Dataviz';

export default function Population({ id }) {
  const [population, setPopulation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/inseedata?id=${id}`);
      const data = await res.json();
      setPopulation(data.pop_carr);
    };
    fetchData();
  }, [id]);

  if (!population) {
    return <p>Chargement des données...</p>;
  }

  let fontSize;
  if (population < 100) {
    fontSize = '30px';
  } else if (population < 400) {
    fontSize = '40px';
  } else if (population < 800) {
    fontSize = '50px';
  } else if (population < 1200) {
    fontSize = '60px';
  } else if (population < 1400) {
    fontSize = '70px';
  } else if (population < 1800) {
    fontSize = '80px';
  } else {
    fontSize = '90px';
  }

  // Définition de la couleur en fonction de la population
  let color;
  if (population < 100) {
    color = '#FFBA08';
  } else if (population < 400) {
    color = '#FAA307';
  } else if (population < 800) {
    color = '#F48C06';
  } else if (population < 1200) {
    color = '#E85D04';
  } else if (population < 1400) {
    color = '#DC2F02';
  } else if (population < 1800) {
    color = '#D00000';
  } else {
    color = '#9D0208';
  }

  return (
    <Dataviz
      title="Population"
      description="Nombre d'habitants dans le secteur"
      visualization={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ fontSize, color }}><br></br>{population}</h2>
        </div>
      }
    />
  );
}
