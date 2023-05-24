import Link from 'next/link';
import Layout from '../components/nav/Layout';
import styles from '../styles/HomePage.module.css';

const HomePage = () => (
  <Layout>
    <div className={styles.home}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Portrea - Hauts de France</h1>
        <div className={styles.linkGrid}>
          <Link href="/search" passHref>
            <a className={`${styles.link} ${styles.search}`}>
              Rechercher une structure
            </a>
          </Link>
          <Link href="/codepostal/00000" passHref>
            <a className={`${styles.link} ${styles.stats}`}>
              Statistiques par commune
            </a>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default HomePage;
