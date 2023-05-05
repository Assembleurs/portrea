import React from 'react';
import styles from '../styles/styles.module.css';

const Population = ({ structure }) => {
  const population = structure.properties.pop_carr;

  // Définition de la taille de la police en fonction de la population
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
    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', height: '100px' }}>
    <p style={{ fontSize, color }} className={styles.infoValue}>{population}</p>
  </div>
  );
};

export default Population;
