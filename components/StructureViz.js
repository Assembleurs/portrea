import React from 'react';
import AgeBarChart from './AgeBarChart';
import MenagesPauvres from './MenagesPauvres';
import LogementsSociaux from './LogementsSociaux';
import TypeMenage from './TypeMenage';
import AgeBatiment from './AgeLogement';

const StructuresViz = ({ structure }) => {
    return (
      <div>
        {structure ? (
          <>
            <h2>Répartition par âges</h2>
            <AgeBarChart structure={structure} />
            <br></br>
            <h2>Part des ménages pauvres</h2>
            <MenagesPauvres structure={structure} />
            <h2>Part des logements sociaux</h2>
            <LogementsSociaux structure={structure} />
            <h2>Structure des ménages</h2>
            <TypeMenage structure={structure} />
            <h2>Date de construction des logements</h2>
            <AgeBatiment structure={structure} />
          </>
        ) : (
          <p>Veuillez sélectionner une structure de médiation pour afficher les visualisations.</p>
        )}
      </div>
    );
  };
  
  export default StructuresViz;
  