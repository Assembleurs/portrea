import React from 'react';
import Age from '../viz/Scores/65Ans';
import Diplomes from '../viz/Scores/Diplomes';
import Allocataires from '../viz/Scores/Allocataires';
import Emploi from '../viz/Scores/Emploi';
import FragiliteScore from '../viz/Scores/FragiliteScore';
import ExpositionScore from '../viz/Scores/ExpositionScore';
import styles from '../../styles/ScoreContainer.module.css';

const ScoreContainer = ({ comcode }) => {
  return (
    <div className={styles['score-container']}>
      <div className={styles['score']}>
        <FragiliteScore comcode={comcode} />
        <div className={styles['sub-score-container']}>
          <Age comcode={comcode} />
          <Diplomes comcode={comcode} />
        </div>
      </div>
      <div className={styles['score']}>
        <ExpositionScore comcode={comcode} />
        <div className={styles['sub-score-container']}>
          <Allocataires comcode={comcode} />
          <Emploi comcode={comcode} />
        </div>
      </div>
    </div>
  );
};

export default ScoreContainer;
