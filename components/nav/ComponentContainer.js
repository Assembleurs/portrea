import React from 'react';
import styles from '../../styles/ComponentContainer.module.css'

const ComponentContainer = ({ title, description, children }) => {
  return (
    <div style={{ margin: '1rem 0' }}>
      <h2 className={styles['viz-title']}>{title}</h2>
      <p>{description}</p>
      <div>
        {children}
      </div>
    </div>
  );
};

export default ComponentContainer;
