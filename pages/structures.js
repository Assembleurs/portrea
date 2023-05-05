import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import StructureDetails from '../components/StructureDetails';
import data from '../data/structures_mediation_insee_agg.geojson';
import styles from '../styles/styles.module.css';

const IndexPage = () => {
  const [structures, setStructures] = useState(data.features);
  const [selectedStructures, setSelectedStructures] = useState([]);

  const handleSearch = (postalCode) => {
    const filteredStructures = data.features.filter(
      (structure) => structure.properties.code_postal === postalCode
    );
    setStructures(filteredStructures);
  };

  const handleSelectStructure = (structure) => {
    setSelectedStructures((prevState) => {
      if (prevState.length < 2) {
        return [...prevState, structure];
      } else {
        return [prevState[1], structure];
      }
    });
  };

  const handleRemoveStructure = (id) => {
    setSelectedStructures((prevState) => prevState.filter((structure) => structure.properties.id !== id));
  };

  return (
    <div>
        <br></br>
      <div className={styles.searchContainer}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.structureList}>
        <ul>
          {structures.map((structure) => (
            <li
              key={structure.properties.id}
              className={styles.structureItem}
              onClick={() => handleSelectStructure(structure)}
            >
              <p className={styles.structureName}>{structure.properties.nom}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.visualizationContainer}>
        {selectedStructures.map((structure, index) => (
          <div key={structure.properties.id} className={styles.visualizationWrapper}>
            <div className={styles.structureItem}>
              <p className={styles.structureSelectedName}>{structure.properties.nom}</p>
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveStructure(structure.properties.id)}
              >
                Supprimer
              </button>
            </div>
            <StructureDetails structure={structure} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
