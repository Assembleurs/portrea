import React from 'react';
import styles from '../../styles/ComponentContainer.module.css';

const ComponentContainer = ({ title, description, children }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles['viz-title']}>{title}</h2>
      <p>{description}</p>
      <div className={styles.childrenContainer}>
        {children}
      </div>
    </div>
  );
};

export default ComponentContainer;
