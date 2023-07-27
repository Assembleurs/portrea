import React from 'react';
import styles from '../../styles/ComponentContainer.module.css';

const ComponentContainer = ({ title, description, dataInfo, children }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles['viz-title']}>{title}</h2>
      <p>{description}</p>
      {dataInfo && <p className={styles['data-info']}><a href={dataInfo} target="_blank" rel="noopener noreferrer">Plus d'informations sur les données</a></p>}
      <div className={styles.childrenContainer}>
        {children}
      </div>
    </div>
  );
};

export default ComponentContainer;
