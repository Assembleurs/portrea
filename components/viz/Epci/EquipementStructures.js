import React from 'react';
import equipementStructuresData from '../../../data/epci/equipement-structures.json';
import styles from '../../../styles/Illectronisme.module.css'; // You may need to adapt these styles

const EquipementStructures = ({ codeEPCI }) => {
  // Convert codeEPCI to an integer
  const codeEPCIInt = parseInt(codeEPCI, 10);

  // Find the data for the given Code EPCI
  const data = equipementStructuresData.find((item) => item["code-epci"] === codeEPCIInt);

  if (!data) {
    return <p>No data available for this EPCI code.</p>;
  }

  const totalStructures = parseInt(data["nombre-structures"], 10);
  const equipementTaux = (parseInt(data["nombre-structures-acces-equipement"], 10) / totalStructures) * 100;
  const venteTaux = (parseInt(data["nombre-structures-vente-solidaire"], 10) / totalStructures) * 100;

  return (
    <div>
      <br></br>
      <h2>Nombre de structures proposant un accès libre à de l'équipement ou une connexion</h2>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: `${equipementTaux}%` }}></div>
      </div>
      <br></br>
      <h2>Nombre de structures qui proposent de la vente solidaire / don ou prêt de matériel numérique:</h2>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: `${venteTaux}%` }}></div>
      </div>
      <br></br>
      <p>Source de l'enquête - {data["source-enquête"]}</p>
      <p>Année de l'enquête - {data["annee-enquête"]}</p>
    </div>
  );
};

export default EquipementStructures;
