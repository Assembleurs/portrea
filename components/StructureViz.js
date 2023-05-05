import React from 'react';
import AgeBarChart from './AgeBarChart';
import MenagesPauvres from './MenagesPauvres';
import LogementsSociaux from './LogementsSociaux';
import TypeMenage from './TypeMenage';
import AgeBatiment from './AgeLogement';
import Population from './Population';
import styles from '../styles/styles.module.css';

const StructuresViz = ({ structure }) => {
    return (
      <div>
        {structure ? (
          <>
            <div className={styles.section}>
              <div className={styles.titleBox}>
                <h2 className={styles.title}>POPULATION</h2>
              </div>
              <div className={styles.content}>
                <Population structure={structure} />
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.titleBox}>
                <h2 className={styles.title}>RÉPARTITION PAR ÂGE</h2>
              </div>
              <div className={styles.content}>
                <AgeBarChart structure={structure} />
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.titleBox}>
                <h2 className={styles.title}>PART DES MÉNAGES PAUVRES</h2>
              </div>
              <div className={styles.content}>
                <MenagesPauvres structure={structure} />
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.titleBox}>
                <h2 className={styles.title}>PART DES LOGEMENTS SOCIAUX</h2>
              </div>
              <div className={styles.content}>
                <LogementsSociaux structure={structure} />
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.titleBox}>
                <h2 className={styles.title}>STRUCTURE DES MÉNAGES</h2>
              </div>
              <div className={styles.content}>
                <TypeMenage structure={structure} />
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.titleBox}>
                <h2 className={styles.title}>DATE DE CONSTRUCTION DES LOGEMENTS</h2>
              </div>
              <div className={styles.content}>
                <AgeBatiment structure={structure} />
              </div>
            </div>
          </>
        ) : (
          <p>Veuillez sélectionner une structure de médiation pour afficher les visualisations.</p>
        )}
      </div>
    );
};

export default StructuresViz;
