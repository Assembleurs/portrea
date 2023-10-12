import styles from '../../styles/Documentation.module.css';
import Layout from '../../components/Layout';

export default function Documentation() {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Comment mener un diagnostic en médiation numérique</h1>
                
                <h2 className={styles.subtitle}>Étape 1: Définir les objectifs du diagnostic</h2>
                <p className={styles.text}><b>Identifiez clairement ce que vous cherchez à mesurer.</b> Par exemple :
                <br></br>
                <br></br>
                <li>Un nouveau programme ou parcours, après un test de 6 mois</li>
                <li>Connaissance de l'offre par les publics concernés</li>
                <li>Equipement et qualité de connexion dans les structures de médiation</li>
                <li>Degré d'autonomie des usagers</li>
                </p>
                
                <h2 className={styles.subtitle}>Étape 2: Sélectionner les indicateurs</h2>
                <p className={styles.text}>Choisissez les indicateurs pertinents qui vous aideront à mesurer les objectifs fixés.
                <br></br>
                <div className={styles.hint}>
                    💬 Par exemple, le degré d'autonomie peut se mesurer par le <b>nombre de visites pour un même usager.</b> On peut supposer que plus il ou elle revient souvent, moins il ou elle est autonome.
                </div>
                </p>

                <h2 className={styles.subtitle}>Étape 3: Collecter les données</h2>
                <h3 className={styles.thirdtitle}>Quelles données collecter</h3>
                <p className={styles.text}>
                    Pour chaque indicateur, un jeu de données (ou fichier) est à construire. Par exempe, le nombre d'usagers par mois et par structure
                </p>
                <h3 className={styles.thirdtitle}>Comment partager ces données ?</h3>
                <div className={styles.hint}>
                    💡 Note : un processus de contribution est à l'étude. Un partenariat avec des universités pour mener des travaux pratiques étudiants est une option envisagée.
                </div>
                <a href="https://www.data.gouv.fr/fr/pages/onboarding/producteurs/" target="_blank" rel="noopener noreferrer">
                    <button className={styles.customButton}>
                        👉 En savoir plus sur les bonnes pratiques en matière d'open data
                    </button>
                </a>
                <h2 className={styles.subtitle}>Étape 4: Analyser les données</h2>
                <p className={styles.text}>Interprétez les données collectées en les mettant en relation avec les indicateurs sélectionnés. Utilisez des outils statistiques pour une analyse plus approfondie si nécessaire.</p>
                <p className={styles.text}>Compilez les résultats en un rapport clair et compréhensible, contenant des recommandations pour des actions futures.</p>
            </div>
        </Layout>
    );
}
