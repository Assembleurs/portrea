import styles from '../../styles/Documentation.module.css';
import Layout from '../../components/Layout';

export default function Documentation() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Documentation</h1>
                
                <h2 className={styles.subtitle}>Comprendre la démarche et l'outil Portrea</h2>
                <h3 className={styles.thirdtitle}>Présentation de la démarche</h3>
                <a href="/docs/demarche" className={styles.link}>Présentation de la démarche et de ses objectifs</a>
                <h3 className={styles.thirdtitle}>Indicateurs choisis</h3>
                <p className={styles.text}>
                    <a href="/docs/indicateurs#donnees-assembleurs" className={styles.link}>Quels sont les indicateurs et données sélectionnés par les Assembleurs ?</a>
                    <br></br>
                    <a href="/docs/indicateurs#bretagne" className={styles.link}>Quels sont les indicateurs et données sélectionnés par le TiLab en Bretagne ?</a>
                    <br></br>
                    <a href="/docs/indicateurs#hdf" className={styles.link}>Quels sont les indicateurs et données sélectionnés par la Région Hauts-de-France ?</a>
                </p>
                <h3 className={styles.thirdtitle}>Source des données</h3>
                <p className={styles.text}>
                    <a href="/docs/sources-donnees-locales" className={styles.link}>Quelles données sont collectées auprès des collectivités ?</a>
                </p>
                <h2 className={styles.subtitle}>Réaliser un Diagnostic</h2>
               
                <h2 className={styles.subtitle}>Mettre en place des actions</h2>
               
            </div>
        </Layout>
    );
}
