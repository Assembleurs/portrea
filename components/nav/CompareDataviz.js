import React from 'react';
import styles from '../../styles/Dataviz.module.css';

const CompareDataviz = ({ title, description, visualization, maxHeight }) => {
  return (
    <div className={styles.dataviz}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={styles.visualization} style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto'}}>
        {visualization}
      </div>
    </div>
  );
};

export default CompareDataviz;
