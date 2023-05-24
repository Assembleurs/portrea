import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/nav/Layout';
import locationsData from '../../data/locations.geojson';
import styles from '../../styles/IdPage.module.css';
import Population from '../../components/viz/Population';
import AgeBarChart from '../../components/viz/AgeBarChart';
import AgeLogement from '../../components/viz/AgeLogement';
import LogementsSociaux from '../../components/viz/LogementsSociaux';
import MenagesPauvres from '../../components/viz/MenagesPauvres';
import TypeMenage from '../../components/viz/TypeMenage';

const IdPage = ({ id }) => {
  const [objectData, setObjectData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchObjectData = async () => {
      const object = locationsData.features.find(feature => feature.properties.id === id);
      if (object) {
        setObjectData({
          nom: object.properties.nom,
          commune: object.properties.commune
        });
      }
    };

    fetchObjectData();
  }, [id]);

  const handleReturnToList = () => {
    router.push('/search');
  };

  const handleCompare = () => {
    window.open(`/search`, '_blank');
  };

  const handleStats = () => {
    window.open(`/codepostal/00000`, '_blank');
  };

  return (
    <Layout>
    <div className={styles.container}>
      <div className={styles.objectBox}>
        {objectData && (
          <>
            <h1>{objectData.nom}</h1>
            <h2>{objectData.commune}</h2>
          </>
        )}
      </div>
      <div>
        <br></br>
        <div className={styles.buttonContainer}>
          <button className={styles.returnButton} onClick={handleReturnToList}>
            Retour à la liste
          </button>
          <button className={styles.returnButton} onClick={handleCompare}>
            Comparer avec une autre structure
          </button>
          <button className={styles.returnButton} onClick={handleStats}>
            Statistiques par commune
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.item}>
          <Population id={id} />
        </div>
        <div className={styles.item}>
          <AgeBarChart id={id} />
        </div>
        <div className={styles.item}>
          <MenagesPauvres id={id} />
        </div>
        <div className={styles.item}>
          <TypeMenage id={id} />
        </div>
        <div className={styles.item}>
          <LogementsSociaux id={id} />
        </div>
        <div className={styles.item}>
          <AgeLogement id={id} />
        </div>
      </div>
    </div>
    </Layout>
  );
};

IdPage.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default IdPage;
