import styles from '../../styles/Documentation.module.css';
import Layout from '../../components/Layout';

export default function MobiliserActeurs() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Comment mobiliser les acteurs du territoire ?</h1>

                <h2 className={styles.subtitle}>Le programme ADN Dynamique Collective par les Assembleurs</h2>
                
                <p className={styles.text}>
                L’offre ADN (Aide au Développement Numérique) Dynamique Collective constitue un premier niveau d'accompagnement permettant d’amorcer un projet d’inclusion numérique pour un territoire ou un opérateur.                <br></br>
                    <br></br>
                    <li>Acculturation et sensibilisation</li>
                    <li>Identification des parties prenantes</li>
                    <li>Conception et mise en oeuvre d'un atelier collectif</li>
                    <li>Synthèse et restitution</li>
                    <br></br>
                    <a href="https://assembleurs.co/solutions/adn-dynamique-collective" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        👉 Voir le programme
                    </button>
                </a>
                </p>
            </div>
        </Layout>
    );
}
