import { useState } from 'react';
import Layout from '../../components/nav/Layout';
import ComparePopulation from '../../components/viz/ComparePopulation';
import CompareMenPauv from '../../components/viz/CompareMenPauv';
import NbObjets from '../../components/viz/CompareNbObjets';
import CompareAge from '../../components/viz/CompareAge';
import CpMap from '../../components/viz/CpMap';
import styles from '../../styles/PostalPage.module.css';
import classNames from 'classnames';

const PostalPage = () => {
  const [postalCode, setPostalCode] = useState('');

  const handleInputChange = event => {
    setPostalCode(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const hasPostalCode = postalCode !== '';

  return (
    <Layout>
    <div className={classNames(styles.container, styles.postalPage)}>
      <div className={styles.searchBar}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <label>
            <input type="text" placeholder="Saisir un code postal" value={postalCode} onChange={handleInputChange} />
          </label>
          <button type="submit">Rechercher</button>
        </form>
      </div>
      {hasPostalCode && (
        <div className={styles.postalCodeBanner}>
          <h2 className={styles.selectedPostalCode}>Code postal sélectionné : {postalCode}</h2>
          <NbObjets postalCode={postalCode} /> {/* Ajoutez le composant NbObjets */}
        </div>
      )}
      {hasPostalCode && (
        <div className={styles.grid}>
          <div className={styles.item}>
            <CpMap postalCode={postalCode} />
          </div>
          <div className={styles.item}>
            <ComparePopulation postalCode={postalCode} />
          </div>
          <div className={styles.item}>
            <CompareAge postalCode={postalCode} />
          </div>
          <div className={styles.item}>
            <CompareMenPauv postalCode={postalCode} />
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default PostalPage;
