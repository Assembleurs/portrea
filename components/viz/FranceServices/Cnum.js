import React, { useEffect, useState, memo } from 'react';
import styles from '../../../styles/Cnum.module.css';

const Cnum = ({ code }) => {
    const [data, setData] = useState(null);
    const [structuresData, setStructuresData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/cnum?inseecode=${code}`);
            if (response.ok) {
                setData(await response.json());
            } else {
                setError(await response.text());
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchStructuresData = async () => {
        try {
            const response = await fetch(`/api/structures/structures-inclusion?irisCode=${code}`);
            if (response.ok) {
                setStructuresData(await response.json());
            } else {
                setError(await response.text());
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
        fetchStructuresData();
        const interval = setInterval(() => {
            fetchData();
            fetchStructuresData();
        }, 10000);
        return () => clearInterval(interval);
    }, [code]);

    let percentage = 0;
    if (structuresData && data && data["StructuresCount"]) {
        const totalStructures = structuresData.features.length;  // Using length of features array to determine count of structures
        percentage = (data["StructuresCount"] / totalStructures) * 100;
    }

    const getFormattedTitle = (number, singularTitle, pluralTitle) => {
        return (number === 1 || number === 0) ? singularTitle : pluralTitle;
    };

    const isLoading = !data || !structuresData;

    if (isLoading) {
        return (
            <div className={styles.container}>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <p>Error: {error}</p>
            </div>
        );
    }

    const roundedPercentage = percentage.toFixed(2);

    return (
      <div className={styles.container}>
      <div className={styles.dataBox}>
          <div className={styles.box} style={{backgroundColor: '#9197ae'}}>
            <span className={styles.number}>{data["Nb de conseillers attribués"]}</span>
            <span>{getFormattedTitle(data["Nb de conseillers attribués"], "Conseiller attribué", "Conseillers attribués")}</span>
          </div>
          <div className={styles.box} style={{backgroundColor: '#faf3dd'}}>
            <span className={styles.number}>{data["Nb de conseillers en formation"]}</span>
            <span>{getFormattedTitle(data["Nb de conseillers en formation"], "Conseiller en formation", "Conseillers en formation")}</span>
          </div>
          <div className={styles.box} style={{backgroundColor: '#cdd7d6'}}>
            <span className={styles.number}>{data["Nb de conseillers formés"]}</span>
            <span>{getFormattedTitle(data["Nb de conseillers formés"], "Conseiller formé", "Conseillers formés")}</span>
          </div>
          <div className={styles.box} style={{backgroundColor: '#bfd3c1'}}>
            <span className={styles.number}>{data["Nb de conseillers recrutés"]}</span>
            <span>{getFormattedTitle(data["Nb de conseillers recrutés"], "Conseiller recruté", "Conseillers recrutés")}</span>
            </div>
        </div>
        <div className={styles.structuresbox}>
                <div className={styles.structuresnumber} style={{ backgroundColor: '#ffff' }}>
                    <span className={styles.number}>{data["StructuresCount"]}</span>
                    <span>{getFormattedTitle(data["StructuresCount"], "Structure", "Structures")}</span>
                </div>
                <div className={styles.percentageBarContainer}>
            <div className={styles.percentageBar} style={{ width: `${percentage}%` }}>{percentage.toFixed(2)}%</div>
            <div className={styles.explanationText}>
            {`Les structures conseiller numérique représentent ${roundedPercentage}% du total des structures de médiation dans la commune`}
            </div>
            </div>
            </div>
        </div>
    );

  };
  
  export default Cnum;
