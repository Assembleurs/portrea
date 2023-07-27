import React from 'react';
import Age from '../viz/Scores/65Ans';
import Diplomes from '../viz/Scores/Diplomes';
import styles from '../../styles/ScoreContainer.module.css';

const ScoreContainer = ({ comcode }) => {
  return (
    <div className={styles['score-container']}>
      <Age comcode={comcode} />
      <Diplomes comcode={comcode} />
    </div>
  );
};

export default ScoreContainer;
