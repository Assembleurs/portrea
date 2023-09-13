import React, { useEffect, useState, memo } from 'react';
import styles from '../../../styles/Cnum.module.css';

const Cnum = ({ code }) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/cnum?inseecode=${code}`);
            if (response.ok) {
                const result = await response.json();

                // Only set the data state if the fetched data is different from the current data
                if (JSON.stringify(data) !== JSON.stringify(result)) {
                    setData(result);
                }
            } else {
                const message = await response.text();
                setError(message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, [code]);

    const getFormattedTitle = (number, singularTitle, pluralTitle) => {
      return (number === 1 || number === 0) ? singularTitle : pluralTitle;
    }

    // Use a condition that checks for the presence of keys in data to determine loading
    const isLoading = Object.keys(data).length === 0;

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
      </div>
    );
  };
  
  export default Cnum;
  