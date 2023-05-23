import React from 'react';
import styles from '../../styles/Dataviz.module.css';

const Dataviz = ({ title, description, visualization }) => {
  return (
    <div className={styles.dataviz}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={styles.visualization}>{visualization}</div>
    </div>
  );
};

export default Dataviz;
