import React from 'react';
import illectronismeData from '../../../data/epci/illectronisme-insee.json';
import styles from '../../../styles/Illectronisme.module.css'; // Import the stylesheet

const regionalAverage = 17;

const Illectronisme = ({ codeEPCI }) => {
  // Convert codeEPCI to an integer
  const codeEPCIInt = parseInt(codeEPCI, 10);

  // Find the data for the given Code EPCI
  const data = illectronismeData.find((item) => item["Code EPCI"] === codeEPCIInt);

  if (!data) {
    return <p>No data available for this EPCI code.</p>;
  }

  const taux = parseFloat(data["Taux (en %)"].replace(',', '.')); // Convert the taux to a number

  return (
    <div>
      <br></br>
      <h3>Taux d'illectronisme : </h3>
      <div className={styles.tauxBox}>
        <p>{data["Taux (en %)"]}</p>
      </div>
      <div className={styles.barContainer}>
        <div className={styles.bar} style={{ width: `${taux}%` }}></div>
        <div className={styles.regionalAverage} style={{ left: `${regionalAverage}%` }}></div>
      </div>
      <p className={styles.averageText}>Moyenne en Hauts de France</p>
      <h3>Nombre de personnes</h3>
      <div className={styles.numberBox}>
        <p>{data["Nombre"]}</p>
      </div>
    </div>
  );
};

export default Illectronisme;
