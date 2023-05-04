import React from 'react';
import StructureViz from './StructureViz';

const StructureDetails = ({ structure }) => {
  return (
    <div>
      {structure ? (
            <StructureViz structure={structure} />
      ) : (
        <p>Veuillez sélectionner une structure de médiation.</p>
      )}
    </div>
  );
};

export default StructureDetails;
